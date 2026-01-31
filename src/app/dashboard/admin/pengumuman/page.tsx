"use client";

import { AlertCircle } from "lucide-react";

export default function PengumumanPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-teal-100">
      <AlertCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-stone-900 mb-2">
        Pengumuman
      </h2>
      <p className="text-stone-600 mb-4">
        Halaman ini sedang dalam pengembangan
      </p>
      <div className="text-sm text-stone-500">
        Fitur: Publish hasil seleksi, kirim notifikasi
      </div>
    </div>
  );
}
