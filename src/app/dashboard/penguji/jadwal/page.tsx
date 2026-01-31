"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Loader2,
} from "lucide-react";

interface Jadwal {
  id: string;
  jenis_ujian: string;
  tanggal_ujian: string;
  waktu_mulai: string;
  waktu_selesai: string | null;
  lokasi: string | null;
  jumlah_peserta: number;
}

export default function JadwalPengujiPage() {
  const [jadwal, setJadwal] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/penguji/jadwal");
      if (response.ok) {
        const result = await response.json();
        setJadwal(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0];
    const checkDate = dateString.split("T")[0];
    return today === checkDate;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat jadwal ujian...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900">
              Jadwal Ujian Saya
            </h2>
            <p className="text-stone-600">
              Total: {jadwal.length} jadwal ujian
            </p>
          </div>
        </div>
      </div>

      {jadwal.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border-2 border-stone-200 shadow-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">
              Belum Ada Jadwal
            </h3>
            <p className="text-stone-600 max-w-md mx-auto">
              Anda belum ditugaskan untuk ujian apapun. Jadwal akan muncul di
              sini setelah panitia menugaskan Anda.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {jadwal.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
                isToday(item.tanggal_ujian)
                  ? "border-green-300 bg-green-50"
                  : "border-violet-100 hover:border-violet-300"
              }`}
            >
              {isToday(item.tanggal_ujian) && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  Hari Ini
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-violet-100 rounded-xl">
                    <FileText className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      {item.jenis_ujian}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-stone-600">
                      <Users className="w-4 h-4" />
                      <span>{item.jumlah_peserta} peserta</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-violet-600" />
                  <div>
                    <p className="text-xs text-stone-500">Tanggal</p>
                    <p className="font-bold text-stone-900">
                      {formatDate(item.tanggal_ujian)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-violet-600" />
                  <div>
                    <p className="text-xs text-stone-500">Waktu</p>
                    <p className="font-bold text-stone-900">
                      {formatTime(item.waktu_mulai)}
                      {item.waktu_selesai &&
                        ` - ${formatTime(item.waktu_selesai)}`}{" "}
                      WIB
                    </p>
                  </div>
                </div>

                {item.lokasi && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-violet-600" />
                    <div>
                      <p className="text-xs text-stone-500">Lokasi</p>
                      <p className="font-bold text-stone-900">{item.lokasi}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
