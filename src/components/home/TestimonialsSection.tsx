"use client";

import Link from "next/link";
import { MessageCircle, Star, Share2, Trophy, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Bapak H. Ahmad Rifa'i",
      role: "Wali Santri MTs Al-Imam",
      initial: "A",
      color: "from-[var(--color-brown-600)] to-[var(--color-gold-500)]",
      delay: "100",
      location: "Bogor",
      years: "Mondok 2 Tahun",
      quote:
        "Perubahan akhlak anak saya luar biasa sejak mondok di sini. Dari yang susah disuruh sholat, sekarang malah ngingetin kami sekeluarga waktu sholat.",
      highlight: "Perubahan Akhlak Nyata",
    },
    {
      name: "Ibu Siti Fatimah, S.Pd",
      role: "Wali Santri MA Al-Imam",
      initial: "S",
      color: "from-[var(--color-gold-500)] to-[var(--color-teal-500)]",
      delay: "150",
      location: "Sukabumi",
      years: "Mondok 3 Tahun",
      quote:
        "Saya guru, jadi saya tahu bedanya pendidikan biasa dengan yang di Al-Imam. Anak saya hafal Qur'an PLUS ranking 3 di kelas. Dua-duanya dapat!",
      highlight: "Prestasi Ganda: Tahfidz + Akademik",
    },
    {
      name: "Bapak Drs. Muhammad Yusuf",
      role: "Wali Santri Tahfidz",
      initial: "M",
      color: "from-[var(--color-teal-500)] to-[var(--color-brown-700)]",
      delay: "200",
      location: "Jakarta",
      years: "Mondok 4 Tahun",
      quote:
        "Awalnya cuma hafal 3 juz, sekarang sudah 15 juz dalam 2 tahun. Bacaannya tartil, artinya paham pula. Ini hasil nyata, bukan janji kosong.",
      highlight: "12 Juz dalam 2 Tahun!",
    },
    {
      name: "Keluarga Bapak Abdullah",
      role: "Wali 3 Santri Al-Imam",
      initial: "A",
      color: "from-[var(--color-brown-700)] to-[var(--color-teal-600)]",
      delay: "250",
      location: "Depok",
      years: "Mondok 5+ Tahun",
      quote:
        "3 anak kami semua di sini, dari SMP sampai SMA. Biaya lebih murah dari sekolah swasta plus dapat asrama, makan, dan bimbingan 24 jam. Value for money!",
      highlight: "3 Anak, Semua di Al-Imam",
    },
  ];

  const stats = [
    {
      value: "98%",
      label: "Kepuasan Orang Tua",
      sublabel: "Survey 2025",
      icon: Star,
      color: "text-[var(--color-gold-500)]",
    },
    {
      value: "92%",
      label: "Merekomendasikan",
      sublabel: "Ke Kerabat & Teman",
      icon: Share2,
      color: "text-[var(--color-teal-500)]",
    },
    {
      value: "4.9/5",
      label: "Rating Pengajar",
      sublabel: "Kompetensi & Dedikasi",
      icon: Star,
      color: "text-[var(--color-brown-600)]",
    },
    {
      value: "95%",
      label: "Peningkatan Prestasi",
      sublabel: "Dalam 6 Bulan Pertama",
      icon: Trophy,
      color: "text-[var(--color-gold-600)]",
    },
  ];

  return (
    <Section
      id="testimonials"
      className="bg-gradient-to-br from-[var(--color-gold-50)] via-[var(--color-cream-50)] to-[var(--color-teal-50)] py-12 sm:py-16 md:py-20 relative overflow-hidden animate-fadeInUp"
    >
      {/* ✅ FIXED: Decorative Blobs - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl bg-[var(--color-gold-100)]/40 animate-float" />
      <div className="hidden md:block absolute bottom-20 right-10 w-52 h-52 rounded-full blur-3xl bg-[var(--color-teal-100)]/30 animate-float delay-500" />

      <Container size="lg" className="relative z-10">
        {/* ✅ IMPROVED: Badge - Responsive */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeInDown px-4 sm:px-0">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-500)] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg border border-[var(--color-gold-500)]/30">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">
              Kata Mereka yang Sudah Merasakan
            </span>
          </span>
        </div>

        {/* ✅ IMPROVED: Heading - Responsive text sizes */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fadeInUp delay-200 px-4 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            <span className="text-[var(--color-brown-800)]">
              Ribuan Orang Tua{" "}
            </span>
            <span className="text-gradient-gold">Percaya</span>
            <span className="text-[var(--color-brown-800)]"> Pada Kami</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-[var(--color-gold-700)]">
              Jangan percaya kata kami.
            </span>{" "}
            Dengarkan langsung dari para orang tua yang sudah melihat perubahan
            nyata pada anak mereka
          </p>
        </div>

        {/* ✅ IMPROVED: Testimonials Grid - 1 col mobile, 2 cols desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-16 px-4 sm:px-0">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 active:scale-98 bg-white/80 backdrop-blur-xl border border-[var(--color-cream-200)] hover:border-[var(--color-gold-200)] animate-fadeInUp"
              style={{
                animationDelay: `${parseInt(item.delay) + 300}ms`,
              }}
            >
              {/* ✅ IMPROVED: Quote Mark - Responsive positioning */}
              <div className="absolute -top-4 sm:-top-6 left-6 sm:left-8 text-4xl sm:text-5xl text-[var(--color-gold-200)] opacity-30">
                "
              </div>

              {/* ✅ IMPROVED: Avatar + Header - Better mobile layout */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-[var(--color-text-900)] group-hover:text-[var(--color-brown-700)] transition-colors duration-300 mb-1 leading-tight">
                    {item.name}
                  </h4>
                  {/* ✅ IMPROVED: Meta info - Stack on very small screens */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--color-text-600)]">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-[var(--color-text-400)] hidden xs:inline">
                      •
                    </span>
                    <span className="w-full xs:w-auto">{item.location}</span>
                    <span className="text-[var(--color-text-400)] hidden xs:inline">
                      •
                    </span>
                    <span className="font-semibold text-[var(--color-teal-600)]">
                      {item.years}
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ IMPROVED: Stars - Responsive sizing */}
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-gold-400)] fill-[var(--color-gold-400)] group-hover:scale-110 transition-transform duration-300"
                    style={{
                      transitionDelay: `${i * 30}ms`,
                    }}
                  />
                ))}
              </div>

              {/* ✅ IMPROVED: Quote - Responsive text */}
              <blockquote className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] leading-relaxed italic mb-3 sm:mb-4 text-justify">
                "{item.quote}"
              </blockquote>

              {/* ✅ IMPROVED: Highlight Badge - Responsive */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-[var(--color-gold-50)] to-[var(--color-teal-50)] border border-[var(--color-gold-200)]">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-gold-600)] flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-[var(--color-text-700)] leading-tight">
                  {item.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ IMPROVED: Stats Cards - 2 cols mobile, 4 cols desktop */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 animate-fadeInUp px-4 sm:px-0"
          style={{ animationDelay: "800ms" }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-xl border border-[var(--color-cream-200)] hover:shadow-lg hover:-translate-y-2 transition-all duration-300 active:scale-98 text-center"
            >
              <div
                className={`text-2xl sm:text-3xl mb-2 sm:mb-3 ${stat.color}`}
              >
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <p
                className={`text-xl sm:text-2xl lg:text-3xl font-black ${stat.color} mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300`}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text-700)] mb-0.5 sm:mb-1 leading-tight">
                {stat.label}
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-500)] leading-tight">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ IMPROVED: CTA - Fully responsive */}
        <div
          className="text-center animate-fadeInUp px-4 sm:px-0"
          style={{ animationDelay: "1000ms" }}
        >
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            <span className="font-bold text-[var(--color-gold-700)]">
              500+ keluarga
            </span>{" "}
            sudah mempercayakan pendidikan putra-putri mereka kepada kami.{" "}
            <span className="font-bold text-[var(--color-brown-800)]">
              Kapan giliran Anda?
            </span>
          </p>

          {/* ✅ IMPROVED: Buttons - Stack on mobile, better touch targets */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 lg:py-6 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] text-white hover:from-[var(--color-brown-800)] hover:to-[var(--color-teal-700)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
              asChild
            >
              <Link
                href="/ppdb"
                className="flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Pelajari Info PPDB Lengkap</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 lg:py-6 border-2 border-[var(--color-gold-500)] text-[var(--color-gold-600)] hover:bg-[var(--color-gold-50)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
              asChild
            >
              <Link
                href="/testimoni"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Baca Testimoni Lainnya</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
