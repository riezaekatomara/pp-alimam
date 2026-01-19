"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function FeaturesSection() {
  const benefits = [
    {
      icon: "fa-book-open",
      gradient:
        "linear-gradient(to right, var(--color-brown-700), var(--color-brown-600))",
      bgGradient: "from-[var(--color-cream-200)] to-[var(--color-brown-100)]",
      title: "Kurikulum Terpadu Nasional",
      description:
        "Ijazah resmi Diknas PLUS hafalan 30 juz dalam satu paket. Tidak perlu pilih salah satu!",
      details: ["Ijazah Resmi Diknas", "Hafalan 30 Juz", "Bahasa Arab Aktif"],
    },
    {
      icon: "fa-award",
      gradient:
        "linear-gradient(to right, var(--color-gold-500), var(--color-gold-600))",
      bgGradient: "from-[var(--color-gold-50)] to-[var(--color-cream-200)]",
      title: "Akreditasi A - Terjamin Kualitas",
      description:
        "Alumni kami diterima di PTN top karena kualitas diakui BAN nasional.",
      details: ["MTs Akreditasi A", "MA Akreditasi A", "Diakui Nasional"],
    },
    {
      icon: "fa-chalkboard-teacher",
      gradient:
        "linear-gradient(to right, var(--color-teal-500), var(--color-teal-600))",
      bgGradient: "from-[var(--color-teal-50)] to-[var(--color-cream-200)]",
      title: "Guru Lulusan Timur Tengah",
      description:
        "50+ ustadz/ustadzah alumni Al-Azhar & universitas top Timur Tengah.",
      details: [
        "50+ Pengajar Expert",
        "Alumni Al-Azhar",
        "Pengalaman 10+ Tahun",
      ],
    },
    {
      icon: "fa-book-quran",
      gradient:
        "linear-gradient(to right, var(--color-brown-600), var(--color-gold-500))",
      bgGradient: "from-[var(--color-brown-50)] to-[var(--color-cream-200)]",
      title: "Target 30 Juz Terstruktur",
      description:
        "Ribuan alumni kami hafal 30 juz dalam 4 tahun dengan sanad jelas.",
      details: ["Sanad Jelas", "Metode Terbukti", "30 Juz dalam 4 Tahun"],
    },
    {
      icon: "fa-language",
      gradient:
        "linear-gradient(to right, var(--color-teal-600), var(--color-brown-700))",
      bgGradient: "from-[var(--color-teal-50)] to-[var(--color-gold-50)]",
      title: "Bahasa Arab Seperti Native",
      description:
        "Santri bisa ngomong dan nulis Arab lancar setelah 2 tahun belajar.",
      details: ["Konversasi Aktif", "Baca & Tulis", "Kitab Kuning"],
    },
    {
      icon: "fa-users",
      gradient:
        "linear-gradient(to right, var(--color-gold-600), var(--color-teal-500))",
      bgGradient: "from-[var(--color-gold-50)] to-[var(--color-cream-200)]",
      title: "Fasilitas Setara Kampus",
      description:
        "Asrama AC, musholla luas, lab modern - semua untuk kenyamanan anak.",
      details: ["Asrama Ber-AC", "Lab Lengkap", "Musholla 500+ Jamaah"],
    },
    {
      icon: "fa-handshake",
      gradient:
        "linear-gradient(to right, var(--color-brown-700), var(--color-teal-600))",
      bgGradient: "from-[var(--color-cream-200)] to-[var(--color-brown-100)]",
      title: "Salaf + Modern, Best of Both",
      description:
        "Nilai tradisi pesantren salaf + teknologi pembelajaran terkini.",
      details: ["Nilai Salaf Kuat", "Metode Modern", "Full Boarding"],
    },
    {
      icon: "fa-star",
      gradient:
        "linear-gradient(to right, var(--color-gold-500), var(--color-brown-700))",
      bgGradient: "from-[var(--color-gold-50)] to-[var(--color-teal-50)]",
      title: "Akhlak Terpantau 24/7",
      description:
        "Anak diawasi dan dibimbing ustadz 24 jam setiap hari nonstop.",
      details: ["Pengawasan 24 Jam", "Bimbingan Personal", "Laporan Rutin"],
    },
  ];

  return (
    <Section
      id="keunggulan"
      className="animate-fadeInUp bg-gradient-to-br from-[var(--color-gold-50)] via-[var(--color-cream-50)] to-[var(--color-teal-50)] relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Decorative blobs - ✅ Responsive sizing */}
      <div className="absolute top-12 sm:top-24 left-6 sm:left-12 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-2xl sm:blur-3xl -z-0 bg-[var(--color-gold-100)]/40 animate-float" />
      <div className="absolute bottom-12 sm:bottom-24 right-6 sm:right-12 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl -z-0 bg-[var(--color-teal-100)]/30 animate-float delay-700" />

      <Container className="relative z-10">
        {/* ✅ IMPROVED: Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fadeInDown px-4 sm:px-0">
          <div className="inline-flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg border-2 bg-gradient-to-r from-[var(--color-brown-700)] via-[var(--color-brown-600)] to-[var(--color-teal-500)] border-[var(--color-gold-500)/30] mb-3 sm:mb-4">
            <i className="fas fa-trophy text-xs sm:text-sm" />
            <span className="whitespace-nowrap">
              Terbukti Sejak 1995 - 29 Tahun
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 leading-tight">
            <span className="text-[var(--color-brown-800)]">Kenapa </span>
            <span className="text-gradient-gold">Ribuan Orang Tua</span>
            <span className="text-[var(--color-brown-800)]">
              {" "}
              Memilih Kami?
            </span>
          </h2>
        </div>

        {/* ✅ IMPROVED: Hero-style main feature card - Responsive padding */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-10 md:mb-12 p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-br from-[var(--color-brown-700)] via-[var(--color-brown-600)] to-[var(--color-teal-500)] text-white text-center animate-fadeInUp delay-300 mx-4 sm:mx-auto">
          <i className="fas fa-star-and-crescent text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 opacity-60" />
          <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 leading-tight">
            <span className="text-white">Bukan Janji Kosong, </span>
            <span className="text-[var(--color-gold-200)]">
              Ini Track Record Kami
            </span>
          </h3>
          <p className="text-sm xs:text-base sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-white/90">
            29 tahun membuktikan: ribuan alumni kami hafal 30 juz, lulus PTN
            favorit, dan menjadi pemimpin berakhlak mulia di berbagai bidang
          </p>
        </div>

        {/* ✅ IMPROVED: Subtitle - Responsive */}
        <p className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 animate-fadeInUp delay-400 px-4 sm:px-0">
          <span className="font-bold text-[var(--color-gold-700)]">
            8 Jaminan Konkret
          </span>
          <span className="text-[var(--color-text-700)]">
            {" "}
            yang Tidak Anda Dapatkan di Tempat Lain
          </span>
        </p>

        {/* ✅ IMPROVED: Benefits Grid - Responsive columns */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 active:scale-98 cursor-pointer bg-gradient-to-br from-white via-[var(--color-cream-50)] to-[var(--color-cream-100)] border border-[var(--color-cream-200)] hover:border-[var(--color-teal-200)] animate-fadeInUp"
              style={{
                animationDelay: `${Math.min(400 + idx * 60, 800)}ms`,
              }}
            >
              {/* Icon - ✅ Responsive sizing */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br ${benefit.bgGradient}`}
              >
                <i
                  className={`fas ${benefit.icon} text-lg sm:text-xl`}
                  style={{
                    backgroundImage: benefit.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />
              </div>

              {/* Content - ✅ Responsive text */}
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-bold text-[var(--color-text-900)] mb-1.5 sm:mb-2 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
                  {benefit.title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--color-text-600)] mb-3 sm:mb-4 leading-relaxed text-justify">
                  {benefit.description}
                </p>

                {/* Details List - ✅ Responsive spacing */}
                <div className="space-y-1 sm:space-y-1.5">
                  {benefit.details.map((detail, detailIdx) => (
                    <div
                      key={detailIdx}
                      className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[var(--color-text-700)] font-medium"
                    >
                      <i className="fas fa-check-circle text-[var(--color-teal-600)] flex-shrink-0 text-xs" />
                      <span className="text-left leading-snug">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ IMPROVED: CTA Section - Fully responsive */}
        <div
          className="text-center animate-fadeInUp px-4 sm:px-0"
          style={{ animationDelay: "900ms" }}
        >
          <div className="border-2 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto bg-gradient-to-r from-[var(--color-cream-200)] via-[var(--color-gold-50)] to-[var(--color-teal-50)] border-[var(--color-brown-100)] shadow-lg hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 leading-tight">
              <span className="text-[var(--color-brown-900)]">
                Sudah Yakin?{" "}
              </span>
              <span className="text-gradient-gold">Lihat Detailnya Dulu!</span>
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-text-600)] mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed">
              Pelajari syarat, biaya, dan jadwal lengkap PPDB 2026/2027 sebelum
              mendaftar
            </p>

            {/* ✅ IMPROVED: Buttons - Stack on mobile, side by side on SM+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-950)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group min-h-[44px]"
                asChild
              >
                <Link
                  href="/ppdb"
                  className="flex items-center justify-center gap-2"
                >
                  <i className="fas fa-info-circle text-xs sm:text-sm" />
                  <span>Lihat Info PPDB Lengkap</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto shadow-md hover:shadow-lg font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl border-2 border-[var(--color-teal-600)] text-[var(--color-teal-700)] hover:bg-[var(--color-teal-50)] hover:text-[var(--color-teal-900)] hover:border-[var(--color-teal-700)] transition-all duration-300 hover:-translate-y-1 active:scale-95 min-h-[44px]"
                asChild
              >
                <Link
                  href="/kontak"
                  className="flex items-center justify-center gap-2"
                >
                  <i className="fas fa-phone text-xs sm:text-sm" />
                  <span>Konsultasi Gratis</span>
                </Link>
              </Button>
            </div>

            {/* Trust Indicator - ✅ Responsive text */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[var(--color-brown-200)]">
              <p className="text-xs sm:text-sm text-[var(--color-text-500)] flex flex-col xs:flex-row items-center justify-center gap-1 xs:gap-2">
                <span className="flex items-center gap-1.5 xs:gap-2">
                  <i className="fas fa-users text-[var(--color-teal-600)]" />
                  <span className="font-semibold text-[var(--color-gold-700)]">
                    127 orang tua
                  </span>
                </span>
                <span>sudah mendaftar bulan ini</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
