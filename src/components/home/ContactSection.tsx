"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileSignature,
  FileText,
  School,
  HelpCircle,
  Send,
  CheckCircle,
  XCircle,
  MessageCircle,
  Shield,
  Users,
  Sparkles,
  Calendar,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} wajib diisi`;
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Format email tidak valid";
    }
    if (name === "telepon" && !/^[0-9+\-\s]{10,15}$/.test(value)) {
      return "Format nomor telepon tidak valid";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <Section
      id="kontak"
      className="bg-gradient-to-br from-[var(--color-gold-50)] via-[var(--color-cream-50)] to-[var(--color-teal-50)] py-12 sm:py-16 md:py-20 relative overflow-hidden animate-fadeInUp"
    >
      {/* ✅ Blobs - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 right-16 w-64 h-64 rounded-full blur-3xl bg-[var(--color-gold-100)]/30 animate-float" />
      <div className="hidden md:block absolute bottom-20 left-16 w-56 h-56 rounded-full blur-3xl bg-[var(--color-teal-100)]/30 animate-float delay-700" />

      <Container size="lg" className="relative z-10">
        {/* ✅ Badge - Fully Responsive */}
        <div className="text-center mb-4 sm:mb-6 animate-fadeInDown px-4 sm:px-0">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-500)] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg border border-[var(--color-gold-500)]/30">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">
              KONSULTASI GRATIS - RESPONS CEPAT
            </span>
          </span>
        </div>

        {/* ✅ Headline - Fully Responsive */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fadeInUp delay-200 px-4 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            <span className="text-[var(--color-brown-800)]">Punya </span>
            <span className="text-gradient-gold">Pertanyaan</span>
            <span className="text-[var(--color-brown-800)]"> atau </span>
            <span className="text-gradient-teal">Keraguan?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed mb-4">
            Kami tahu memilih pesantren untuk anak adalah keputusan besar.{" "}
            <span className="font-bold text-[var(--color-gold-700)]">
              Tim kami siap menjawab semua pertanyaan Anda
            </span>{" "}
            tanpa ada tekanan untuk langsung mendaftar.
          </p>

          {/* ✅ Trust Signals - Stack on mobile */}
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 border border-[var(--color-gold-200)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-gold-600)] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-800)]">
                Respons{" "}
                <span className="text-[var(--color-gold-700)]">&lt; 2 Jam</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 border border-[var(--color-teal-200)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-800)]">
                100% Gratis &{" "}
                <span className="text-[var(--color-teal-700)]">
                  Confidential
                </span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 border border-[var(--color-brown-200)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-brown-600)] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-800)]">
                <span className="text-[var(--color-brown-700)]">500+</span>{" "}
                Orang Tua Puas
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Contact Cards - 1 col mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 animate-fadeInUp delay-300 px-4 sm:px-0">
          {/* Address */}
          <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 active:scale-98 border border-[var(--color-cream-200)] text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-brown-600)] to-[var(--color-gold-500)] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-900)] mb-2 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
              Kunjungi Langsung
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-gold-700)] font-semibold mb-3 sm:mb-4">
              Lihat sendiri fasilitas & lingkungan pesantren
            </p>
            <div className="space-y-1 text-xs sm:text-sm text-[var(--color-text-600)] mb-4 sm:mb-5 leading-relaxed">
              <p className="font-semibold">Jl. Pelabuhan Ratu II KM 18</p>
              <p>Kp. Pupunjul, Desa Cikembar</p>
              <p>Kec. Cikembar, Kab. Sukabumi</p>
              <p className="font-bold text-[var(--color-brown-700)]">
                Jawa Barat 43157
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Pondok+Pesantren+Al-Imam+Al-Islami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-gold-600)] hover:text-[var(--color-gold-700)] font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--color-gold-50)] hover:bg-[var(--color-gold-100)] transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Buka di Google Maps</span>
            </a>
          </div>

          {/* Phone */}
          <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 active:scale-98 border border-[var(--color-cream-200)] text-center relative overflow-hidden">
            {/* Online Indicator */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
              </span>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-teal-500)] to-[var(--color-brown-700)] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-900)] mb-2 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
              Chat Langsung, Dapat Jawaban Cepat
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-teal-700)] font-semibold mb-3 sm:mb-4">
              Tim kami online & siap membantu Anda
            </p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <a
                href="tel:+6285722253236"
                className="block text-base sm:text-lg font-black text-gradient-brown hover:text-[var(--color-brown-800)] transition-colors duration-300"
              >
                +62 857-2225-3236
              </a>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-500)] flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Online Sekarang - Respons &lt; 2 Jam</span>
              </p>
            </div>
            <a
              href="https://wa.me/6285722253236?text=Assalamualaikum,%20saya%20ingin%20konsultasi%20tentang%20pendaftaran%20santri%20baru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-[var(--color-teal-500)] to-[var(--color-teal-600)] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Mulai Chat WhatsApp</span>
            </a>
          </div>

          {/* Email */}
          <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 active:scale-98 border border-[var(--color-cream-200)] text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-teal-500)] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-900)] mb-2 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
              Email & Media Sosial
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-gold-700)] font-semibold mb-3 sm:mb-4">
              Ikuti update kegiatan & info terbaru
            </p>
            <a
              href="mailto:alimamalislami@gmail.com"
              className="block text-sm sm:text-base font-bold text-gradient-teal hover:text-[var(--color-teal-700)] mb-4 sm:mb-5 transition-colors duration-300 break-all px-2"
            >
              alimamalislami@gmail.com
            </a>
            <div className="flex justify-center gap-2 sm:gap-3">
              {[
                {
                  href: "#",
                  icon: "fab fa-facebook",
                  label: "Facebook",
                  color:
                    "text-[var(--color-blue-600)] hover:text-[var(--color-blue-700)]",
                },
                {
                  href: "#",
                  icon: "fab fa-instagram",
                  label: "Instagram",
                  color:
                    "text-gradient-gold hover:text-[var(--color-gold-600)]",
                },
                {
                  href: "#",
                  icon: "fab fa-youtube",
                  label: "YouTube",
                  color:
                    "text-[var(--color-red-600)] hover:text-[var(--color-red-700)]",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 border border-[var(--color-cream-200)] ${item.color}`}
                >
                  <i className={`${item.icon} text-base sm:text-lg`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Form & Map - Stack on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fadeInUp delay-400 px-4 sm:px-0">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl border-2 border-[var(--color-cream-200)]">
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black mb-2 flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-3">
                <Send className="w-6 h-6 sm:w-7 sm:h-7 p-1 sm:p-1.5 bg-[var(--color-gold-100)] rounded-xl shadow-md text-[var(--color-brown-700)]" />
                <span className="text-[var(--color-brown-800)]">
                  Konsultasi{" "}
                </span>
                <span className="text-gradient-gold">100% Gratis</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-600)] leading-relaxed">
                Tanya apapun tentang pendidikan, fasilitas, atau biaya.{" "}
                <span className="font-bold text-[var(--color-gold-700)]">
                  Tidak ada kewajiban untuk mendaftar!
                </span>
              </p>
            </div>

            {/* ✅ Success Message - Fully Responsive */}
            {showSuccess && (
              <div className="bg-gradient-to-r from-[var(--color-gold-50)] to-[var(--color-teal-50)] border-2 border-[var(--color-gold-400)] p-4 sm:p-5 lg:p-6 mb-5 sm:mb-6 rounded-xl sm:rounded-2xl shadow-lg animate-fadeInUp">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-gold-600)] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-[var(--color-gold-700)] mb-1 sm:mb-2 leading-tight">
                      Pesan Anda Sudah Kami Terima!
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--color-text-700)] leading-relaxed mb-2">
                      Terima kasih atas kepercayaan Anda. Tim kami akan{" "}
                      <span className="font-bold text-[var(--color-brown-700)]">
                        menghubungi dalam 1-2 jam
                      </span>{" "}
                      (hari kerja).
                    </p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-text-600)] flex items-start gap-1.5 sm:gap-2">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-gold-600)] flex-shrink-0 mt-0.5" />
                      <span>
                        Atau hubungi kami langsung via WhatsApp untuk respons
                        lebih cepat
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Error Message - Fully Responsive */}
            {showError && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 p-3 sm:p-4 mb-5 sm:mb-6 rounded-xl sm:rounded-2xl shadow-md animate-fadeInUp">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-red-800">
                    Harap periksa kembali data yang Anda masukkan
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[var(--color-text-800)] mb-1.5 sm:mb-2">
                    Nama Lengkap Bapak/Ibu *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="contoh: Bapak Ahmad"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-cream-200)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-[var(--color-gold-400)] transition-all duration-300"
                  />
                  {errors.nama && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-semibold">
                      {errors.nama}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[var(--color-text-800)] mb-1.5 sm:mb-2">
                    Email (untuk konfirmasi) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="email@contoh.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-cream-200)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-[var(--color-gold-400)] transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-semibold">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[var(--color-text-800)] mb-1.5 sm:mb-2">
                  Nomor WhatsApp (untuk respons cepat) *
                </label>
                <input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="08xx xxxx xxxx"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-cream-200)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-[var(--color-gold-400)] transition-all duration-300"
                />
                {errors.telepon && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-semibold">
                    {errors.telepon}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[var(--color-text-800)] mb-1.5 sm:mb-2">
                  Yang ingin Anda konsultasikan *
                </label>
                <select
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-cream-200)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-[var(--color-gold-400)] transition-all duration-300 bg-white appearance-none"
                >
                  <option value="">Pilih topik konsultasi...</option>
                  <option value="pendaftaran">Biaya & Cara Pendaftaran</option>
                  <option value="informasi">Program & Kurikulum</option>
                  <option value="kunjungan">Jadwal Kunjungi Pesantren</option>
                  <option value="fasilitas">Fasilitas & Asrama</option>
                  <option value="konsultasi">Konsultasi Pendidikan Anak</option>
                  <option value="lainnya">Pertanyaan Lainnya</option>
                </select>
                {errors.subjek && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-semibold">
                    {errors.subjek}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[var(--color-text-800)] mb-1.5 sm:mb-2">
                  Ceritakan kekhawatiran atau pertanyaan Anda *
                </label>
                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder="Contoh: Saya khawatir anak saya sulit beradaptasi di pesantren. Bagaimana sistem pendampingan untuk santri baru?"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-cream-200)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-[var(--color-gold-400)] transition-all duration-300 resize-vertical"
                />
                {errors.pesan && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-semibold">
                    {errors.pesan}
                  </p>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full shadow-lg hover:shadow-xl text-white font-bold text-sm sm:text-base py-3 sm:py-4 lg:py-6 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[var(--color-brown-700)] via-[var(--color-brown-800)] to-[var(--color-teal-600)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-teal-700)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px] sm:min-h-[44px]"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 mr-2 inline-block" />
                <span>
                  {isSubmitting
                    ? "Mengirim Pesan..."
                    : "Kirim Konsultasi Gratis Sekarang"}
                </span>
              </Button>

              {/* Privacy Note */}
              <p className="text-[10px] sm:text-xs text-center text-[var(--color-text-500)] flex items-center justify-center gap-1 sm:gap-1.5">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-teal-600)] flex-shrink-0" />
                <span>
                  Data Anda aman & hanya digunakan untuk keperluan konsultasi
                </span>
              </p>
            </div>
          </div>

          {/* ✅ Map & Info - Fully Responsive */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 lg:animate-fadeInRight delay-400">
            {/* Google Maps */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--color-cream-200)]">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.456!2d106.860!3d-6.910!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzYuMCJTIDEwNsKwNTEnMzYuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full sm:h-[260px] lg:h-[280px]"
                  title="Lokasi Pondok Pesantren Al-Imam Al-Islami"
                  aria-label="Google Maps menampilkan lokasi Pondok Pesantren Al-Imam Al-Islami"
                />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-xl border-2 border-[var(--color-gold-400)]">
                  <p className="text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 text-[var(--color-brown-800)]">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-gold-600)] flex-shrink-0" />
                    <span>Sukabumi, Jawa Barat</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Operating Hours - Fully Responsive */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl border-2 border-[var(--color-cream-200)]">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-gold-600)] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gradient-brown mb-2 leading-tight">
                    Kapan Bisa Konsultasi?
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-600)] mb-3 sm:mb-4">
                    Tim kami siap membantu di jam berikut:
                  </p>
                  <div className="space-y-2">
                    {[
                      { day: "Senin - Kamis", time: "08:00 - 16:00 WIB" },
                      { day: "Jum'at", time: "08:00 - 11:30 WIB" },
                      { day: "Sabtu", time: "08:00 - 14:00 WIB" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[var(--color-gold-50)] to-[var(--color-teal-50)] border border-[var(--color-gold-200)]"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[var(--color-text-800)]">
                          {item.day}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-gradient-gold">
                          {item.time}
                        </span>
                      </div>
                    ))}
                    <div className="pt-3 sm:pt-4 border-t-2 border-[var(--color-gold-200)] mt-3 sm:mt-4">
                      <p className="text-[10px] sm:text-xs text-[var(--color-text-600)] flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-500)] flex-shrink-0 mt-0.5" />
                        <span>
                          Ingin{" "}
                          <span className="font-bold text-[var(--color-brown-700)]">
                            kunjungi pesantren
                          </span>
                          ? Hubungi kami via WhatsApp untuk jadwal kunjungan
                          khusus
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Quick Links - Fully Responsive (2 cols on mobile) */}
            <div className="bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-teal-50)] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-[var(--color-brown-100)] shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold mb-2 flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2">
                <span className="text-[var(--color-brown-800)]">
                  Butuh Info{" "}
                </span>
                <span className="text-gradient-gold">Lebih Detail?</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-600)] mb-4 sm:mb-5">
                Akses langsung ke informasi penting
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    href: "/ppdb",
                    icon: FileSignature,
                    label: "Info PPDB",
                    benefit: "Syarat & biaya lengkap",
                  },
                  {
                    href: "/brosur",
                    icon: FileText,
                    label: "Unduh Brosur",
                    benefit: "PDF gratis & lengkap",
                  },
                  {
                    href: "/fasilitas",
                    icon: School,
                    label: "Fasilitas",
                    benefit: "Lihat asrama & kelas",
                  },
                  {
                    href: "/faq",
                    icon: HelpCircle,
                    label: "FAQ",
                    benefit: "Jawaban cepat",
                  },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-[var(--color-cream-200)] hover:shadow-lg hover:-translate-y-2 hover:border-[var(--color-gold-300)] transition-all duration-300 active:scale-98 text-center"
                  >
                    <item.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 mx-auto mb-2 sm:mb-3 text-[var(--color-brown-600)] group-hover:text-[var(--color-gold-600)] group-hover:scale-110 transition-all duration-300" />
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-text-900)] block group-hover:text-[var(--color-brown-700)] transition-colors duration-300 mb-1 leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[var(--color-text-500)] leading-tight">
                      {item.benefit}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ✅ Trust Badge - Fully Responsive */}
            <div className="bg-gradient-to-r from-[var(--color-cream-200)] to-[var(--color-gold-100)] border-2 border-[var(--color-brown-200)] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-teal-600)]" />
                <h4 className="text-base sm:text-lg font-bold text-[var(--color-brown-800)] leading-tight">
                  Dipercaya Ribuan Keluarga
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-700)] leading-relaxed mb-3 sm:mb-4">
                <span className="font-bold text-[var(--color-gold-700)]">
                  500+ orang tua
                </span>{" "}
                sudah berkonsultasi & mempercayakan pendidikan anak mereka
                kepada kami
              </p>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[var(--color-text-600)]">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)] flex-shrink-0" />
                <span className="font-semibold">
                  29 tahun track record terpercaya
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
