"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  LogIn,
  FileText,
  Clock,
  Lock,
  Sparkles,
  Shield,
  Info,
  Heart,
  Star,
  MessageCircle,
  Phone,
  Lightbulb,
} from "lucide-react";

interface FormData {
  nik: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    nik: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // Handle input change
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
    if (generalError) {
      setGeneralError("");
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nik) {
      errors.nik = "NIK wajib diisi";
    } else if (!/^\d{16}$/.test(formData.nik)) {
      errors.nik = "NIK harus 16 digit angka";
    }

    if (!formData.password) {
      errors.password = "Password wajib diisi";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    // Simulasi login
    setTimeout(() => {
      setGeneralError("NIK atau password salah. Silakan coba lagi.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 pt-14 sm:pt-16 md:pt-20">
      {/* Header Section - Fully Responsive */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-8 xs:py-10 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 xs:px-4 sm:px-4 py-2 sm:py-2 rounded-full text-xs xs:text-sm sm:text-sm font-bold mb-3 sm:mb-4 bg-white/10 backdrop-blur-md border border-white/20">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
            <span>Selamat Datang Kembali</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white leading-tight px-2 sm:px-0">
            <LogIn className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block mr-2 mb-1 sm:mb-2" />
            <span>Lanjutkan Perjalanan Anda</span>
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-2 sm:mb-2 font-bold text-amber-50 leading-relaxed px-4 sm:px-0">
            Kami senang Anda kembali! Mari selesaikan pendaftaran putra/putri
            tercinta
          </p>

          <p className="text-xs xs:text-sm sm:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2 text-yellow-100 flex-wrap px-4 sm:px-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>
              Sesi aman 7 hari - Data Anda terlindungi dengan enkripsi penuh
            </span>
          </p>
        </div>
      </div>

      {/* Form Container - Fully Responsive */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 xs:py-7 sm:py-8 md:py-12">
        <div className="space-y-5 xs:space-y-6 sm:space-y-6">
          {/* Info Message - Responsive */}
          {infoMessage && (
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-300 rounded-xl sm:rounded-xl p-4 xs:p-5 sm:p-5 flex items-start gap-2.5 xs:gap-3 sm:gap-3 shadow-md">
              <Info className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs xs:text-sm sm:text-base text-blue-900 font-bold leading-relaxed">
                  {infoMessage}
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-blue-700 mt-1.5 sm:mt-2 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Tenang, semua data Anda tersimpan dengan aman. Tinggal login
                    dan lanjutkan!
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Card Wrapper - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-amber-200 p-5 xs:p-6 sm:p-6 md:p-8 space-y-5 xs:space-y-6 sm:space-y-6">
            {/* General Error Alert - Responsive */}
            {generalError && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-3.5 xs:p-4 sm:p-4 flex items-start gap-2.5 xs:gap-3 sm:gap-3">
                <AlertCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs xs:text-sm sm:text-base text-red-800 font-bold leading-tight">
                    {generalError}
                  </p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-red-600 mt-1 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Pastikan NIK dan password Anda benar, atau hubungi admin
                      jika butuh bantuan.
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* NIK Field - Responsive */}
            <div data-error={!!fieldErrors.nik}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                NIK (Nomor Induk Kependudukan){" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <FileText className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Masukkan NIK 16 digit yang Anda gunakan saat pendaftaran
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
                autoComplete="username"
              />
              {fieldErrors.nik && (
                <p className="text-xs xs:text-sm sm:text-base text-red-600 mt-1.5 sm:mt-2 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{fieldErrors.nik}</span>
                </p>
              )}
            </div>

            {/* Password Field - Responsive */}
            <div data-error={!!fieldErrors.password}>
              <label className="block text-sm xs:text-base sm:text-lg font-black text-stone-900 mb-1.5 sm:mb-2 leading-tight">
                Password <span className="text-red-500">*</span>
              </label>
              <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-2.5 sm:mb-3 flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                <Lock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Password yang Anda buat saat pendaftaran</span>
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
                  autoComplete="current-password"
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

            {/* Forgot Password - Responsive */}
            <div className="text-right">
              <p className="text-xs xs:text-sm sm:text-sm text-stone-600 leading-relaxed">
                Lupa password?{" "}
                <span className="text-teal-600 font-bold">
                  Jangan khawatir! Hubungi admin kami di{" "}
                  <a
                    href="tel:+622667345601"
                    className="hover:underline underline-offset-2"
                  >
                    (0266) 734-5601
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Submit Button - Fully Responsive */}
          <div
            onClick={handleSubmit}
            className={`w-full text-base xs:text-lg sm:text-xl font-black py-4 xs:py-5 sm:py-5 px-6 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-white shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin flex-shrink-0" />
                <span>Memverifikasi akun Anda...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Masuk & Lanjutkan Pendaftaran</span>
              </div>
            )}
          </div>

          {/* Info Footer - Responsive */}
          <div className="bg-gradient-to-r from-amber-100 to-teal-50 border-2 border-teal-200 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 text-center">
            <p className="text-xs xs:text-sm sm:text-base text-stone-700 flex items-center justify-center gap-2 flex-wrap mb-2.5 sm:mb-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
              <strong>Belum punya akun?</strong>{" "}
              <a
                href="/daftar"
                className="text-teal-600 font-bold hover:underline underline-offset-2"
              >
                Daftar sekarang, gratis & mudah!
              </a>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6 text-[10px] xs:text-xs sm:text-sm text-stone-600">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                <span>Login Aman & Terenkripsi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                <span>Sesi 7 Hari (Auto-Refresh)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                <span>Dipercaya Ribuan Keluarga</span>
              </span>
            </div>
          </div>

          {/* Help Section - Fully Responsive */}
          <div className="bg-white border-2 border-amber-300 rounded-lg sm:rounded-xl p-5 xs:p-6 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
              <h3 className="text-base xs:text-lg sm:text-lg font-black text-stone-900">
                Kendala Login? Kami Siap Membantu!
              </h3>
            </div>
            <p className="text-xs xs:text-sm sm:text-sm text-stone-600 mb-3 xs:mb-4 sm:mb-4 px-2 sm:px-0">
              Tim kami siaga untuk membantu Anda login dan melanjutkan
              pendaftaran dengan lancar.
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
        </div>
      </div>
    </main>
  );
}
