"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
  Loader2,
} from "lucide-react";

export default function DaftarUlangTab() {
  const [pernyataan, setPernyataan] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pernyataan) {
      alert("Harap setujui pernyataan terlebih dahulu");
      return;
    }

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Daftar ulang berhasil! Status Anda akan diupdate.");
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-black mb-2">Daftar Ulang</h1>
        <p className="text-emerald-100">
          Konfirmasi kehadiran dan daftar ulang sebagai santri baru
        </p>
      </div>

      {/* Success Info */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-green-900 mb-2">
              Selamat Anda Diterima!
            </h3>
            <p className="text-sm text-green-800">
              Silakan lakukan daftar ulang untuk mengkonfirmasi kehadiran Anda
              sebagai santri baru Ponpes Al-Imam Al-Islami Sukabumi.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            Form Daftar Ulang
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requirements */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-3">
              Persyaratan Daftar Ulang:
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Membawa berkas asli dokumen pendaftaran</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Melunasi biaya daftar ulang</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Menyerahkan pas foto terbaru</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Menghadiri orientasi santri baru</span>
              </li>
            </ul>
          </div>

          {/* Declaration */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pernyataan}
                onChange={(e) => setPernyataan(e.target.checked)}
                className="mt-1 w-5 h-5 text-green-600 border-stone-300 rounded focus:ring-green-500"
              />
              <div>
                <p className="font-bold text-stone-900 mb-1">
                  Pernyataan Kesanggupan
                </p>
                <p className="text-sm text-stone-700">
                  Saya menyatakan bersedia untuk mengikuti seluruh peraturan
                  yang berlaku di Ponpes Al-Imam Al-Islami Sukabumi dan sanggup
                  memenuhi semua persyaratan yang ditentukan. Saya memahami
                  bahwa informasi yang saya berikan adalah benar dan dapat
                  dipertanggungjawabkan.
                </p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!pernyataan || submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Daftar Ulang
              </>
            )}
          </button>
        </form>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-amber-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-700" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-amber-900 mb-2">Penting!</h4>
            <p className="text-sm text-amber-800">
              Batas waktu daftar ulang adalah 7 hari setelah pengumuman.
              Apabila melewati batas waktu, maka dianggap mengundurkan diri dan
              kursi akan diberikan kepada calon santri lainnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
