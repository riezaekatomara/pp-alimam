"use client";

import { AlertCircle } from "lucide-react";

export default function TabPlaceholder() {
  const tabName = "Undangan Seleksi"; // Ganti sesuai nama file
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-black">{tabName}</h1>
        <p className="text-teal-100">Fitur sedang dalam pengembangan</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 border-2 border-stone-200 shadow-sm">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">
            Halaman Sedang Dibangun
          </h3>
          <p className="text-stone-600 max-w-md mx-auto">
            Halaman {tabName} sedang dalam proses development. 
            Fitur ini akan segera tersedia untuk Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
