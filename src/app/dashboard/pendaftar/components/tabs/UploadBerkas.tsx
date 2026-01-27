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
  Trash2,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Loader2,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

type DokumenStatus = "pending" | "uploaded" | "verified" | "rejected";

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
      return "text-green-600 bg-green-100";
    case "uploaded":
      return "text-blue-600 bg-blue-100";
    case "rejected":
      return "text-red-600 bg-red-100";
    default:
      return "text-stone-500 bg-stone-100";
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
      // Reset input
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

  // Allowed extensions for display
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
      className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        isDragging
          ? "border-teal-500 bg-teal-50 shadow-lg scale-[1.02]"
          : dokumen.status === "verified"
          ? "border-green-200"
          : dokumen.status === "rejected"
          ? "border-red-200"
          : dokumen.status === "uploaded"
          ? "border-blue-200"
          : "border-stone-200 hover:border-teal-300"
      }`}
    >
      {/* Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(
                dokumen.status
              )}`}
            >
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-stone-900">{dokumen.label}</h4>
                {dokumen.required ? (
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                    Wajib
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-medium bg-stone-100 text-stone-600 rounded">
                    Opsional
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-500">
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
                className="p-2 text-stone-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                title="Lihat Dokumen"
              >
                <Eye className="w-5 h-5" />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-stone-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-400" />
            )}
          </div>
        </div>

        {/* Progress bar saat upload */}
        {isUploading && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-teal-600 font-medium">Mengupload...</span>
              <span className="text-stone-500">{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-stone-100">
          {/* Info dokumen yang sudah diupload */}
          {dokumen.status !== "pending" && dokumen.file_name && (
            <div className="mt-4 p-3 bg-stone-50 rounded-lg">
              <div className="flex items-center gap-3">
                {(() => {
                  const FileIcon = getFileIcon(dokumen.file_type);
                  return (
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-stone-200">
                      <FileIcon className="w-5 h-5 text-stone-600" />
                    </div>
                  );
                })()}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 truncate">
                    {dokumen.file_name}
                  </p>
                  <p className="text-sm text-stone-500">
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

              {/* Catatan jika ditolak */}
              {dokumen.status === "rejected" && dokumen.catatan && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Catatan:</strong> {dokumen.catatan}
                  </p>
                </div>
              )}

              {/* Info verifikasi */}
              {dokumen.status === "verified" && dokumen.verified_at && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    Diverifikasi pada{" "}
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

          {/* Upload Area */}
          <div
            className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-teal-500 bg-teal-50"
                : "border-stone-300 hover:border-teal-400 hover:bg-stone-50"
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
            <div className="flex flex-col items-center gap-3">
              {isUploading ? (
                <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
              ) : (
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <Upload className="w-7 h-7 text-teal-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-stone-700">
                  {dokumen.status === "pending"
                    ? "Klik atau seret file ke sini"
                    : "Upload ulang file"}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  Format: {allowedExtensions} &bull; Maks {maxSizeDisplay}
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

export default function UploadBerkasTab() {
  const [dokumenList, setDokumenList] = useState<DokumenItem[]>([]);
  const [dokumenConfig, setDokumenConfig] = useState<
    Record<string, DokumenConfig>
  >({});
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

  // Fetch dokumen status
  const fetchDokumenStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statusRes, configRes] = await Promise.all([
        fetch("/api/dokumen/status"),
        fetch("/api/upload/dokumen"),
      ]);

      const statusData = await statusRes.json();
      const configData = await configRes.json();

      if (!statusData.success) {
        throw new Error(statusData.error || "Gagal memuat data dokumen");
      }

      setDokumenList(statusData.data.dokumen);
      setSummary(statusData.data.summary);

      if (configData.success) {
        setDokumenConfig(configData.data);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDokumenStatus();
  }, [fetchDokumenStatus]);

  // Show toast
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  // Handle upload
  const handleUpload = async (key: string, file: File) => {
    try {
      // Add to uploading set
      setUploadingKeys((prev) => new Set(prev).add(key));
      setUploadProgress((prev) => ({ ...prev, [key]: 0 }));

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jenis_dokumen", key);

      // Simulate progress (karena fetch tidak support progress untuk upload)
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

      // Upload
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

      // Refresh data
      await fetchDokumenStatus();
    } catch (err: any) {
      showToast("error", err.message || "Gagal mengupload file");
    } finally {
      // Remove from uploading set
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

  // Handle preview
  const handlePreview = async (dokumen: DokumenItem) => {
    if (!dokumen.file_path) return;

    try {
      const response = await fetch(`/api/dokumen/preview?jenis=${dokumen.key}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Gagal membuat link preview");
      }

      // Buka di tab baru
      window.open(data.data.url, "_blank");
    } catch (err: any) {
      showToast("error", err.message || "Gagal membuka preview");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
        <p className="text-stone-600">Memuat data dokumen...</p>
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
            onClick={fetchDokumenStatus}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fadeInRight ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-80"
          >
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Upload Berkas</h1>
            <p className="text-teal-100">
              Upload dokumen persyaratan pendaftaran
            </p>
          </div>
          <button
            onClick={fetchDokumenStatus}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-stone-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Total Dokumen</p>
                <p className="text-lg font-bold text-stone-900">
                  {summary.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-stone-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Sudah Diupload</p>
                <p className="text-lg font-bold text-stone-900">
                  {summary.uploaded}/{summary.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-stone-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Terverifikasi</p>
                <p className="text-lg font-bold text-stone-900">
                  {summary.verified}/{summary.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-stone-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">
                    {summary.progress.required.percentage}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-stone-600">Progress Wajib</p>
                <div className="w-full h-2 bg-stone-200 rounded-full mt-1">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{
                      width: `${summary.progress.required.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              <span className="font-bold">Petunjuk Upload:</span>
            </p>
            <ul className="text-sm text-amber-700 mt-1 space-y-1">
              <li>
                &bull; Pastikan dokumen jelas dan dapat dibaca dengan baik
              </li>
              <li>&bull; Format foto wajib JPG/PNG, dokumen boleh PDF</li>
              <li>&bull; Ukuran maksimal 1MB untuk foto, 2MB untuk dokumen</li>
              <li>
                &bull; Dokumen yang sudah diupload dapat diupload ulang jika
                diperlukan
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dokumen Wajib Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
            !
          </span>
          Dokumen Wajib
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      </div>

      {/* Dokumen Opsional Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-stone-400 text-white rounded-lg flex items-center justify-center text-sm font-bold">
            +
          </span>
          Dokumen Opsional
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      </div>

      {/* Bottom Info */}
      <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-teal-900">Setelah Upload Selesai</h3>
            <p className="text-sm text-teal-700 mt-1">
              Tim verifikasi akan memeriksa dokumen Anda dalam 1-2 hari kerja.
              Anda akan mendapat notifikasi jika ada dokumen yang perlu
              diperbaiki.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
