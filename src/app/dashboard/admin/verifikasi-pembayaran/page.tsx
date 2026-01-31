"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  User,
  Calendar,
  Phone,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

interface Pembayaran {
  id: string;
  jumlah: string;
  metode_pembayaran: string;
  status_pembayaran: string;
  catatan: string | null;
  bukti_transfer_url: string | null;
  tanggal_pembayaran: string | null;
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

export default function VerifikasiPembayaranPage() {
  const [pembayaran, setPembayaran] = useState<Pembayaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedPembayaran, setSelectedPembayaran] = useState<Pembayaran | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPembayaran();
  }, [statusFilter]);

  const fetchPembayaran = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/verifikasi/pembayaran?status=${statusFilter}`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setPembayaran(result.data);
    } catch (error) {
      console.error("Error fetching pembayaran:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (
    pembayaranId: string,
    status: "verified" | "rejected"
  ) => {
    try {
      setProcessing(true);
      const response = await fetch("/api/admin/verifikasi/pembayaran", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pembayaran_id: pembayaranId,
          status_pembayaran: status,
          catatan: catatan.trim() || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to verify");

      await fetchPembayaran();
      setShowModal(false);
      setSelectedPembayaran(null);
      setCatatan("");
    } catch (error) {
      console.error("Error verifying pembayaran:", error);
      alert("Gagal memverifikasi pembayaran");
    } finally {
      setProcessing(false);
    }
  };

  const openModal = (pay: Pembayaran) => {
    setSelectedPembayaran(pay);
    setCatatan(pay.catatan || "");
    setShowModal(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRupiah = (amount: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">
                Verifikasi Pembayaran
              </h2>
              <p className="text-stone-600">
                Total: {pembayaran.length} pembayaran
              </p>
            </div>
          </div>
          <button
            onClick={fetchPembayaran}
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
              <p className="text-stone-600">Memuat data pembayaran...</p>
            </div>
          </div>
        ) : pembayaran.length === 0 ? (
          <div className="text-center py-20">
            <CreditCard className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-600 text-lg font-medium">
              Tidak ada pembayaran{" "}
              {statusFilter === "pending"
                ? "yang perlu diverifikasi"
                : statusFilter}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200">
            {pembayaran.map((pay) => (
              <div
                key={pay.id}
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
                          href={`/dashboard/admin/pendaftar/${pay.pendaftar?.id}`}
                          className="font-bold text-lg text-blue-600 hover:text-blue-700"
                        >
                          {pay.pendaftar?.nama_lengkap || "Unknown"}
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-stone-600">
                          <span className="font-mono">
                            {pay.pendaftar?.nomor_pendaftaran}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                            {pay.pendaftar?.jenjang}
                          </span>
                          {pay.pendaftar?.no_hp && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {pay.pendaftar.no_hp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pembayaran Info */}
                    <div className="ml-12 space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-xl text-green-700">
                          {formatRupiah(pay.jumlah)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-stone-600">
                        <span>
                          <strong>Metode:</strong> {pay.metode_pembayaran}
                        </span>
                        {pay.tanggal_pembayaran && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(pay.tanggal_pembayaran)}
                          </span>
                        )}
                      </div>

                      {pay.catatan && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-900">
                            <strong>Catatan:</strong> {pay.catatan}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {pay.bukti_transfer_url && (
                      <a
                        href={pay.bukti_transfer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Lihat Bukti
                      </a>
                    )}

                    {statusFilter === "pending" && (
                      <button
                        onClick={() => openModal(pay)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
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
      {showModal && selectedPembayaran && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Verifikasi Pembayaran
            </h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-bold text-stone-900">
                  {selectedPembayaran.pendaftar?.nama_lengkap}
                </p>
                <p className="text-sm text-stone-600">
                  {selectedPembayaran.metode_pembayaran} -{" "}
                  {formatRupiah(selectedPembayaran.jumlah)}
                </p>
              </div>

              {selectedPembayaran.bukti_transfer_url && (
                <div className="border-2 border-stone-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedPembayaran.bukti_transfer_url}
                    alt="Bukti Transfer"
                    className="w-full h-auto"
                  />
                </div>
              )}

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
                onClick={() =>
                  handleVerify(selectedPembayaran.id, "verified")
                }
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
                onClick={() =>
                  handleVerify(selectedPembayaran.id, "rejected")
                }
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
                  setSelectedPembayaran(null);
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
