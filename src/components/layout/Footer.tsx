"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  Facebook,
  Shield,
  ExternalLink,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      href: "/",
      label: "Beranda",
      benefit: "Lihat overview lengkap",
    },
    {
      href: "/visi-misi",
      label: "Visi & Misi",
      benefit: "Komitmen kami untuk santri",
    },
    {
      href: "/galeri",
      label: "Galeri Kegiatan",
      benefit: "Lihat kehidupan santri sehari-hari",
    },
    {
      href: "/ppdb",
      label: "PPDB 2026/2027",
      benefit: "Syarat & jadwal pendaftaran",
    },
  ];

  const programLinks = [
    {
      href: "/mts",
      label: "MTs Al-Imam",
      icon: "fa-school",
      benefit: "SMP + Tahfidz",
    },
    {
      href: "/ma",
      label: "MA Al-Imam",
      icon: "fa-university",
      benefit: "SMA + Tahfidz",
    },
    {
      href: "/tahfidz",
      label: "Program Tahfidz",
      icon: "fa-book-quran",
      benefit: "Target 30 Juz",
    },
    {
      href: "/muhadharoh",
      label: "Muhadharoh & Bahasa",
      icon: "fa-microphone",
      benefit: "Mahir Arabic & Public Speaking",
    },
  ];

  const socialLinks = [
    {
      href: "https://youtube.com/@alimamalislami",
      label: "YouTube",
      icon: Youtube,
      bgColor: "bg-red-500 hover:bg-red-600",
      followers: "5K+ Subscribers",
    },
    {
      href: "https://instagram.com/alimamalislami",
      label: "Instagram",
      icon: Instagram,
      bgColor:
        "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      followers: "10K+ Followers",
    },
    {
      href: "https://facebook.com/alimamalislami",
      label: "Facebook",
      icon: Facebook,
      bgColor: "bg-blue-600 hover:bg-blue-700",
      followers: "15K+ Followers",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brown-50)] via-[var(--color-cream-200)] to-[var(--color-brown-100)] border-t-4 border-[var(--color-gold-500)]">
      {/* ✅ Decorative Elements - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-brown-700) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* ✅ Animated Blur Circles - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 right-20 w-80 h-80 bg-[var(--color-gold-500)]/[0.04] rounded-full blur-3xl animate-pulse" />
      <div
        className="hidden md:block absolute bottom-20 left-20 w-80 h-80 bg-[var(--color-teal-700)]/[0.04] rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        {/* ✅ FINAL CTA BANNER - Fully Responsive */}
        <div className="mb-12 sm:mb-16 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--color-brown-700)] via-[var(--color-brown-600)] to-[var(--color-teal-700)] shadow-2xl border-2 border-[var(--color-gold-500)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left flex-1 w-full">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2 sm:mb-3">
                <i className="fas fa-star text-[var(--color-gold-500)] text-sm sm:text-base"></i>
                <span className="text-[var(--color-gold-500)] font-bold text-xs sm:text-sm uppercase tracking-wider">
                  Masih Ragu?
                </span>
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                Konsultasi Gratis dengan Tim Kami
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                Tanya apapun tentang pesantren, program, biaya, atau
                kekhawatiran Anda.{" "}
                <span className="font-bold text-[var(--color-gold-500)]">
                  Tidak ada tekanan untuk mendaftar!
                </span>
              </p>
            </div>

            {/* ✅ CTA Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <a
                href="https://wa.me/6285722253236?text=Assalamualaikum,%20saya%20ingin%20konsultasi%20tentang%20pesantren"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-white text-[var(--color-teal-700)] font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 min-h-[48px] sm:min-h-[44px]"
              >
                <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
                <span>Chat WhatsApp Sekarang</span>
              </a>
              <Link
                href="/ppdb"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-[var(--color-gold-500)] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-[var(--color-gold-600)] active:scale-95 min-h-[48px] sm:min-h-[44px]"
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Info PPDB Lengkap</span>
              </Link>
            </div>
          </div>

          {/* ✅ Trust Indicators - Stack on mobile, row on desktop */}
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/20">
            <div className="flex flex-col xs:flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-white/90 text-xs sm:text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <i className="fas fa-shield-alt text-[var(--color-gold-500)] flex-shrink-0"></i>
                <span>
                  <span className="font-bold text-white">29 tahun</span>{" "}
                  dipercaya
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <i className="fas fa-users text-[var(--color-gold-500)] flex-shrink-0"></i>
                <span>
                  <span className="font-bold text-white">500+ santri</span>{" "}
                  aktif
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <i className="fas fa-award text-[var(--color-gold-500)] flex-shrink-0"></i>
                <span>
                  <span className="font-bold text-white">Terakreditasi A</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Main Content Grid - 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* ✅ Brand Section - Fully Responsive */}
          <div className="lg:col-span-1 space-y-5 sm:space-y-6">
            <div className="group flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-brown-700)] to-[var(--color-brown-600)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-[var(--color-gold-500)]/30 flex-shrink-0">
                <i className="fas fa-mosque text-xl sm:text-2xl text-white"></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-brown-700)] leading-tight">
                  Pondok Pesantren
                </h3>
                <p className="font-bold text-base sm:text-lg text-[var(--color-gold-500)] leading-tight">
                  Al-Imam Al-Islami
                </p>
              </div>
            </div>

            <p className="text-[var(--color-text-600)] leading-relaxed text-sm font-medium">
              <span className="font-bold text-[var(--color-brown-700)]">
                Lebih dari sekadar pesantren.
              </span>{" "}
              Kami membentuk generasi Qur'ani yang berakhlak mulia, hafal 30
              juz, dan siap bersaing di dunia modern.
            </p>

            {/* ✅ Trust Badge - Fully Responsive */}
            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[var(--color-teal-100)] to-[var(--color-gold-50)] border-2 border-[var(--color-teal-700)]/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-teal-700)] flex-shrink-0" />
                <span className="text-sm font-bold text-[var(--color-brown-700)]">
                  Dipercaya Sejak 1995
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-600)] leading-relaxed">
                <span className="font-bold text-[var(--color-teal-700)]">Ribuan alumni</span>{" "}
                kami tersebar di PTN favorit & universitas Timur Tengah
              </p>
            </div>

            <div className="pt-3 sm:pt-4">
              <a
                href="https://www.alimamalislami.sch.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-brown-700)] hover:text-[var(--color-brown-600)] font-semibold text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-[var(--color-brown-100)] transition-all duration-300 border border-[var(--color-gold-500)]/30 bg-white/50 hover:shadow-md active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Situs Resmi Pesantren</span>
              </a>
            </div>
          </div>

          {/* ✅ Quick Links - Fully Responsive */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-gold-600)] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-link text-white text-xs sm:text-sm"></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[var(--color-brown-700)]">
                Jelajahi
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group flex items-start gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 text-[var(--color-text-600)] hover:text-[var(--color-brown-700)] font-medium text-sm border border-[var(--color-brown-100)] active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 text-[var(--color-gold-500)] group-hover:text-[var(--color-gold-600)] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="block font-semibold mb-0.5 leading-tight">
                        {link.label}
                      </span>
                      <span className="text-xs text-[var(--color-text-500)] leading-tight">
                        {link.benefit}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Programs - Fully Responsive */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-teal-700)] to-[var(--color-teal-600)] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-graduation-cap text-white text-xs sm:text-sm"></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[var(--color-teal-700)]">
                Program Unggulan
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {programLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 text-[var(--color-text-600)] hover:text-[var(--color-teal-700)] font-medium text-sm border border-[var(--color-brown-100)] active:scale-95"
                  >
                    <i
                      className={`fas ${link.icon} text-[var(--color-teal-700)] group-hover:text-[var(--color-teal-600)] text-sm sm:text-base transition-colors duration-300 flex-shrink-0 mt-0.5`}
                    ></i>
                    <div className="flex-1 min-w-0">
                      <span className="block font-semibold mb-0.5 leading-tight">
                        {link.label}
                      </span>
                      <span className="text-xs text-[var(--color-text-500)] leading-tight">
                        {link.benefit}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Contact - Fully Responsive */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-teal-700)] to-[var(--color-teal-500)] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-phone text-white text-xs sm:text-sm"></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[var(--color-teal-700)]">
                Hubungi Kami
              </h4>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {/* ✅ Address - Fully Responsive */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl bg-white/60 border border-[var(--color-brown-100)] hover:bg-white hover:shadow-md transition-all duration-300">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[var(--color-gold-500)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--color-text-800)] font-semibold mb-1 text-sm leading-tight">
                    Kunjungi Langsung
                  </p>
                  <p className="text-[var(--color-brown-700)] text-xs font-medium leading-relaxed">
                    Jl. Pelabuhan Ratu II KM 18, Kp. Pupunjul, Desa Cikembar,
                    Sukabumi
                  </p>
                </div>
              </div>

              {/* ✅ Phone - Fully Responsive with online indicator */}
              <a
                href="https://wa.me/6285722253236?text=Assalamualaikum,%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[var(--color-teal-100)] to-[var(--color-gold-50)] border-2 border-[var(--color-teal-700)]/30 hover:border-[var(--color-teal-700)] hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                <div className="relative flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[var(--color-teal-700)]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-teal-700)] font-bold mb-1">
                    CHAT SEKARANG - GRATIS
                  </p>
                  <p className="text-base sm:text-lg font-black text-[var(--color-text-800)] group-hover:text-[var(--color-teal-700)] transition-colors duration-300 break-all">
                    +62 857-2225-3236
                  </p>
                  <p className="text-[var(--color-text-600)] text-xs font-medium mt-1">
                    Respons &lt; 2 jam (hari kerja)
                  </p>
                </div>
              </a>

              {/* ✅ Email - Fully Responsive */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl bg-white/60 border border-[var(--color-brown-100)] hover:bg-white hover:shadow-md transition-all duration-300">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[var(--color-gold-500)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-brown-700)] font-semibold mb-1">
                    Email Kami
                  </p>
                  <a
                    href="mailto:alimamalislami@gmail.com"
                    className="text-sm font-medium text-[var(--color-text-600)] hover:text-[var(--color-brown-700)] transition-colors duration-300 break-all"
                  >
                    alimamalislami@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Divider & Bottom Section - Fully Responsive */}
        <div className="border-t-2 border-[var(--color-gold-500)]/30 pt-8 sm:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            {/* ✅ Copyright - Fully Responsive */}
            <div className="text-center md:text-left space-y-2 sm:space-y-3 flex-1">
              <p className="text-base sm:text-lg font-semibold text-[var(--color-text-800)]">
                © {currentYear}{" "}
                <span className="font-bold text-[var(--color-brown-700)]">
                  Pondok Pesantren Al-Imam Al-Islami
                </span>
              </p>
              <p className="text-[var(--color-text-600)] text-sm max-w-xl mx-auto md:mx-0 font-medium leading-relaxed">
                <span className="font-bold text-[var(--color-teal-700)]">29 tahun</span>{" "}
                membentuk generasi Qur'ani yang berakhlak mulia & berprestasi
              </p>
            </div>

            {/* ✅ Social Media - Fully Responsive */}
            <div className="space-y-3">
              <p className="text-sm font-bold text-[var(--color-brown-700)] text-center md:text-right">
                Ikuti Kegiatan Kami
              </p>
              <div className="flex items-center justify-center md:justify-end gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`group relative p-3 sm:p-3.5 rounded-xl hover:scale-110 transition-all duration-300 ${social.bgColor} shadow-lg hover:shadow-xl active:scale-95`}
                    aria-label={`${social.label} - ${social.followers}`}
                    title={social.followers}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    {/* ✅ Tooltip - Hidden on mobile */}
                    <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-text-800)] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {social.followers}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
