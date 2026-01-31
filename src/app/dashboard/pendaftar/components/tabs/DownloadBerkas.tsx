"use client";

import { Download, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function DownloadBerkasTab() {
  const documents = [
    {
      name: "Kartu Ujian",
      description: "Kartu identitas ujian seleksi",
      status: "available",
      url: "#",
    },
    {
      name: "Surat Panggilan Ujian",
      description: "Surat resmi panggilan ujian",
      status: "pending",
      url: null,
    },
    {
      name: "Bukti Pendaftaran",
      description: "Bukti sudah terdaftar di sistem",
      status: "available",
      url: "#",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-black mb-2">Download Berkas</h1>
        <p className="text-indigo-100">
          Unduh dokumen penting untuk proses pendaftaran
        </p>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-100 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">{doc.name}</h3>
                  <p className="text-sm text-stone-600">{doc.description}</p>
                </div>
              </div>
              {doc.status === "available" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
            </div>

            {doc.status === "available" ? (
              <a
                href={doc.url || "#"}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-stone-200 text-stone-500 rounded-lg font-medium cursor-not-allowed"
              >
                Belum Tersedia
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-blue-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Informasi</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Dokumen akan tersedia setelah status Anda mencapai tahap tertentu</li>
              <li>• Simpan semua dokumen yang diunduh dengan baik</li>
              <li>• Cetak dokumen jika diperlukan untuk keperluan ujian</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
