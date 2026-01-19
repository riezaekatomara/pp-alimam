"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  Clock,
  User,
  Phone,
  Users,
  GraduationCap,
  Lock,
  RotateCw,
  Sparkles,
  Shield,
  Heart,
  Star,
  MessageCircle,
  PartyPopper,
} from "lucide-react";

interface FormData {
  nik: string;
  nama_lengkap: string;
  no_hp: string;
  jenis_kelamin: string;
  jenjang: string;
  password: string;
  password_confirm: string;
}

export default function DaftarPage() {
  const [formData, setFormData] = useState<FormData>({
    nik: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    jenjang: "",
    no_hp: "",
    password: "",
    password_confirm: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nik) {
      errors.nik = "NIK wajib diisi";
    } else if (!/^\d{16}$/.test(formData.nik)) {
      errors.nik = "NIK harus 16 digit angka";
    }

    if (!formData.nama_lengkap) {
      errors.nama_lengkap = "Nama lengkap wajib diisi";
    } else if (formData.nama_lengkap.length < 3) {
      errors.nama_lengkap = "Nama minimal 3 karakter";
    }

    if (!formData.no_hp) {
      errors.no_hp = "Nomor HP wajib diisi";
    } else if (
      !/^(08|628|\+628)\d{8,12}$/.test(
        formData.no_hp.replace(/[\s\-\(\)]/g, ""),
      )
    ) {
      errors.no_hp = "Format nomor HP tidak valid (contoh: 081234567890)";
    }

    if (!formData.jenis_kelamin) {
      errors.jenis_kelamin = "Pilih jenis kelamin";
    }

    if (!formData.jenjang) {
      errors.jenjang = "Pilih jenjang pendidikan";
    }

    if (!formData.password) {
      errors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      errors.password = "Password minimal 8 karakter";
    }

    if (!formData.password_confirm) {
      errors.password_confirm = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.password_confirm) {
      errors.password_confirm = "Password tidak cocok";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsLoading(true);
    setFieldErrors({});

    // Simulasi API call
    setTimeout(() => {
      setSuccessMessage(
        `Pendaftaran berhasil!\n\nNomor Pendaftaran Anda: PPDB2026001\n\nAlhamdulillah! Langkah pertama menuju masa depan gemilang putra/putri Anda telah dimulai.`,
      );
      setIsLoading(false);
    }, 2000);
  };

  // Success Screen - Fully Responsive
  if (successMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center px-4 py-16 sm:py-20 md:py-32">
        <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-amber-200 p-6 xs:p-7 sm:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="relative inline-block">
              <CheckCircle2 className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 text-green-500 mx-auto animate-bounce" />
              <Sparkles className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-2xl font-black text-stone-900 mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap leading-tight">
            <PartyPopper className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600 flex-shrink-0" />
            <span>Alhamdulillah, Pendaftaran Berhasil!</span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-stone-700 whitespace-pre-line mb-5 sm:mb-6 leading-relaxed px-2 sm:px-0">
            {successMessage}
          </p>
          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg sm:rounded-xl p-3 xs:p-3.5 sm:p-4 mb-4 sm:mb-4">
            <p className="text-xs xs:text-sm sm:text-sm text-teal-800 flex items-center justify-center gap-2 flex-wrap">
              <Heart className="w-4 h-4 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
              <span className="font-bold">
                Kami menanti kehadiran putra/putri Anda di keluarga besar
                Al-Imam
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm xs:text-base sm:text-base text-stone-600">
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
            <span>Mengarahkan ke halaman login...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 pt-14 sm:pt-16 md:pt-20">
      {/* Header Section - Fully Responsive */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-8 xs:py-10 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge - Responsive */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 xs:px-4 sm:px-4 py-2 sm:py-2 rounded-full text-xs xs:text-sm sm:text-sm font-bold mb-3 sm:mb-4 bg-white/10 backdrop-blur-md border border-white/20">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
            <span>Langkah Pertama Menuju Masa Depan Gemilang</span>
          </div>

          {/* Title - Responsive */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white leading-tight px-2 sm:px-0">
            <Heart className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block mr-2 mb-1 sm:mb-2 text-red-400" />
            <span>Wujudkan Impian Pendidikan Terbaik</span>
          </h1>

          {/* Description - Responsive */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-2 sm:mb-2 font-bold text-amber-50 leading-relaxed px-4 sm:px-0">
            Bergabunglah dengan ribuan keluarga yang mempercayakan pendidikan
            akhlaq dan ilmu putra-putri mereka kepada kami
          </p>

          <p className="text-xs xs:text-sm sm:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2 text-yellow-100 flex-wrap px-4 sm:px-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>
              Mudah & Cepat - Hanya 3-5 menit, masa depan anak dimulai dari sini
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 xs:py-7 sm:py-8 md:py-12">
        {/* Motivational Banner - Responsive */}
        <div className="bg-gradient-to-r from-teal-50 to-amber-50 border-2 border-teal-200 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 mb-5 sm:mb-6">
          <div className="flex items-start gap-3 xs:gap-3.5 sm:gap-4">
            <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base xs:text-lg sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Anda Sedang Mengambil Keputusan Terbaik!
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm text-stone-700 leading-relaxed">
                Setiap langkah yang Anda ambil hari ini adalah investasi
                berharga untuk masa depan anak tercinta. Isi formulir dengan
                tenang, kami siap membantu Anda di setiap tahap.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 xs:space-y-6 sm:space-y-6"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-amber-200 p-5 xs:p-6 sm:p-6 md:p-8 space-y-5 xs:space-y-6 sm:space-y-6">
            {/* NIK Field - Responsive */}
            <div data-error={!!fieldErrors.nik}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                NIK (Nomor Induk Kependudukan){" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <Shield className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Data Anda aman dan terenkripsi. Cukup sesuai KTP/Kartu
                  Keluarga (16 digit)
                </span>
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={16}
                value={formData.nik}
                onChange={(e) =>
                  handleChange("nik", e.target.value.replace(/\D/g, ""))
                }
                placeholder="Contoh: 3201234567890123"
                className={`w-full text-sm xs:text-base sm:text-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.nik
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
                disabled={isLoading}
              />
              {fieldErrors.nik && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.nik}</span>
                </p>
              )}
            </div>

            {/* Nama Lengkap - Responsive */}
            <div data-error={!!fieldErrors.nama_lengkap}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Nama Lengkap Calon Santri{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Tulis nama indah putra/putri Anda sesuai KTP/Akta (tanpa
                  gelar)
                </span>
              </p>
              <input
                type="text"
                value={formData.nama_lengkap}
                onChange={(e) => handleChange("nama_lengkap", e.target.value)}
                placeholder="Contoh: Ahmad Zaki Mubarak"
                className={`w-full text-sm xs:text-base sm:text-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.nama_lengkap
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
                disabled={isLoading}
              />
              {fieldErrors.nama_lengkap && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.nama_lengkap}</span>
                </p>
              )}
            </div>

            {/* Nomor HP - Responsive */}
            <div data-error={!!fieldErrors.no_hp}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Nomor WhatsApp Aktif Orang Tua{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Kami akan kirimkan update penting & kabar gembira melalui
                  nomor ini
                </span>
              </p>
              <input
                type="tel"
                inputMode="tel"
                value={formData.no_hp}
                onChange={(e) => handleChange("no_hp", e.target.value)}
                placeholder="Contoh: 081234567890"
                className={`w-full text-sm xs:text-base sm:text-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  fieldErrors.no_hp
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
                disabled={isLoading}
              />
              {fieldErrors.no_hp && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.no_hp}</span>
                </p>
              )}
            </div>

            {/* Jenis Kelamin - Responsive Grid */}
            <div data-error={!!fieldErrors.jenis_kelamin}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Kami menyediakan program khusus untuk putra dan putri Anda
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3 xs:gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleChange("jenis_kelamin", "L")}
                  className={`relative py-4 xs:py-5 sm:py-5 px-3 xs:px-4 sm:px-6 text-sm xs:text-base sm:text-lg font-black rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${
                    formData.jenis_kelamin === "L"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-teal-500"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <User className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 mx-auto" />
                    <div>Laki-laki</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("jenis_kelamin", "P")}
                  className={`relative py-4 xs:py-5 sm:py-5 px-3 xs:px-4 sm:px-6 text-sm xs:text-base sm:text-lg font-black rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${
                    formData.jenis_kelamin === "P"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-pink-500"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <User className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 mx-auto" />
                    <div>Perempuan</div>
                  </div>
                </button>
              </div>
              {fieldErrors.jenis_kelamin && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.jenis_kelamin}</span>
                </p>
              )}
            </div>

            {/* Jenjang - Responsive Grid */}
            <div data-error={!!fieldErrors.jenjang}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Pilih Jenjang Impian <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <GraduationCap className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Setiap jenjang dirancang khusus untuk membentuk generasi
                  Qur'ani yang unggul
                </span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleChange("jenjang", "MTs")}
                  className={`relative py-4 xs:py-5 sm:py-5 px-3 xs:px-4 sm:px-6 text-sm xs:text-base sm:text-lg font-black rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${
                    formData.jenjang === "MTs"
                      ? "bg-gradient-to-r from-stone-700 to-stone-800 text-white border-stone-700 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-stone-700"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <GraduationCap className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 mx-auto" />
                    <div>MTs</div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-normal mt-0.5 sm:mt-1 opacity-90">
                      Fondasi Kokoh
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("jenjang", "IL")}
                  className={`relative py-4 xs:py-5 sm:py-5 px-3 xs:px-4 sm:px-6 text-sm xs:text-base sm:text-lg font-black rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${
                    formData.jenjang === "IL"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-teal-500"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <GraduationCap className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 mx-auto" />
                    <div className="text-xs xs:text-sm sm:text-base">
                      I'dad Lughowi
                    </div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-normal mt-0.5 sm:mt-1 opacity-90">
                      Mahir 2 Bahasa
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("jenjang", "MA")}
                  className={`relative py-4 xs:py-5 sm:py-5 px-3 xs:px-4 sm:px-6 text-sm xs:text-base sm:text-lg font-black rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${
                    formData.jenjang === "MA"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-amber-300 hover:border-amber-500"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <GraduationCap className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 mx-auto" />
                    <div>MA</div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-normal mt-0.5 sm:mt-1 opacity-90">
                      Siap Universitas
                    </div>
                  </div>
                </button>
              </div>
              {fieldErrors.jenjang && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.jenjang}</span>
                </p>
              )}
            </div>

            {/* Password - Responsive */}
            <div data-error={!!fieldErrors.password}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Buat Password Anda <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <Lock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Minimal 8 karakter. Pilih yang mudah diingat tapi aman
                </span>
              </p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Masukkan password"
                  className={`w-full text-sm xs:text-base sm:text-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 pr-12 xs:pr-13 sm:pr-14 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 transition-all ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 xs:right-4 sm:right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 active:scale-95"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.password}</span>
                </p>
              )}
            </div>

            {/* Password Confirm - Responsive */}
            <div data-error={!!fieldErrors.password_confirm}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <RotateCw className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Ketik ulang password yang sama untuk memastikan keamanan
                </span>
              </p>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={formData.password_confirm}
                  onChange={(e) =>
                    handleChange("password_confirm", e.target.value)
                  }
                  placeholder="Ketik ulang password"
                  className={`w-full text-sm xs:text-base sm:text-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 pr-12 xs:pr-13 sm:pr-14 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 transition-all ${
                    fieldErrors.password_confirm
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-amber-300 focus:border-amber-600 focus:ring-amber-100"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 xs:right-4 sm:right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 active:scale-95"
                  tabIndex={-1}
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              {fieldErrors.password_confirm && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.password_confirm}</span>
                </p>
              )}
            </div>
          </div>

          {/* Submit Button - Fully Responsive */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-base xs:text-lg sm:text-xl font-black py-4 xs:py-5 sm:py-5 px-6 rounded-lg sm:rounded-xl transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin flex-shrink-0" />
                <span>Memproses dengan penuh harapan...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                <span>Ya! Daftarkan Anak Saya Sekarang</span>
              </div>
            )}
          </button>

          {/* Info Footer - Responsive */}
          <div className="bg-gradient-to-r from-amber-100 to-teal-50 border-2 border-teal-200 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 text-center">
            <p className="text-xs xs:text-sm sm:text-base text-stone-700 flex items-center justify-center gap-2 flex-wrap mb-2.5 sm:mb-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
              <strong>Sudah punya akun?</strong>{" "}
              <a
                href="/login"
                className="text-teal-600 font-bold hover:underline underline-offset-2"
              >
                Login di sini untuk melanjutkan
              </a>
            </p>
            <div className="flex items-center justify-center gap-4 xs:gap-5 sm:gap-6 text-[10px] xs:text-xs sm:text-sm text-stone-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                <span>Data Terenkripsi & Aman</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                <span>Dipercaya Ribuan Keluarga</span>
              </span>
            </div>
          </div>

          {/* Trust Builder Section - Responsive */}
          <div className="bg-white border-2 border-amber-300 rounded-lg sm:rounded-xl p-5 xs:p-6 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
              <h3 className="text-base xs:text-lg sm:text-lg font-black text-stone-900">
                Butuh Bantuan Mengisi Formulir?
              </h3>
            </div>
            <p className="text-xs xs:text-sm sm:text-sm text-stone-600 mb-3 xs:mb-4 sm:mb-4 px-2 sm:px-0">
              Tim kami siap membantu Anda dengan sepenuh hati. Jangan ragu untuk
              menghubungi kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-3 justify-center">
              <a
                href="https://wa.me/622667345601"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-5 py-3 xs:py-3.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs xs:text-sm sm:text-sm transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Chat WhatsApp Admin</span>
              </a>
              <a
                href="tel:+622667345601"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-5 py-3 xs:py-3.5 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-xs xs:text-sm sm:text-sm transition-all duration-300 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Telepon (0266) 734-5601</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
