"use client";

import { AlertCircle } from "lucide-react";

export default function JadwalUjianPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-purple-100">
      <AlertCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-stone-900 mb-2">
        Jadwal Ujian
      </h2>
      <p className="text-stone-600 mb-4">
        Halaman ini sedang dalam pengembangan
      </p>
      <div className="text-sm text-stone-500">
        Fitur: Manajemen jadwal ujian santri dan wali
      </div>
    </div>
  );
}
