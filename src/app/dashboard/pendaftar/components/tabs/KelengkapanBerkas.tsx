"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Upload,
  FileText,
  Image,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Loader2,
  Download,
  User,
  ClipboardList,
} from "lucide-react";
import DataLengkapForm from "./DataLengkapForm";

// ============================================
// TYPES
// ============================================

type DokumenStatus = "pending" | "uploaded" | "verified" | "rejected";
type TabType = "isi-data" | "data" | "upload" | "download";

interface DokumenItem {
  key: string;
  label: string;
  required: boolean;
  status: DokumenStatus;
  file_name: string | null;
  file_path: string | null;
  file_size: number | null;
  file_type: string | null;
  is_verified: boolean;
  catatan: string | null;
  uploaded_at: string | null;
  verified_at: string | null;
}

interface DokumenConfig {
  label: string;
  maxSize: number;
  allowedTypes: string[];
  required: boolean;
}

interface UploadProgress {
  [key: string]: number;
}

interface DataPendaftaran {
  id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  email: string;
  nomor_ponsel: string;
  [key: string]: any;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileIcon(fileType: string | null) {
  if (!fileType) return FileText;
  if (fileType.startsWith("image/")) return Image;
  return FileText;
}

function getStatusColor(status: DokumenStatus) {
  switch (status) {
    case "verified":
      return "text-emerald-600 bg-emerald-50";
    case "uploaded":
      return "text-blue-600 bg-blue-50";
    case "rejected":
      return "text-red-600 bg-red-50";
    default:
      return "text-ink-400 bg-surface-100";
  }
}

function getStatusIcon(status: DokumenStatus) {
  switch (status) {
    case "verified":
      return CheckCircle;
    case "uploaded":
      return Clock;
    case "rejected":
      return XCircle;
    default:
      return AlertCircle;
  }
}

function getStatusLabel(status: DokumenStatus) {
  switch (status) {
    case "verified":
      return "Terverifikasi";
    case "uploaded":
      return "Menunggu Verifikasi";
    case "rejected":
      return "Ditolak";
    default:
      return "Belum Diupload";
  }
}

// ============================================
// DOKUMEN CARD COMPONENT
// ============================================

interface DokumenCardProps {
  dokumen: DokumenItem;
  config: DokumenConfig | undefined;
  isUploading: boolean;
  uploadProgress: number;
  onUpload: (file: File) => void;
  onPreview: () => void;
}

function DokumenCard({
  dokumen,
  config,
  isUploading,
  uploadProgress,
  onUpload,
  onPreview,
}: DokumenCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const StatusIcon = getStatusIcon(dokumen.status);

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

  const allowedExtensions = config?.allowedTypes
    .map((t) => {
      if (t === "image/jpeg") return "JPG";
      if (t === "image/png") return "PNG";
      if (t === "application/pdf") return "PDF";
      return t;
    })
    .join(", ");

  const maxSizeDisplay = config ? formatFileSize(config.maxSize) : "-";

  return (
    <div
      className={`card-glass transition-all duration-300 overflow-hidden ${isDragging
        ? "border-teal-500 bg-teal-50/50 scale-[1.02]"
        : dokumen.status === "verified"
          ? "border-emerald-200"
          : dokumen.status === "rejected"
            ? "border-red-200"
            : dokumen.status === "uploaded"
              ? "border-blue-200"
              : "border-white/40 hover:border-teal-300"
        }`}
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(
                dokumen.status
              )}`}
            >
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-ink-900">{dokumen.label}</h4>
                {dokumen.required ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 rounded-lg">
                    Wajib
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-surface-200 text-ink-500 rounded-lg">
                    Opsional
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-500 font-medium">
                {getStatusLabel(dokumen.status)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {dokumen.status !== "pending" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview();
                }}
                className="p-2 text-ink-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                title="Lihat Dokumen"
              >
                <Eye className="w-5 h-5" />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-ink-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink-400" />
            )}
          </div>
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-teal-600">MENGUPLOAD...</span>
              <span className="text-ink-500">{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-ink-100/50 pt-4">
          {dokumen.status !== "pending" && dokumen.file_name && (
            <div className="mb-4 p-4 bg-surface-50 rounded-xl border border-ink-100">
              <div className="flex items-center gap-4">
                {(() => {
                  const FileIcon = getFileIcon(dokumen.file_type);
                  return (
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-ink-100 shadow-sm">
                      <FileIcon className="w-6 h-6 text-ink-500" />
                    </div>
                  );
                })()}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink-900 truncate text-sm">
                    {dokumen.file_name}
                  </p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {formatFileSize(dokumen.file_size || 0)} &bull;{" "}
                    {dokumen.uploaded_at
                      ? new Date(dokumen.uploaded_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                      : "-"}
                  </p>
                </div>
              </div>

              {dokumen.status === "rejected" && dokumen.catatan && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Catatan:</strong> {dokumen.catatan}
                  </p>
                </div>
              )}

              {dokumen.status === "verified" && dokumen.verified_at && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-700 font-medium">
                    ✓ Diverifikasi pada{" "}
                    {new Date(dokumen.verified_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${isDragging
              ? "border-teal-500 bg-teal-50"
              : "border-ink-200 hover:border-teal-400 hover:bg-surface-50"
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
              accept={config?.allowedTypes.join(",")}
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center gap-4">
              {isUploading ? (
                <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
              ) : (
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-7 h-7 text-teal-600" />
                </div>
              )}
              <div>
                <p className="font-bold text-ink-900">
                  {dokumen.status === "pending"
                    ? "Klik atau seret file ke sini"
                    : "Upload ulang file"}
                </p>
                <p className="text-xs text-ink-400 mt-1 font-medium bg-surface-100 inline-block px-2 py-1 rounded">
                  {allowedExtensions} &bull; Maks {maxSizeDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function KelengkapanBerkasTab() {
  const [activeTab, setActiveTab] = useState<TabType>("isi-data");
  const [dokumenList, setDokumenList] = useState<DokumenItem[]>([]);
  const [dokumenConfig, setDokumenConfig] = useState<
    Record<string, DokumenConfig>
  >({});
  const [dataPendaftaran, setDataPendaftaran] = useState<DataPendaftaran | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKeys, setUploadingKeys] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [summary, setSummary] = useState<{
    total: number;
    uploaded: number;
    verified: number;
    pending: number;
    progress: {
      required: { total: number; uploaded: number; percentage: number };
      all: { total: number; uploaded: number; percentage: number };
    };
  } | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statusRes, configRes, dataRes] = await Promise.all([
        fetch("/api/dokumen/status"),
        fetch("/api/upload/dokumen"),
        fetch("/api/dashboard/pendaftar-data"),
      ]);

      const statusData = await statusRes.json();
      const configData = await configRes.json();
      const registerData = await dataRes.json();

      if (!statusData.success) {
        throw new Error(statusData.error || "Gagal memuat data dokumen");
      }

      setDokumenList(statusData.data.dokumen);
      setSummary(statusData.data.summary);

      if (configData.success) {
        setDokumenConfig(configData.data);
      }

      if (registerData.success && registerData.data) {
        setDataPendaftaran(registerData.data);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleUpload = async (key: string, file: File) => {
    try {
      setUploadingKeys((prev) => new Set(prev).add(key));
      setUploadProgress((prev) => ({ ...prev, [key]: 0 }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("jenis_dokumen", key);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const current = prev[key] || 0;
          if (current >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [key]: current + 10 };
        });
      }, 200);

      const response = await fetch("/api/upload/dokumen", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress((prev) => ({ ...prev, [key]: 100 }));

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Gagal mengupload file");
      }

      showToast("success", data.message || "File berhasil diupload");
      await fetchData();
    } catch (err: any) {
      showToast("error", err.message || "Gagal mengupload file");
    } finally {
      setUploadingKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[key];
        return newProgress;
      });
    }
  };

  const handlePreview = async (dokumen: DokumenItem) => {
    if (!dokumen.file_path) return;

    try {
      const response = await fetch(`/api/dokumen/preview?jenis=${dokumen.key}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Gagal membuat link preview");
      }

