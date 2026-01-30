"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  IdCard,
  CreditCard,
  ShieldCheck,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Sparkles,
  FileText,
} from "lucide-react";
import BackToHomeButton from "@/components/common/BackToHomeButton";

export default function LoginPage() {
  const router = useRouter();

  // Tab state
  const [activeTab, setActiveTab] = useState<"pendaftar" | "admin">(
    "pendaftar"
  );

  // Pendaftar login state
  const [nikPendaftar, setNikPendaftar] = useState("");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");

  // Admin/Penguji login state
  const [emailAdmin, setEmailAdmin] = useState("");
  const [passwordAdmin, setPasswordAdmin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login pendaftar
  const handleLoginPendaftar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi input
    if (!nikPendaftar || !nomorPendaftaran) {
      setError("NIK dan Nomor Pendaftaran wajib diisi");
      setIsLoading(false);
      return;
    }

    if (!/^\d{16}$/.test(nikPendaftar)) {
      setError("NIK harus 16 digit angka");
      setIsLoading(false);
      return;
    }

    // Format nomor pendaftaran: MTI/MTA/ILI/ILA/MAI/MAA + 6-8 digit
    if (
      !/^(MTI|MTA|ILI|ILA|MAI|MAA)\d{6,8}$/.test(nomorPendaftaran)
    ) {
      setError(
        "Format nomor pendaftaran tidak valid (contoh: MTI2600001 atau ILI20269168)"
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_type: "pendaftar",
          nik: nikPendaftar,
          nomor_pendaftaran: nomorPendaftaran,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Success - gunakan full page reload untuk pastikan cookie di-set
      setIsLoading(false);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  // Handle login admin/penguji
  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi input
    if (!emailAdmin || !passwordAdmin) {
      setError("Email dan Password wajib diisi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_type: "admin",
          email: emailAdmin,
          password: passwordAdmin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Success - gunakan full page reload untuk pastikan cookie di-set
      setIsLoading(false);
      
      // Redirect sesuai role menggunakan full page reload
      if (data.role === "admin") {
        window.location.href = "/dashboard/admin";
      } else if (data.role === "penguji") {
        window.location.href = "/dashboard/penguji";
      } else {
        throw new Error("Role tidak dikenali");
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">      <BackToHomeButton position="top-left" />      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-stone-900 mb-2">
            Login PPDB
          </h1>
          <p className="text-sm text-stone-600">Ponpes Al-Imam Al-Islami</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-teal-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b-2 border-stone-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab("pendaftar");
                setError("");
              }}
              className={`flex-1 py-4 px-6 font-bold text-sm transition-all duration-300 ${
                activeTab === "pendaftar"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                <span>Pendaftar</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("admin");
                setError("");
              }}
              className={`flex-1 py-4 px-6 font-bold text-sm transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Admin/Penguji</span>
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Tab Content: Pendaftar */}
            {activeTab === "pendaftar" && (
              <form onSubmit={handleLoginPendaftar} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    Nomor Pendaftaran
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <input
                      type="text"
                      value={nomorPendaftaran}
                      onChange={(e) =>
                        setNomorPendaftaran(e.target.value.toUpperCase())
                      }
                      placeholder="Contoh: MTI2600001"
                      className="w-full pl-12 pr-4 py-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-semibold text-stone-900 uppercase"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Format: MTI2600001, MTA2600001, ILI2600001, dsb
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    NIK Santri (16 digit)
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <IdCard className="w-5 h-5 text-teal-600" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={16}
                      value={nikPendaftar}
                      onChange={(e) =>
                        setNikPendaftar(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="3201234567890123"
                      className="w-full pl-12 pr-4 py-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-semibold text-stone-900"
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    NIK yang Anda gunakan saat mendaftar
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6" />
                      <span>Login Pendaftar</span>
                    </>
                  )}
                </button>

                <div className="mt-6 p-4 bg-teal-50 border-2 border-teal-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-teal-900 font-bold mb-1">
                        💡 Belum punya akun?
                      </p>
                      <p className="text-xs text-teal-800 mb-2">
                        Silakan daftar terlebih dahulu untuk mendapatkan Nomor
                        Pendaftaran
                      </p>
                      <a
                        href="/daftar"
                        className="text-sm font-bold text-teal-700 hover:text-teal-900 underline"
                      >
                        Daftar Sekarang →
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Tab Content: Admin/Penguji */}
            {activeTab === "admin" && (
              <form onSubmit={handleLoginAdmin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <input
                      type="email"
                      value={emailAdmin}
                      onChange={(e) => setEmailAdmin(e.target.value)}
                      placeholder="admin@alimam.sch.id"
                      className="w-full pl-12 pr-4 py-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold text-stone-900"
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-amber-600" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordAdmin}
                      onChange={(e) => setPasswordAdmin(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold text-stone-900"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6" />
                      <span>Login Admin/Penguji</span>
                    </>
                  )}
                </button>

                <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-900 font-bold mb-1">
                        🔐 Khusus Internal Staff
                      </p>
                      <p className="text-xs text-amber-800">
                        Akun admin dan penguji dibuat oleh administrator. Hubungi
                        admin jika lupa password.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-stone-600 hover:text-stone-900 font-semibold"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </main>
  );
}
