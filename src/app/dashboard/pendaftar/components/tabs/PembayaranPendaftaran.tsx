"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CreditCard,
  Building2,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
  Copy,
  FileText,
  Image,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Wallet,
  Banknote,
  Shield,
  Calendar,
  Info,
  Phone,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

type PaymentStatus = "unpaid" | "pending" | "verified" | "rejected" | "expired";

interface PembayaranData {
  id: string;
  metode_pembayaran: string;
  jumlah: number;
  status_pembayaran: string;
  bukti_transfer_path?: string;
  bukti_transfer_filename?: string;
  midtrans_order_id?: string;
  midtrans_payment_type?: string;
  verified_at?: string;
  catatan_verifikasi?: string;
  created_at: string;
  updated_at: string;
}

interface PaymentStatusResponse {
  pendaftar: {
    id: string;
    nomor_pendaftaran: string;
    nama_lengkap: string;
    status_pendaftaran: string;
  };
  tahun_ajaran: {
    id: string;
    nama: string;
    biaya_pendaftaran: number;
    tanggal_tutup_pendaftaran: string;
  };
  pembayaran: PembayaranData | null;
  status: PaymentStatus;
  deadline: string;
  is_deadline_passed: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const BANK_INFO = {
  nama_bank: "BSI (Bank Syariah Indonesia)",
  nomor_rekening: "1234567890",
  atas_nama: "Ponpes Al-Imam Al-Islami",
  kode_bank: "451",
};

const STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: any;
    description: string;
  }
