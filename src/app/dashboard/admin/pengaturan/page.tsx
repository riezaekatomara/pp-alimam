"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Calendar,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Plus,
  Star,
} from "lucide-react";

interface TahunAjaran {
  id: string;
  nama: string;
  tahun_mulai: number;
  tahun_selesai: number;
  is_active: boolean;
  tanggal_buka_pendaftaran: string;
  tanggal_tutup_pendaftaran: string;
  biaya_pendaftaran: number;
}

export default function PengaturanPage() {
  const [tahunAjaranList, setTahunAjaranList] = useState<TahunAjaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchTahunAjaran = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/tahun-ajaran/seed");
      if (response.ok) {
        const result = await response.json();
        setTahunAjaranList(result.all || []);
      }
    } catch (error) {
      console.error("Error fetching tahun ajaran:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTahunAjaran();
  }, []);

  const handleSeed2026 = async () => {
    try {
      setSeeding(true);
      setMessage(null);

      const response = await fetch("/api/admin/tahun-ajaran/seed", {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: result.message });
        fetchTahunAjaran();
      } else {
        setMessage({ type: "error", text: result.error || "Gagal menambahkan tahun ajaran" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Terjadi kesalahan" });
    } finally {
      setSeeding(false);
    }
  };

  const activeTahunAjaran = tahunAjaranList.find((ta) => ta.is_active);
  const has2026 = tahunAjaranList.some(
    (ta) => ta.tahun_mulai === 2026 && ta.tahun_selesai === 2027
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">Pengaturan</h2>
              <p className="text-stone-600">Konfigurasi sistem PPDB</p>
            </div>
          </div>
          <button
            onClick={fetchTahunAjaran}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl border-2 ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Tahun Ajaran Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-stone-900">Tahun Ajaran</h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <>
            {/* Active Tahun Ajaran */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-stone-700 mb-3">
                Tahun Ajaran Aktif
              </h4>
              {activeTahunAjaran ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-green-600 fill-green-600" />
                    <div>
                      <p className="text-lg font-bold text-green-800">
                        {activeTahunAjaran.nama}
                      </p>
                      <p className="text-sm text-green-700">
                        Pendaftaran:{" "}
                        {formatDate(activeTahunAjaran.tanggal_buka_pendaftaran)}{" "}
                        - {formatDate(activeTahunAjaran.tanggal_tutup_pendaftaran)}
                      </p>
                      <p className="text-sm text-green-700">
                        Biaya: {formatCurrency(activeTahunAjaran.biaya_pendaftaran)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 font-medium">
                    Tidak ada tahun ajaran yang aktif
                  </p>
                </div>
              )}
            </div>

            {/* Add 2026/2027 Button */}
            {!has2026 && (
              <div className="mb-6">
                <button
                  onClick={handleSeed2026}
                  disabled={seeding}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {seeding ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Tambah & Aktifkan Tahun Ajaran 2026/2027
                </button>
              </div>
            )}

            {/* All Tahun Ajaran */}
            <div>
              <h4 className="text-sm font-bold text-stone-700 mb-3">
                Semua Tahun Ajaran
              </h4>
              {tahunAjaranList.length === 0 ? (
                <p className="text-stone-500 text-center py-8">
                  Belum ada data tahun ajaran
                </p>
              ) : (
                <div className="space-y-3">
                  {tahunAjaranList.map((ta) => (
                    <div
                      key={ta.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        ta.is_active
                          ? "border-green-300 bg-green-50"
                          : "border-stone-200 bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {ta.is_active && (
                            <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                              AKTIF
                            </span>
                          )}
                          <div>
                            <p className="font-bold text-stone-900">{ta.nama}</p>
                            <p className="text-sm text-stone-600">
                              {formatDate(ta.tanggal_buka_pendaftaran)} -{" "}
                              {formatDate(ta.tanggal_tutup_pendaftaran)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-stone-900">
                            {formatCurrency(ta.biaya_pendaftaran)}
                          </p>
                          <p className="text-xs text-stone-500">
                            Biaya Pendaftaran
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
