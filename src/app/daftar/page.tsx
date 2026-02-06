"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  User,
  Phone,
  GraduationCap,
  IdCard,
  Calendar,
  CheckCircle,
  HelpCircle,
  Loader2,
  ArrowRight,
  School,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

interface FormData {
  nik: string;
  nama_lengkap: string;
  tanggal_lahir: string;
  no_hp: string;
  jenis_kelamin: "L" | "P" | "";
  jenjang: "MTs" | "IL" | "";
}

const STEPS = [
  { number: 1, label: "Isi Formulir", sublabel: "Data pendaftaran" },
  { number: 2, label: "Upload Berkas", sublabel: "Dokumen persyaratan" },
  { number: 3, label: "Bayar Pendaftaran", sublabel: "Transfer biaya" },
  { number: 4, label: "Verifikasi", sublabel: "Konfirmasi panitia" },
];

const PRICING = [
  { label: "Uang Pendaftaran", amount: "Rp 200.000", note: "Tidak dapat dikembalikan" },
  { label: "Uang Pangkal", amount: "Rp 9.800.000", note: "Pembayaran dapat dicicil" },
  { label: "Iuran Taawun/Tahun", amount: "Rp 13.200.000", note: "All in (SPP + Makan + Asrama)" },
  { label: "Cicilan per Bulan", amount: "Rp 1.100.000", note: "Jika memilih sistem cicilan" },
];

const REQUIREMENTS = [
  "Fotocopy Kartu Keluarga (1 lembar)",
  "Fotocopy Akta Kelahiran (1 lembar)",
  "Fotocopy Rapor (2 semester terakhir)",
  "Pas Foto 3x4 (4 lembar)",
];