      window.open(data.data.url, "_blank");
    } catch (err: any) {
      showToast("error", err.message || "Gagal membuka preview");
    }
  };

  const handleDownload = async (dokumen: DokumenItem) => {
    try {
      const response = await fetch(
        `/api/dokumen/download?jenis=${dokumen.key}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Gagal mendownload file");
      }

      window.open(data.data.url, "_blank");
      showToast("success", "Download dimulai...");
    } catch (err: any) {
      showToast("error", err.message || "Gagal mendownload file");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-ink-500 font-medium">Memuat data dokumen...</p>
        </div>
      </div>
    );
  }

  if (error && activeTab !== "data") {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-red-900 mb-2">
            Gagal Memuat Data
          </h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="btn-primary bg-red-600 hover:bg-red-700 shadow-red-500/20"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-clay-lg flex items-center gap-3 animate-in slide-in-from-right duration-300 ${toast.type === "success"
            ? "bg-emerald-500 text-white shadow-emerald-500/20"
            : "bg-red-500 text-white shadow-red-500/20"
            }`}
        >
          {toast.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <XCircle className="w-4 h-4 opacity-0" /> {/* Spacer */}
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-500 to-teal-700 p-8 md:p-10 text-white shadow-teal-glow">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
            <ClipboardList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Kelengkapan Data & Berkas</h1>
            <p className="text-teal-100 font-medium max-w-xl">Lengkapi biodata diri dan upload dokumen persyaratan untuk melanjutkan proses pendaftaran.</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-clay-sm">
        {[
          { id: "isi-data", label: "Isi Data Lengkap", icon: User },
          { id: "data", label: "Lihat Data", icon: FileText },
          { id: "upload", label: "Upload Berkas", icon: Upload },
          { id: "download", label: "Download Berkas", icon: Download },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isActive
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                  : 'text-ink-500 hover:bg-surface-100 hover:text-ink-800'
                }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-100' : 'text-ink-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab: Isi Data Lengkap */}
      {activeTab === "isi-data" && (
        <div className="bg-transparent">
          <DataLengkapForm />
        </div>
      )}

      {/* Tab: Lihat Data */}
      {activeTab === "data" && (
        <div className="glass-panel p-8 rounded-[2rem] shadow-clay-md">
          {dataPendaftaran ? (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">Ringkasan Data</h2>
                  <p className="text-ink-400 text-sm">Data yang telah tersimpan di sistem</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-50 p-6 rounded-2xl border border-ink-100">
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-1">Nomor Pendaftaran</p>
                  <p className="text-xl font-bold text-teal-600 font-mono tracking-tight">{dataPendaftaran.nomor_pendaftaran}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-1">Nama Lengkap</p>
                  <p className="text-lg font-bold text-ink-900">{dataPendaftaran.nama_lengkap}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-base font-medium text-ink-700">{dataPendaftaran.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-1">Nomor Ponsel</p>
                  <p className="text-base font-medium text-ink-700">{dataPendaftaran.nomor_ponsel}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">Data Tersimpan Aman</p>
                  <p className="text-sm text-emerald-700 mt-1">
                    Data pendaftaran Anda sudah tercatat. Silakan lanjutkan ke tab <strong>Upload Berkas</strong> untuk melengkapi persyaratan.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-ink-300" />
              </div>
              <p className="text-ink-500 font-medium">Data pendaftaran belum tersedia.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Upload Berkas */}
      {activeTab === "upload" && (
        <div className="space-y-8">
          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Stats Cards - Clay Style */}
              <div className="glass-panel p-4 rounded-2xl border border-white/50 shadow-clay-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase">Total</p>
                    <p className="text-2xl font-black text-ink-900">{summary.total}</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/50 shadow-clay-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase">Uploaded</p>
                    <p className="text-2xl font-black text-ink-900">{summary.uploaded}<span className="text-sm text-ink-400 font-medium">/{summary.total}</span></p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/50 shadow-clay-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase">Verified</p>
                    <p className="text-2xl font-black text-ink-900">{summary.verified}<span className="text-sm text-ink-400 font-medium">/{summary.total}</span></p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/50 shadow-clay-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <span className="text-xs font-black text-teal-600">{summary.progress.required.percentage}%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-ink-400 uppercase mb-1">Progress Wajib</p>
                    <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${summary.progress.required.percentage}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm mb-1">Petunjuk Upload Dokumen</h4>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-xs font-medium text-amber-800 list-disc list-inside opacity-90">
                <li>Pastikan dokumen terbaca jelas (tidak blur)</li>
                <li>Format foto wajib JPG/PNG (Maks 1MB)</li>
                <li>Dokumen scan boleh PDF (Maks 2MB)</li>
                <li>Dokumen dapat diupload ulang jika ditolak</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-ink-100">
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">!</span>
              <h2 className="text-lg font-bold text-ink-900">Dokumen Wajib</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dokumenList
                .filter((d) => d.required)
                .map((dokumen) => (
                  <DokumenCard
                    key={dokumen.key}
                    dokumen={dokumen}
                    config={dokumenConfig[dokumen.key]}
                    isUploading={uploadingKeys.has(dokumen.key)}
                    uploadProgress={uploadProgress[dokumen.key] || 0}
                    onUpload={(file) => handleUpload(dokumen.key, file)}
                    onPreview={() => handlePreview(dokumen)}
                  />
                ))}
            </div>

            {dokumenList.some(d => !d.required) && (
              <>
                <div className="flex items-center gap-3 pb-2 border-b border-ink-100 mt-8">
                  <span className="w-8 h-8 rounded-lg bg-surface-200 text-ink-500 flex items-center justify-center font-bold text-sm">?</span>
                  <h2 className="text-lg font-bold text-ink-900">Dokumen Pendukung (Opsional)</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dokumenList
                    .filter((d) => !d.required)
                    .map((dokumen) => (
                      <DokumenCard
                        key={dokumen.key}
                        dokumen={dokumen}
                        config={dokumenConfig[dokumen.key]}
                        isUploading={uploadingKeys.has(dokumen.key)}
                        uploadProgress={uploadProgress[dokumen.key] || 0}
                        onUpload={(file) => handleUpload(dokumen.key, file)}
                        onPreview={() => handlePreview(dokumen)}
                      />
                    ))}
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* Tab: Download Berkas */}
      {activeTab === "download" && (
        <div className="glass-panel p-8 rounded-[2rem] text-center">
          <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-10 h-10 text-ink-300" />
          </div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Fitur Segera Hadir</h2>
          <p className="text-ink-500 max-w-md mx-auto">
            Fitur download template berkas pendaftaran akan segera tersedia.
          </p>
        </div>
      )}
    </div>
  );
}
