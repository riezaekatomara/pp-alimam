"use client";

import { useState, useEffect } from "react";
import {
  FileCheck,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  User,
  Calendar,
  Phone,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Dokumen {
  id: string;
  jenis_dokumen: string;
  status_verifikasi: string;
  catatan: string | null;
  file_url: string | null;
  created_at: string;
  updated_at: string;
  pendaftar: {
    id: string;
    nomor_pendaftaran: string;
    nama_lengkap: string;
    jenjang: string;
    no_hp: string | null;
  } | null;
}

export default function VerifikasiDokumenPage() {
  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedDokumen, setSelectedDokumen] = useState<Dokumen | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchDokumen();
  }, [statusFilter]);

  const fetchDokumen = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/verifikasi/dokumen?status=${statusFilter}`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setDokumen(result.data);
    } catch (error) {
      console.error("Error fetching dokumen:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (dokumenId: string, status: "verified" | "rejected") => {
    try {
      setProcessing(true);
      const response = await fetch("/api/admin/verifikasi/dokumen", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dokumen_id: dokumenId,
          status_verifikasi: status,
          catatan: catatan.trim() || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to verify");

      await fetchDokumen();
      setShowModal(false);
      setSelectedDokumen(null);
      setCatatan("");
    } catch (error) {
      console.error("Error verifying dokumen:", error);
      alert("Gagal memverifikasi dokumen");
    } finally {
      setProcessing(false);
    }
  };

  const openModal = (dok: Dokumen) => {
    setSelectedDokumen(dok);
    setCatatan(dok.catatan || "");
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">
                Verifikasi Dokumen
              </h2>
              <p className="text-stone-600">
                Total: {dokumen.length} dokumen
              </p>
            </div>
          </div>
          <button
            onClick={fetchDokumen}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-stone-600" />
          <label className="text-sm font-medium text-stone-700">
            Filter Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="verified">Terverifikasi</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-stone-600">Memuat data dokumen...</p>
            </div>
          </div>
        ) : dokumen.length === 0 ? (
          <div className="text-center py-20">
            <FileCheck className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-600 text-lg font-medium">
              Tidak ada dokumen {statusFilter === "pending" ? "yang perlu diverifikasi" : statusFilter}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200">
            {dokumen.map((dok) => (
              <div
                key={dok.id}
                className="p-6 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Pendaftar Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/admin/pendaftar/${dok.pendaftar?.id}`}
                          className="font-bold text-lg text-blue-600 hover:text-blue-700"
                        >
                          {dok.pendaftar?.nama_lengkap || "Unknown"}
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-stone-600">
                          <span className="font-mono">
                            {dok.pendaftar?.nomor_pendaftaran}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                            {dok.pendaftar?.jenjang}
                          </span>
                          {dok.pendaftar?.no_hp && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {dok.pendaftar.no_hp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dokumen Info */}
                    <div className="ml-12 space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-stone-500" />
                        <span className="font-medium text-stone-900">
                          {dok.jenis_dokumen}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <Calendar className="w-4 h-4" />
                        <span>Diupload: {formatDate(dok.created_at)}</span>
                      </div>

                      {dok.catatan && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-900">
                            <strong>Catatan:</strong> {dok.catatan}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {dok.file_url && (
                      <a
                        href={dok.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Lihat File
                      </a>
                    )}

                    {statusFilter === "pending" && (
                      <button
                        onClick={() => openModal(dok)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <FileCheck className="w-4 h-4" />
                        Verifikasi
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedDokumen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Verifikasi Dokumen
            </h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-bold text-stone-900">
                  {selectedDokumen.pendaftar?.nama_lengkap}
                </p>
                <p className="text-sm text-stone-600">
                  {selectedDokumen.jenis_dokumen}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tambahkan catatan jika perlu..."
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleVerify(selectedDokumen.id, "verified")}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {processing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Terima
                  </>
                )}
              </button>

              <button
                onClick={() => handleVerify(selectedDokumen.id, "rejected")}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {processing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Tolak
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDokumen(null);
                  setCatatan("");
                }}
                disabled={processing}
                className="px-4 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