> = {
  unpaid: {
    label: "Menunggu Pembayaran",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    icon: Clock,
    description: "Silakan lakukan pembayaran untuk melanjutkan pendaftaran",
  },
  pending: {
    label: "Menunggu Verifikasi",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    icon: Clock,
    description: "Pembayaran sedang diverifikasi oleh tim kami (1x24 jam)",
  },
  verified: {
    label: "Pembayaran Terverifikasi",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    icon: CheckCircle,
    description: "Alhamdulillah! Pembayaran Anda telah terverifikasi",
  },
  rejected: {
    label: "Pembayaran Ditolak",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    icon: XCircle,
    description: "Mohon upload ulang bukti pembayaran yang valid",
  },
  expired: {
    label: "Batas Waktu Habis",
    color: "text-stone-700",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-300",
    icon: AlertCircle,
    description: "Maaf, batas waktu pembayaran telah berakhir",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================
// COPY BUTTON COMPONENT
// ============================================

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-gold-100)] hover:bg-[var(--color-gold-200)] text-[var(--color-gold-800)] text-sm font-medium rounded-lg transition-colors"
      title={`Salin ${label}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Salin</span>
        </>
      )}
    </button>
  );
}

// ============================================
// TIMELINE COMPONENT
// ============================================

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

function PaymentTimeline({ paymentStatus }: { paymentStatus: PaymentStatus }) {
  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Upload Bukti",
      description: "Kirim bukti transfer",
      status:
        paymentStatus === "unpaid" || paymentStatus === "expired"
          ? "current"
          : "completed",
    },
    {
      id: 2,
      title: "Verifikasi Admin",
      description: "Pemeriksaan 1x24 jam",
      status:
        paymentStatus === "pending"
          ? "current"
          : paymentStatus === "verified"
            ? "completed"
            : paymentStatus === "rejected"
              ? "current"
              : "upcoming",
    },
    {
      id: 3,
      title: "Selesai",
      description: "Pembayaran terverifikasi",
      status: paymentStatus === "verified" ? "completed" : "upcoming",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step.status === "completed"
                  ? "bg-green-500 border-green-500 text-white"
                  : step.status === "current"
                    ? "bg-[var(--color-gold-500)] border-[var(--color-gold-500)] text-white animate-pulse"
                    : "bg-stone-100 border-stone-300 text-stone-400"
                }`}
            >
              {step.status === "completed" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">{step.id}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-xs font-bold ${step.status === "completed"
                    ? "text-green-700"
                    : step.status === "current"
                      ? "text-[var(--color-gold-700)]"
                      : "text-stone-400"
                  }`}
              >
                {step.title}
              </p>
              <p className="text-[10px] text-stone-500 hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 rounded ${steps[index + 1].status === "completed" ||
                  steps[index + 1].status === "current"
                  ? "bg-green-300"
                  : "bg-stone-200"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// UPLOAD AREA COMPONENT
// ============================================

interface UploadAreaProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  uploadProgress: number;
  currentFile?: { name: string; path: string } | null;
  isRejected?: boolean;
}

function UploadArea({
  onUpload,
  isUploading,
  uploadProgress,
  currentFile,
  isRejected,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onUpload(files[0]);
      }
    },
    [onUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onUpload(files[0]);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onUpload]
  );

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Current file info */}
      {currentFile && !isRejected && (
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-blue-900 truncate">
                {currentFile.name}
              </p>
              <p className="text-sm text-blue-600">
                Bukti transfer sudah diupload
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${isDragging
            ? "border-[var(--color-teal-500)] bg-[var(--color-teal-50)]"
            : isRejected
              ? "border-red-300 bg-red-50 hover:border-red-400"
              : "border-stone-300 hover:border-[var(--color-teal-400)] hover:bg-stone-50"
          } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center gap-3">
          {isUploading ? (
            <Loader2 className="w-12 h-12 text-[var(--color-teal-500)] animate-spin" />
          ) : (
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${isRejected
                  ? "bg-red-100"
                  : "bg-[var(--color-teal-100)]"
                }`}
            >
              <Upload
                className={`w-8 h-8 ${isRejected
                    ? "text-red-600"
                    : "text-[var(--color-teal-600)]"
                  }`}
              />
            </div>
          )}
          <div>
            <p
              className={`font-bold ${isRejected ? "text-red-700" : "text-stone-700"
                }`}
            >
              {isRejected
                ? "Upload Ulang Bukti Transfer"
                : currentFile
                  ? "Ganti Bukti Transfer"
                  : "Klik atau Seret File ke Sini"}
            </p>
            <p className="text-sm text-stone-500 mt-1">
              Format: JPG, PNG, atau PDF (Maks. 2MB)
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[var(--color-teal-600)] font-medium">
                Mengupload...
              </span>
              <span className="text-stone-500">{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-teal-500)] to-[var(--color-teal-600)] rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function StatusPembayaranTab() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMidtransLoading, setIsMidtransLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState<
    "midtrans" | "manual" | null
  >(null);

  // Fetch payment status
  const fetchPaymentStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/pembayaran/status");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Gagal memuat data pembayaran");
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

  // Show toast
  const showToast = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  // Handle manual upload
  const handleManualUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Validate file
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Ukuran file terlalu besar! Maksimal 2MB");
      }

      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format file tidak didukung! Gunakan JPG, PNG, atau PDF");
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload
      const response = await fetch("/api/pembayaran/manual/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Gagal mengupload bukti pembayaran");
      }

      showToast("success", result.message || "Bukti pembayaran berhasil diupload!");

      // Refresh data
      await fetchPaymentStatus();
    } catch (err: any) {
      showToast("error", err.message || "Gagal mengupload file");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle Midtrans payment
  const handleMidtransPayment = async () => {
    try {
      setIsMidtransLoading(true);

      const response = await fetch("/api/pembayaran/midtrans/create", {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Gagal membuat transaksi pembayaran");
      }

      // Redirect to Midtrans Snap
      if (result.data.redirect_url) {
        window.location.href = result.data.redirect_url;
      } else if (result.data.snap_token && (window as any).snap) {
        // Use Snap popup if available
        (window as any).snap.pay(result.data.snap_token, {
          onSuccess: () => {
            showToast("success", "Pembayaran berhasil!");
            fetchPaymentStatus();
          },
          onPending: () => {
            showToast("info", "Pembayaran pending. Silakan selesaikan pembayaran.");
            fetchPaymentStatus();
          },
          onError: () => {
            showToast("error", "Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            showToast("info", "Anda menutup popup pembayaran tanpa menyelesaikan transaksi.");
          },
        });
      } else {
        throw new Error("Tidak dapat membuka halaman pembayaran");
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memproses pembayaran");
    } finally {
      setIsMidtransLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-12 h-12 text-[var(--color-brown-600)] animate-spin" />
        <p className="text-stone-600 font-medium">Memuat data pembayaran...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-800 mb-2">
            Gagal Memuat Data
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPaymentStatus}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const statusConfig = STATUS_CONFIG[data.status];
  const StatusIcon = statusConfig.icon;
  const daysRemaining = getDaysRemaining(data.deadline);
  const isPaymentCompleted = data.status === "verified";
  const isPaymentPending = data.status === "pending";
  const isPaymentRejected = data.status === "rejected";
  const canMakePayment =
    data.status === "unpaid" || data.status === "rejected";

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fadeInRight ${toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : toast.type === "error" ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
          <span className="font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-6 h-6" />
              <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">
                STEP 1
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">Pembayaran Pendaftaran</h1>
            <p className="text-[var(--color-cream-200)]">
              Lakukan pembayaran untuk melanjutkan proses pendaftaran
            </p>
          </div>
          <button
            onClick={fetchPaymentStatus}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Payment Amount Card */}
      <div className="bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-cream-100)] border-2 border-[var(--color-gold-300)] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-gold-700)] font-medium mb-1">
              Total Biaya Pendaftaran
            </p>
            <p className="text-3xl md:text-4xl font-black text-[var(--color-brown-800)]">
              {formatRupiah(data.tahun_ajaran.biaya_pendaftaran)}
            </p>
            <p className="text-sm text-stone-600 mt-2">
              {data.tahun_ajaran.nama}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
            >
              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
              <span className={`font-bold ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
            {!data.is_deadline_passed && daysRemaining > 0 && !isPaymentCompleted && (
              <p className="text-sm text-stone-600 mt-2 flex items-center justify-end gap-1">
                <Calendar className="w-4 h-4" />
                Batas waktu: <strong>{daysRemaining} hari lagi</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status Description & Timeline */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6">
        <div className={`p-4 rounded-xl mb-6 ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
          <div className="flex items-start gap-3">
            <StatusIcon className={`w-6 h-6 ${statusConfig.color} flex-shrink-0 mt-0.5`} />
            <div>
              <p className={`font-bold ${statusConfig.color}`}>
                {statusConfig.label}
              </p>
              <p className="text-sm text-stone-600 mt-1">
                {statusConfig.description}
              </p>
              {isPaymentRejected && data.pembayaran?.catatan_verifikasi && (
                <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Alasan Penolakan:</strong>{" "}
                    {data.pembayaran.catatan_verifikasi}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-bold text-stone-700 mb-4">
            Proses Pembayaran
          </h3>
          <PaymentTimeline paymentStatus={data.status} />
        </div>
      </div>

      {/* Payment Verified - Success Message */}
      {isPaymentCompleted && (
        <div className="bg-gradient-to-r from-green-50 to-[var(--color-teal-50)] border-2 border-green-300 rounded-2xl p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-green-800 mb-2">
              Pembayaran Berhasil!
            </h2>
            <p className="text-green-700 mb-4">
              Alhamdulillah, pembayaran Anda telah terverifikasi pada{" "}
              {data.pembayaran?.verified_at
                ? formatDateTime(data.pembayaran.verified_at)
                : "-"}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-green-200">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">
                Anda sekarang dapat melanjutkan ke tahap berikutnya
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options - Only show if can make payment */}
      {canMakePayment && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[var(--color-gold-600)]" />
            Pilih Metode Pembayaran
          </h2>

          {/* Payment Method Tabs */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Option 1: Midtrans */}
            <button
              onClick={() =>
                setActivePaymentMethod(
                  activePaymentMethod === "midtrans" ? null : "midtrans"
                )
              }
              className={`p-5 rounded-xl border-2 text-left transition-all ${activePaymentMethod === "midtrans"
                  ? "border-[var(--color-teal-500)] bg-[var(--color-teal-50)]"
                  : "border-stone-200 bg-white hover:border-[var(--color-teal-300)]"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${activePaymentMethod === "midtrans"
                        ? "bg-[var(--color-teal-500)]"
                        : "bg-[var(--color-teal-100)]"
                      }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${activePaymentMethod === "midtrans"
                          ? "text-white"
                          : "text-[var(--color-teal-600)]"
                        }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">
                      Pembayaran Online
                    </h3>
                    <p className="text-sm text-stone-500">
                      Virtual Account, E-wallet, Kartu
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  Rekomendasi
                </span>
              </div>
            </button>

            {/* Option 2: Manual Transfer */}
            <button
              onClick={() =>
                setActivePaymentMethod(
                  activePaymentMethod === "manual" ? null : "manual"
                )
              }
              className={`p-5 rounded-xl border-2 text-left transition-all ${activePaymentMethod === "manual"
                  ? "border-[var(--color-gold-500)] bg-[var(--color-gold-50)]"
                  : "border-stone-200 bg-white hover:border-[var(--color-gold-300)]"
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${activePaymentMethod === "manual"
                      ? "bg-[var(--color-gold-500)]"
                      : "bg-[var(--color-gold-100)]"
                    }`}
                >
                  <Building2
                    className={`w-6 h-6 ${activePaymentMethod === "manual"
                        ? "text-white"
                        : "text-[var(--color-gold-600)]"
                      }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Transfer Manual</h3>
                  <p className="text-sm text-stone-500">
                    Transfer ke rekening BSI
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Midtrans Payment Content */}
          {activePaymentMethod === "midtrans" && (
            <div className="bg-white border-2 border-[var(--color-teal-200)] rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-stone-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-teal-600)]" />
                Pembayaran Online via Midtrans
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Virtual Account (BCA, BNI, BRI, Mandiri)
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  E-wallet (GoPay, OVO, DANA, ShopeePay)
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Kartu Kredit/Debit
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Minimarket (Alfamart, Indomaret)
                </div>
              </div>

              <div className="bg-[var(--color-teal-50)] border border-[var(--color-teal-200)] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[var(--color-teal-600)] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[var(--color-teal-800)]">
                    <p className="font-bold">Pembayaran Aman & Otomatis</p>
                    <p className="mt-1">
                      Status pembayaran akan diperbarui otomatis setelah transaksi
                      berhasil. Tidak perlu upload bukti transfer.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleMidtransPayment}
                disabled={isMidtransLoading}
                className="w-full py-4 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] hover:from-[var(--color-teal-700)] hover:to-[var(--color-teal-800)] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isMidtransLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Bayar Sekarang</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Manual Transfer Content */}
          {activePaymentMethod === "manual" && (
            <div className="bg-white border-2 border-[var(--color-gold-200)] rounded-xl p-6 space-y-6">
              <h3 className="font-bold text-stone-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--color-gold-600)]" />
                Transfer Manual ke Rekening BSI
              </h3>

              {/* Bank Info */}
              <div className="bg-[var(--color-gold-50)] border-2 border-[var(--color-gold-200)] rounded-xl p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-500">Bank Tujuan</p>
                      <p className="font-bold text-stone-900">
                        {BANK_INFO.nama_bank}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                      <Banknote className="w-6 h-6 text-[var(--color-gold-600)]" />
                    </div>
                  </div>

                  <div className="border-t border-[var(--color-gold-200)] pt-4">
                    <p className="text-sm text-stone-500 mb-1">Nomor Rekening</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-[var(--color-brown-800)] tracking-wider">
                        {BANK_INFO.nomor_rekening}
                      </p>
                      <CopyButton
                        text={BANK_INFO.nomor_rekening}
                        label="nomor rekening"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--color-gold-200)] pt-4">
                    <p className="text-sm text-stone-500 mb-1">Atas Nama</p>
                    <p className="font-bold text-stone-900">{BANK_INFO.atas_nama}</p>
                  </div>

                  <div className="border-t border-[var(--color-gold-200)] pt-4">
                    <p className="text-sm text-stone-500 mb-1">Jumlah Transfer</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-green-700">
                        {formatRupiah(data.tahun_ajaran.biaya_pendaftaran)}
                      </p>
                      <CopyButton
                        text={data.tahun_ajaran.biaya_pendaftaran.toString()}
                        label="jumlah"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-amber-800">
                      Petunjuk Transfer Manual:
                    </p>
                    <ol className="mt-2 space-y-1 text-amber-700 list-decimal list-inside">
                      <li>Transfer sesuai jumlah yang tertera di atas</li>
                      <li>
                        Simpan bukti transfer (foto struk ATM / screenshot mobile
                        banking)
                      </li>
                      <li>Upload bukti transfer di bawah ini</li>
                      <li>Tunggu verifikasi dari tim kami (maks. 1x24 jam)</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div>
                <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-stone-600" />
                  Upload Bukti Transfer
                </h4>
                <UploadArea
                  onUpload={handleManualUpload}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                  currentFile={
                    data.pembayaran?.bukti_transfer_filename
                      ? {
                        name: data.pembayaran.bukti_transfer_filename,
                        path: data.pembayaran.bukti_transfer_path || "",
                      }
                      : null
                  }
                  isRejected={isPaymentRejected}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Pending - Waiting Message */}
      {isPaymentPending && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">
                Pembayaran Sedang Diverifikasi
              </h3>
              <p className="text-blue-700 text-sm mb-3">
                Tim kami sedang memverifikasi pembayaran Anda. Proses ini biasanya
                memakan waktu maksimal 1x24 jam pada hari kerja.
              </p>
              {data.pembayaran && (
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-stone-500">Metode</p>
                      <p className="font-medium text-stone-900">
                        {data.pembayaran.metode_pembayaran === "midtrans"
                          ? `Online (${data.pembayaran.midtrans_payment_type || "Midtrans"})`
                          : "Transfer Manual BSI"}
                      </p>
                    </div>
                    <div>
                      <p className="text-stone-500">Tanggal Upload</p>
                      <p className="font-medium text-stone-900">
                        {formatDateTime(data.pembayaran.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-r from-[var(--color-teal-50)] to-[var(--color-cream-100)] border-2 border-[var(--color-teal-200)] rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[var(--color-teal-600)] rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-stone-900 mb-2">
              Butuh Bantuan?
            </h3>
            <p className="text-sm text-stone-600 mb-3">
              Jika mengalami kendala dalam pembayaran, silakan hubungi kami:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/622667345601"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </a>
              <a
                href="tel:+622667345601"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-teal-600)] hover:bg-[var(--color-teal-700)] text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                (0266) 734-5601
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
