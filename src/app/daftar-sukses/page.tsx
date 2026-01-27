"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  PartyPopper,
  Copy,
  Check,
  CreditCard,
  IdCard,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ArrowRight,
} from "lucide-react";

function DaftarSuksesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil data dari query params
  const nomor_pendaftaran = searchParams.get("nomor_pendaftaran") || "";
  const nama_lengkap = searchParams.get("nama_lengkap") || "";
  const jenjang = searchParams.get("jenjang") || "";
  const jenis_kelamin = searchParams.get("jenis_kelamin") || "";
  const nik = searchParams.get("nik") || "";
  const channel = searchParams.get("channel") || "whatsapp";

  const [copiedField, setCopiedField] = useState<"nomor" | "nik" | null>(null);
  const [countdown, setCountdown] = useState(10);

  // Clear sessionStorage saat sukses (data tidak diperlukan lagi)
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pendaftaran_form");
    }
  }, []);

  // Countdown untuk auto redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      router.push("/login");
    }
  }, [countdown, router]);

  // Copy to clipboard
  const handleCopy = (text: string, field: "nomor" | "nik") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-2 border-amber-200 p-8">
      {/* Success Icon */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
          <Sparkles className="w-10 h-10 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-stone-900 mb-2 flex items-center justify-center gap-2">
          <PartyPopper className="w-8 h-8 text-teal-600" />
          Alhamdulillah!
        </h1>
        <p className="text-xl font-bold text-stone-700 mb-2">
          Pendaftaran Berhasil
        </p>
        <p className="text-sm text-stone-600">
          Data Anda telah tersimpan dengan aman
        </p>
      </div>

      {/* Credentials Box */}
      <div className="bg-gradient-to-br from-teal-50 to-amber-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-bold text-stone-600 mb-4 text-center flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4" />
          DATA LOGIN ANDA
        </p>

        {/* Nomor Pendaftaran */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            Nomor Pendaftaran
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-2xl font-black text-teal-700 break-all">
              {nomor_pendaftaran}
            </p>
            <button
              onClick={() => handleCopy(nomor_pendaftaran, "nomor")}
              className="p-2 hover:bg-teal-50 rounded-lg transition-colors flex-shrink-0"
              title="Salin nomor pendaftaran"
            >
              {copiedField === "nomor" ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-stone-400" />
              )}
            </button>
          </div>
        </div>

        {/* NIK Santri */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
            <IdCard className="w-3 h-3" />
            NIK Santri (Password)
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-black text-amber-700 break-all">
              {nik}
            </p>
            <button
              onClick={() => handleCopy(nik, "nik")}
              className="p-2 hover:bg-amber-50 rounded-lg transition-colors flex-shrink-0"
              title="Salin NIK"
            >
              {copiedField === "nik" ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-stone-400" />
              )}
            </button>
          </div>
        </div>

        {/* Login Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800 flex items-center justify-center gap-1 text-center">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            Login menggunakan <strong className="mx-1">NIK</strong> dan{" "}
            <strong className="mx-1">Nomor Pendaftaran</strong>
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-amber-900 font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          PENTING - Simpan Data Ini!
        </p>
        <ul className="text-xs text-amber-800 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
            <span>
              Screenshot atau catat <strong>Nomor Pendaftaran</strong> dan{" "}
              <strong>NIK Santri</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
            <span>
              Login menggunakan <strong>NIK Santri</strong> sebagai password
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>TIDAK perlu password lain</strong> - cukup NIK + Nomor
              Pendaftaran
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
            <span>
              Notifikasi telah dikirim ke{" "}
              {channel === "whatsapp" ? "WhatsApp" : "SMS"} Anda
            </span>
          </li>
        </ul>
      </div>

      {/* Auto Redirect Info */}
      <div className="flex items-center justify-center gap-2 text-sm text-stone-600 mb-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>
          Mengarahkan ke halaman login dalam{" "}
          <strong className="text-teal-700">{countdown} detik</strong>
        </span>
      </div>

      {/* Login Button */}
      <button
        onClick={() => router.push("/login")}
        className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-black text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <span>Login Sekarang</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-stone-500 mb-2">Butuh bantuan login?</p>
        <a
          href="https://wa.me/622667345601"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-teal-600 font-bold hover:underline"
        >
          Hubungi Admin WhatsApp
        </a>
      </div>
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-2 border-amber-200 p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-stone-600">Memuat halaman...</p>
      </div>
    </div>
  );
}

export default function DaftarSuksesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <DaftarSuksesContent />
      </Suspense>
    </main>
  );
}