// Step Indicator Component
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-6 mb-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full blur-2xl opacity-50 -mr-10 -mt-10" />

      <div className="flex items-center justify-between relative z-10">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-surface-200 hidden sm:block rounded-full">
          <div
            className="h-full bg-gradient-to-r from-brown-600 to-gold-500 transition-all duration-500 rounded-full"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${idx + 1 < currentStep
                ? "bg-teal-500 border-teal-100 text-white shadow-lg scale-105"
                : idx + 1 === currentStep
                  ? "bg-gold-500 border-gold-100 text-white shadow-lg scale-110"
                  : "bg-white border-surface-200 text-ink-400"
                }`}
            >
              {idx + 1 < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="font-bold text-sm">{step.number}</span>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-bold mt-2 text-center transition-colors ${idx + 1 === currentStep ? "text-brown-900" : "text-ink-500"
              }`}>
              {step.label}
            </span>
            <span className="text-[10px] text-ink-400 hidden sm:block font-medium">
              {step.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Sidebar Component
function PricingSidebar() {
  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gold-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full blur-[50px] opacity-50 -mr-16 -mt-16 pointer-events-none" />

        {/* Header */}
        <div className="bg-gradient-to-r from-surface-50 to-white p-6 border-b border-gold-100 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-md border border-gold-200 flex items-center justify-center">
              <School className="w-5 h-5 text-brown-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-brown-900 leading-tight">Informasi Biaya</h3>
              <p className="text-xs font-bold text-gold-600 uppercase tracking-wide">PPDB 2026/2027</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 relative z-10">
          <div className="space-y-4">
            {PRICING.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pb-4 border-b border-dashed border-surface-300 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-ink-800">{item.label}</p>
                  <p className="text-[10px] text-ink-500">{item.note}</p>
                </div>
                <p className="font-bold text-brown-700 text-base whitespace-nowrap bg-surface-50 px-2 py-0.5 rounded border border-surface-200 w-fit">{item.amount}</p>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wide">Fasilitas All-In:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {["SPP Bulanan", "Makan 3x sehari", "Asrama & Laundry", "Seragam & Buku"].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span className="text-[11px] font-medium text-teal-700 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50 rounded-full blur-xl opacity-50 -mr-5 -mt-5" />

        <h4 className="font-black text-ink-900 mb-5 flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-brown-100 flex items-center justify-center text-brown-700">
            <IdCard className="w-5 h-5" />
          </div>
          Persyaratan Berkas
        </h4>
        <ul className="space-y-3 relative z-10">
          {REQUIREMENTS.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-ink-700 group">
              <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-100 transition-colors">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <span className="font-medium">{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DaftarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jenjangFromUrl = searchParams.get('jenjang');

  const [formData, setFormData] = useState<FormData>({
    nik: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    no_hp: "",
    jenis_kelamin: "",
    jenjang: jenjangFromUrl as "MTs" | "IL" || "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("pendaftaran_form");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(prev => ({
            ...prev,
            ...parsed,
            // Keep jenjang from URL if it exists, otherwise use saved data
            jenjang: jenjangFromUrl as "MTs" | "IL" || parsed.jenjang || ""
          }));
        } catch (error) {
          console.error("Error parsing saved data:", error);
        }
      } else if (jenjangFromUrl) {
        // If no saved data but jenjang exists in URL, update form
        setFormData(prev => ({
          ...prev,
          jenjang: jenjangFromUrl as "MTs" | "IL"
        }));
      }
    }
  }, [jenjangFromUrl]);

  // Save data on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeoutId = setTimeout(() => {
        sessionStorage.setItem("pendaftaran_form", JSON.stringify(formData));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData]);

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
        formData.no_hp.replace(/[\s\-\(\)]/g, "")
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

  const [isLoading, setIsLoading] = useState(false);

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

    try {
      // 1. Kirim OTP via WhatsApp
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otp_channel: "whatsapp", // Force WhatsApp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim OTP");
      }

      // 2. Redirect ke halaman verifikasi
      const params = new URLSearchParams({
        nik: formData.nik,
        nama_lengkap: formData.nama_lengkap,
        tanggal_lahir: formData.tanggal_lahir,
        no_hp: formData.no_hp,
        jenis_kelamin: formData.jenis_kelamin,
        jenjang: formData.jenjang,
        channel: "whatsapp",
      });

      // Pass simulation code if available (for demo)
      if (data.simulation_code) {
        params.append("sim_code", data.simulation_code);
      }

      router.push(`/verifikasi-otp?${params.toString()}`);
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat mengirim OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-100 pt-20 pb-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brown-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-200/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative pt-6 pb-6 mb-8 text-center px-4">
        <Container>
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-brown-200 px-4 py-2 rounded-full shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4">
            <GraduationCap className="w-4 h-4 text-brown-700" />
            <span className="text-xs font-bold text-brown-800 tracking-wide uppercase">
              PPDB TAHUN AJARAN 2026/2027
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-brown-900 mb-4 leading-tight">
            Formulir Pendaftaran
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brown-600 to-gold-600">
              Calon Santri Baru
            </span>
          </h1>

          <p className="text-brown-700 text-lg max-w-2xl mx-auto font-medium">
            Lengkapi data diri Anda di bawah ini. Pastikan data yang dimasukkan valid dan sesuai dokumen resmi.
          </p>
        </Container>
      </div>

      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form (2/3 width) */}
          <div className="lg:col-span-2">
            <StepIndicator currentStep={1} />

            {/* Saved Data Notice */}
            {(formData.nik || formData.nama_lengkap || formData.no_hp) && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-teal-800">
                    Data Anda Tersimpan
                  </p>
                  <p className="text-xs text-teal-700">
                    Form sudah terisi otomatis dari sesi sebelumnya.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Yakin ingin menghapus semua data?")) {
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
                  className="text-xs font-semibold text-teal-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Calon Santri Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <div className="flex items-center gap-3 mb-6 border-b border-surface-200 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-brown-50 flex items-center justify-center border border-brown-100">
                    <User className="w-5 h-5 text-brown-600" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900">
                    Data Calon Santri
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Nama Lengkap */}
                  <div data-error={!!fieldErrors.nama_lengkap}>
                    <label className="block text-sm font-semibold text-ink-800 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                      <input
                        type="text"
                        value={formData.nama_lengkap}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, nama_lengkap: e.target.value }))
                        }
                        placeholder="Nama lengkap sesuai Akta Kelahiran"
                        className="form-input-with-icon"
                      />
                    </div>
                    {fieldErrors.nama_lengkap && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.nama_lengkap}
                      </p>
                    )}
                  </div>

                  {/* NIK & Jenis Kelamin Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* NIK */}
                    <div data-error={!!fieldErrors.nik}>
                      <label className="block text-sm font-semibold text-ink-800 mb-2">
                        NIK <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
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
                          placeholder="16 digit NIK"
                          className="form-input-with-icon"
                        />
                      </div>
                      {fieldErrors.nik && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.nik}
                        </p>
                      )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div data-error={!!fieldErrors.jenis_kelamin}>
                      <label className="block text-sm font-semibold text-ink-800 mb-2">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, jenis_kelamin: "L" }))}
                          className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${formData.jenis_kelamin === "L"
                            ? "bg-brown-700 text-white border-brown-700"
                            : "bg-white text-ink-700 border-surface-200 hover:border-brown-400"
                            }`}
                        >
                          Laki-laki
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, jenis_kelamin: "P" }))}
                          className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${formData.jenis_kelamin === "P"
                            ? "bg-brown-700 text-white border-brown-700"
                            : "bg-white text-ink-700 border-surface-200 hover:border-brown-400"
                            }`}
                        >
                          Perempuan
                        </button>
                      </div>
                      {fieldErrors.jenis_kelamin && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.jenis_kelamin}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tempat & Tanggal Lahir */}
                  <div data-error={!!fieldErrors.tanggal_lahir}>
                    <label className="block text-sm font-semibold text-ink-800 mb-2">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                      <input
                        type="date"
                        value={formData.tanggal_lahir}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, tanggal_lahir: e.target.value }))
                        }
                        className="form-input-with-icon"
                      />
                    </div>
                    {fieldErrors.tanggal_lahir && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.tanggal_lahir}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Kontak Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-cream-200)] p-6 sm:p-8 animate-fadeInUp delay-200">
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--color-cream-200)] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brown-50)] flex items-center justify-center border border-[var(--color-brown-100)]">
                    <Phone className="w-5 h-5 text-[var(--color-brown-600)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text-900)]">
                    Kontak
                  </h3>
                </div>

                <div data-error={!!fieldErrors.no_hp}>
                  <label className="block text-sm font-semibold text-[var(--color-text-800)] mb-2">
                    Nomor WhatsApp/HP Orang Tua <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-400)]" />
                    <input
                      type="tel"
                      inputMode="tel"
                      value={formData.no_hp}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, no_hp: e.target.value }))
                      }
                      placeholder="08xxxxxxxxxx"
                      className="form-input-with-icon"
                    />
                  </div>
                  <p className="text-xs text-[var(--color-text-500)] mt-1">
                    Untuk verifikasi OTP dan informasi pendaftaran
                  </p>
                  {fieldErrors.no_hp && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.no_hp}
                    </p>
                  )}
                </div>
              </div>

              {/* Jenjang Pendidikan Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                <div className="flex items-center gap-3 mb-6 border-b border-surface-200 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-brown-50 flex items-center justify-center border border-brown-100">
                    <GraduationCap className="w-5 h-5 text-brown-600" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900">
                    Pilih Jenjang Pendidikan
                  </h3>
                </div>

                <div data-error={!!fieldErrors.jenjang} className="flex flex-col sm:flex-row justify-center gap-4">
                  {[
                    { value: "MTs", title: "MTs", subtitle: "Madrasah Tsanawiyah", desc: "Setara SMP" },
                    { value: "IL", title: "IL", subtitle: "I'dad Lughowi", desc: "Setara SMA" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, jenjang: option.value as FormData["jenjang"] }))
                      }
                      className={`p-4 rounded-xl border-2 text-center transition-all w-full sm:w-48 ${formData.jenjang === option.value
                        ? "bg-brown-700 text-white border-brown-700"
                        : "bg-white text-ink-700 border-surface-200 hover:border-brown-400"
                        }`}
                    >
                      <GraduationCap
                        className={`w-8 h-8 mx-auto mb-2 ${formData.jenjang === option.value
                          ? "text-white"
                          : "text-brown-600"
                          }`}
                      />
                      <p className={`font-bold text-lg mb-0.5 ${formData.jenjang === option.value ? "text-white" : ""}`}>
                        {option.title}
                      </p>
                      <p className={`text-sm font-medium mb-1 ${formData.jenjang === option.value ? "text-white/90" : "text-ink-600"}`}>
                        {option.subtitle}
                      </p>
                      <p
                        className={`text-xs ${formData.jenjang === option.value
                          ? "text-white/70"
                          : "text-ink-500"
                          }`}
                      >
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>
                {fieldErrors.jenjang && (
                  <p className="text-sm text-red-600 mt-3 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.jenjang}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-900)] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Lanjutkan ke Verifikasi</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Help Section */}
              <div className="bg-[var(--color-cream-100)] rounded-xl p-5 text-center">
                <p className="text-sm text-[var(--color-text-700)] mb-2">
                  <span className="font-semibold">Sudah punya akun?</span>{" "}
                  <a
                    href="/login"
                    className="text-[var(--color-brown-700)] font-bold hover:underline"
                  >
                    Login di sini
                  </a>
                </p>
                <p className="text-xs text-[var(--color-text-500)]">
                  Butuh bantuan? Hubungi{" "}
                  <a
                    href="https://wa.me/622667345601"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-teal-600)] font-semibold hover:underline"
                  >
                    WhatsApp Admin
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingSidebar />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
