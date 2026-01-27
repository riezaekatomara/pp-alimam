"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  User,
  Phone,
  GraduationCap,
  Shield,
  Heart,
  Star,
  Sparkles,
  Clock,
  Calendar,
  IdCard,
  Users,
  MessageSquare,
  Smartphone,
  HelpCircle,
  Loader2,
} from "lucide-react";

interface FormData {
  nik: string;
  nama_lengkap: string;
  tanggal_lahir: string;
  no_hp: string;
  jenis_kelamin: "L" | "P" | "";
  jenjang: "MTs" | "IL" | "MA" | "";
}

export default function DaftarPage() {
  const router = useRouter();

  // Form state - load dari sessionStorage jika ada
  const [formData, setFormData] = useState<FormData>(() => {
    // Cek apakah ada data tersimpan di sessionStorage
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("pendaftaran_form");
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error("Error parsing saved form data:", e);
        }
      }
    }

    // Default values jika tidak ada data tersimpan
    return {
      nik: "",
      nama_lengkap: "",
      tanggal_lahir: "",
      no_hp: "",
      jenis_kelamin: "",
      jenjang: "",
    };
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Save ke sessionStorage setiap kali formData berubah
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pendaftaran_form", JSON.stringify(formData));
    }
  }, [formData]);

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nik) {
      errors.nik = "NIK santri wajib diisi";
    } else if (!/^\d{16}$/.test(formData.nik)) {
      errors.nik = "NIK harus 16 digit angka";
    }

    if (!formData.nama_lengkap) {
      errors.nama_lengkap = "Nama lengkap santri wajib diisi";
    } else if (formData.nama_lengkap.length < 3) {
      errors.nama_lengkap = "Nama minimal 3 karakter";
    }

    if (!formData.tanggal_lahir) {
      errors.tanggal_lahir = "Tanggal lahir santri wajib diisi";
    }

    if (!formData.no_hp) {
      errors.no_hp = "Nomor WhatsApp/HP orang tua wajib diisi";
    } else if (
      !/^(08|628|\+628)\d{8,12}$/.test(
        formData.no_hp.replace(/[\s\-\(\)]/g, ""),
      )
    ) {
      errors.no_hp = "Format nomor tidak valid (contoh: 081234567890)";
    }

    if (!formData.jenis_kelamin) {
      errors.jenis_kelamin = "Pilih jenis kelamin santri";
    }

    if (!formData.jenjang) {
      errors.jenjang = "Pilih jenjang pendidikan";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit - REDIRECT KE HALAMAN PILIH VERIFIKASI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Redirect ke halaman pilih verifikasi dengan membawa data form
    const params = new URLSearchParams({
      nik: formData.nik,
      nama_lengkap: formData.nama_lengkap,
      tanggal_lahir: formData.tanggal_lahir,
      no_hp: formData.no_hp,
      jenis_kelamin: formData.jenis_kelamin,
      jenjang: formData.jenjang,
    });

    router.push(`/pilih-verifikasi?${params.toString()}`);
  };

  // Render form (tidak ada modal lagi)
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 pt-20">
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 bg-white/10 backdrop-blur-md border border-white/20">
            <Star className="w-4 h-4 text-yellow-300" />
            <span>Langkah Pertama Menuju Masa Depan Gemilang</span>
          </div>

          <h1 className="text-5xl font-black mb-4 text-white">
            <Heart className="w-12 h-12 inline-block mr-2 mb-2 text-red-400" />
            <span>Wujudkan Impian Pendidikan Terbaik</span>
          </h1>

          <p className="text-xl mb-2 font-bold text-amber-50">
            Bergabunglah dengan ribuan keluarga yang mempercayakan pendidikan
            putra-putri mereka kepada kami
          </p>

          <p className="text-base font-semibold flex items-center justify-center gap-2 text-yellow-100">
            <Clock className="w-5 h-5" />
            <span>Mudah & Cepat - Hanya 2 menit untuk memulai</span>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Info data tersimpan - hanya muncul jika ada data di sessionStorage */}
        {(formData.nik || formData.nama_lengkap || formData.no_hp) && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900 mb-1">
                💾 Data Anda Tersimpan!
              </p>
              <p className="text-xs text-blue-800">
                Form Anda sudah terisi otomatis. Anda bisa melanjutkan atau
                mengisi ulang.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Yakin ingin menghapus semua data dan mulai dari awal?",
                  )
                ) {
                  sessionStorage.removeItem("pendaftaran_form");
                  setFormData({
                    nik: "",
                    nama_lengkap: "",
                    tanggal_lahir: "",
                    no_hp: "",
                    jenis_kelamin: "",
                    jenjang: "",
                  });
                  setFieldErrors({});
                }
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 underline whitespace-nowrap"
            >
              Hapus & Mulai Ulang
            </button>
          </div>
        )}

        <div className="bg-gradient-to-r from-teal-50 to-amber-50 border-2 border-teal-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 mb-2">
                Anda Sedang Mengambil Keputusan Terbaik!
              </h3>
              <p className="text-sm text-stone-700">
                Isi formulir sederhana ini, lalu pilih metode verifikasi favorit
                Anda. Anda akan langsung mendapat Nomor Pendaftaran untuk login
                (tanpa password).
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 space-y-6">
            {/* NIK SANTRI */}
            <div data-error={!!fieldErrors.nik}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                NIK Calon Santri <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <IdCard className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>NIK SANTRI</strong> sesuai KTP/Kartu Keluarga (16
                  digit). Akan digunakan untuk login bersama Nomor Pendaftaran.
                </span>
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={16}
                value={formData.nik}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nik: e.target.value.replace(/\D/g, ""),
                  }))
                }
                placeholder="3201234567890123"
                className={`w-full text-lg px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.nik
                    ? "border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {fieldErrors.nik && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.nik}
                </p>
              )}
            </div>

            {/* Nama Lengkap SANTRI */}
            <div data-error={!!fieldErrors.nama_lengkap}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                Nama Lengkap Calon Santri{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <User className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Sesuai KTP/Akta <strong>SANTRI</strong> (tanpa gelar)
                </span>
              </p>
              <input
                type="text"
                value={formData.nama_lengkap}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nama_lengkap: e.target.value,
                  }))
                }
                placeholder="Ahmad Zaki Mubarak"
                className={`w-full text-lg px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.nama_lengkap
                    ? "border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {fieldErrors.nama_lengkap && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.nama_lengkap}
                </p>
              )}
            </div>

            {/* Tanggal Lahir SANTRI */}
            <div data-error={!!fieldErrors.tanggal_lahir}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                Tanggal Lahir Santri <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Sesuai Akta Kelahiran <strong>SANTRI</strong>
                </span>
              </p>
              <input
                type="date"
                value={formData.tanggal_lahir}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tanggal_lahir: e.target.value,
                  }))
                }
                className={`w-full text-lg px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.tanggal_lahir
                    ? "border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {fieldErrors.tanggal_lahir && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.tanggal_lahir}
                </p>
              )}
            </div>

            {/* No HP/WhatsApp ORANG TUA */}
            <div data-error={!!fieldErrors.no_hp}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                Nomor WhatsApp/HP Orang Tua{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Untuk verifikasi dan komunikasi penting</span>
              </p>
              <input
                type="tel"
                inputMode="tel"
                value={formData.no_hp}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, no_hp: e.target.value }))
                }
                placeholder="081234567890"
                className={`w-full text-lg px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.no_hp
                    ? "border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {fieldErrors.no_hp && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.no_hp}
                </p>
              )}
            </div>

            {/* Jenis Kelamin SANTRI */}
            <div data-error={!!fieldErrors.jenis_kelamin}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                Jenis Kelamin Santri <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <Users className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Menentukan kode nomor pendaftaran (Ikhwan/Akhwat)</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jenis_kelamin: "L" }))
                  }
                  className={`py-5 px-6 text-lg font-black rounded-xl border-2 transition-all ${
                    formData.jenis_kelamin === "L"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-teal-500"
                  }`}
                >
                  <User className="w-12 h-12 mb-2 mx-auto" />
                  Ikhwan (Laki-laki)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jenis_kelamin: "P" }))
                  }
                  className={`py-5 px-6 text-lg font-black rounded-xl border-2 transition-all ${
                    formData.jenis_kelamin === "P"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500 scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-pink-500"
                  }`}
                >
                  <User className="w-12 h-12 mb-2 mx-auto" />
                  Akhwat (Perempuan)
                </button>
              </div>
              {fieldErrors.jenis_kelamin && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.jenis_kelamin}
                </p>
              )}
            </div>

            {/* Jenjang */}
            <div data-error={!!fieldErrors.jenjang}>
              <label className="block text-lg font-black text-stone-900 mb-2">
                Pilih Jenjang Impian <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-600 mb-3 flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Setiap jenjang dirancang untuk membentuk generasi Qur'ani yang
                  unggul
                </span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jenjang: "MTs" }))
                  }
                  className={`py-5 px-6 text-lg font-black rounded-xl border-2 transition-all ${
                    formData.jenjang === "MTs"
                      ? "bg-gradient-to-r from-stone-700 to-stone-800 text-white border-stone-700 scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-stone-700"
                  }`}
                >
                  <GraduationCap className="w-12 h-12 mb-2 mx-auto" />
                  <div>MTs</div>
                  <div className="text-xs font-normal mt-1 opacity-90">
                    Fondasi Kokoh
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jenjang: "IL" }))
                  }
                  className={`py-5 px-6 text-base font-black rounded-xl border-2 transition-all ${
                    formData.jenjang === "IL"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-teal-500"
                  }`}
                >
                  <GraduationCap className="w-12 h-12 mb-2 mx-auto" />
                  <div className="text-sm">I'dad Lughowi</div>
                  <div className="text-xs font-normal mt-1 opacity-90">
                    Mahir 2 Bahasa
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jenjang: "MA" }))
                  }
                  className={`py-5 px-6 text-lg font-black rounded-xl border-2 transition-all ${
                    formData.jenjang === "MA"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-amber-500"
                  }`}
                >
                  <GraduationCap className="w-12 h-12 mb-2 mx-auto" />
                  <div>MA</div>
                  <div className="text-xs font-normal mt-1 opacity-90">
                    Siap Universitas
                  </div>
                </button>
              </div>
              {fieldErrors.jenjang && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.jenjang}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-xl font-black py-5 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-white" />
              <span>Lanjutkan ke Verifikasi</span>
            </div>
          </button>

          <div className="bg-gradient-to-r from-amber-100 to-teal-50 border-2 border-teal-200 rounded-xl p-6 text-center">
            <p className="text-sm text-stone-700 flex items-center justify-center gap-2 flex-wrap mb-3">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <strong>Sudah punya akun?</strong>
              <a
                href="/login"
                className="text-teal-600 font-bold hover:underline underline-offset-2"
              >
                Login di sini untuk melanjutkan
              </a>
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-stone-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Data Terenkripsi & Aman</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Dipercaya Ribuan Keluarga</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Proses Cepat 3 Langkah</span>
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-teal-200">
              <p className="text-xs text-stone-600 mb-2 font-bold">
                📝 Langkah Selanjutnya:
              </p>
              <ol className="text-xs text-stone-600 space-y-1 text-left max-w-sm mx-auto">
                <li>1. Pilih metode verifikasi (WhatsApp/SMS)</li>
                <li>2. Masukkan kode OTP 6 digit</li>
                <li>3. Dapatkan Nomor Pendaftaran & login</li>
              </ol>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-300 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-black text-stone-900">
                Butuh Bantuan Mengisi Formulir?
              </h3>
            </div>
            <p className="text-sm text-stone-600 mb-4">
              Tim kami siap membantu Anda dengan sepenuh hati. Jangan ragu untuk
              menghubungi kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/622667345601"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition-all duration-300 active:scale-95"
              >
                <Smartphone className="w-4 h-4" />
                <span>Chat WhatsApp Admin</span>
              </a>

              <a
                href="tel:+622667345601"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-sm transition-all duration-300 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon (0266) 734-5601</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
