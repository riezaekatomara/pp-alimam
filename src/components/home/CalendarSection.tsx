"use client";

import Link from "next/link";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Download,
  Info,
  Flag,
  BookText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function CalendarSection() {
  const importantDates = [
    {
      icon: BookOpen,
      title: "Mulai Tahun Ajaran",
      date: "15 Juli 2026",
      benefit: "Anak langsung masuk lingkungan Islami 100% sejak hari pertama",
      bgColor: "bg-[var(--color-gold-50)]",
      iconColor: "text-[var(--color-gold-500)]",
    },
    {
      icon: BookText,
      title: "Pengajian Umum",
      date: "22 Juli 2026",
      benefit:
        "Orang tua diajak memahami sistem pendidikan & perkembangan anak",
      bgColor: "bg-[var(--color-brown-50)]",
      iconColor: "text-[var(--color-brown-600)]",
    },
    {
      icon: BookText,
      title: "Munasabah Al-Qur'an",
      date: "17-20 Ramadhan 1448 H",
      benefit: "Santri praktek langsung menghafal & memahami Al-Qur'an",
      bgColor: "bg-[var(--color-teal-50)]",
      iconColor: "text-[var(--color-teal-500)]",
    },
  ];

  const academicStructure = [
    {
      icon: BookOpen,
      title: "Semester 1",
      period: "Juli - Des 2026",
      highlight: "Adaptasi & Fondasi Kuat",
      bgColor: "bg-[var(--color-gold-50)]",
      borderColor: "border-[var(--color-gold-100)]",
      iconColor: "text-[var(--color-gold-500)]",
    },
    {
      icon: BookText,
      title: "Ramadhan 1448 H",
      period: "Mar - Apr 2027",
      highlight: "Intensif Tahfidz",
      bgColor: "bg-[var(--color-teal-50)]",
      borderColor: "border-[var(--color-teal-100)]",
      iconColor: "text-[var(--color-teal-500)]",
    },
    {
      icon: BookOpen,
      title: "Semester 2",
      period: "Jan - Jun 2027",
      highlight: "Akselerasi Pembelajaran",
      bgColor: "bg-[var(--color-brown-50)]",
      borderColor: "border-[var(--color-brown-100)]",
      iconColor: "text-[var(--color-brown-600)]",
    },
    {
      icon: GraduationCap,
      title: "Wisuda",
      period: "Juni 2027",
      highlight: "Perayaan Prestasi",
      bgColor: "bg-[var(--color-cream-50)]",
      borderColor: "border-[var(--color-cream-100)]",
      iconColor: "text-[var(--color-gold-600)]",
    },
  ];

  const calendarDays = [
    // Week 1
    { day: 29, isGray: true },
    { day: 30, isGray: true },
    { day: 1, isGray: true },
    { day: 2, isGray: true },
    { day: 3, isGray: true },
    { day: 4 },
    { day: 5 },
    // Week 2
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    // Week 3
    { day: 13 },
    { day: 14 },
    { day: 15, isHighlighted: true, event: "Mulai Tahun Ajaran" },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    // Week 4
    { day: 20 },
    { day: 21 },
    { day: 22, isSpecial: "brown" },
    { day: 23 },
    { day: 24, isSpecial: "teal" },
    { day: 25 },
    { day: 26 },
    // Week 5
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
    { day: 1, isGray: true },
    { day: 2, isGray: true },
  ];

  return (
    <Section
      id="kalender"
      className="bg-gradient-to-br from-[var(--color-cream-50)] via-[var(--color-gold-50)] to-[var(--color-teal-50)] py-12 sm:py-16 md:py-20 relative overflow-hidden animate-fadeInUp"
    >
      {/* ✅ FIXED: Decorative blobs - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-56 h-56 rounded-full blur-3xl bg-[var(--color-gold-100)]/40 animate-float" />
      <div className="hidden md:block absolute bottom-20 right-10 w-48 h-48 rounded-full blur-3xl bg-[var(--color-teal-100)]/30 animate-float delay-700" />

      <Container size="lg" className="relative z-10">
        {/* ✅ IMPROVED: Badge - Responsive */}
        <div className="text-center mb-4 sm:mb-6 animate-fadeInDown px-4 sm:px-0">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-500)] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg border border-[var(--color-gold-500)]/30">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">JANGAN SAMPAI TERLAMBAT!</span>
          </span>
        </div>

        {/* ✅ IMPROVED: Headline - Responsive text */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fadeInUp delay-200 px-4 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            <span className="text-[var(--color-brown-800)]">Tahun Ajaran </span>
            <span className="text-gradient-gold">2026/2027</span>
            <br />
            <span className="text-[var(--color-brown-800)]">Sudah </span>
            <span className="text-gradient-teal">Tinggal Hitungan Bulan!</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed mb-4">
            Ribuan orang tua sudah memastikan{" "}
            <span className="font-bold text-[var(--color-gold-700)]">
              kursi anak mereka
            </span>{" "}
            untuk tahun ajaran mendatang. Sisanya hanya{" "}
            <span className="font-bold text-[var(--color-brown-700)]">
              50 kuota
            </span>
            !
          </p>

          {/* ✅ IMPROVED: Urgency Banner - Responsive layout */}
          <div className="inline-flex flex-col xs:flex-row items-center gap-2 xs:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[var(--color-gold-100)] to-[var(--color-gold-50)] border-2 border-[var(--color-gold-300)] shadow-lg">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-700)] animate-pulse flex-shrink-0" />
            <div className="text-center xs:text-left">
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text-900)]">
                Pendaftaran Ditutup:{" "}
                <span className="text-[var(--color-gold-700)]">
                  31 Maret 2026
                </span>
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-600)]">
                127 calon santri sudah mendaftar bulan ini
              </p>
            </div>
          </div>
        </div>

        {/* ✅ IMPROVED: Main Content - Stack on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 lg:items-start px-4 sm:px-0">
          {/* Left Content */}
          <div className="lg:animate-fadeInLeft flex flex-col h-full">
            <div className="space-y-4 sm:space-y-6 flex-1">
              <div className="animate-fadeInUp delay-200">
                <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black text-[var(--color-brown-800)] mb-2 sm:mb-3 leading-tight">
                  Setiap Tanggal Ini{" "}
                  <span className="text-gradient-gold">
                    Penting untuk Anak Anda
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-600)] leading-relaxed max-w-lg">
                  Kami tidak hanya memberi jadwal, tapi{" "}
                  <span className="font-bold text-[var(--color-brown-700)]">
                    rencana lengkap
                  </span>{" "}
                  untuk memastikan anak Anda mendapat pendidikan terbaik sejak
                  hari pertama.
                </p>
              </div>

              {/* ✅ IMPROVED: CTA Buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 animate-fadeInUp delay-300">
                <Button
                  size="lg"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] text-white hover:from-[var(--color-brown-800)] hover:to-[var(--color-teal-700)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
                  asChild
                >
                  <Link
                    href="/kalender"
                    className="flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Lihat Kalender Lengkap</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-4 md:py-6 border-2 border-[var(--color-gold-500)] text-[var(--color-gold-600)] hover:bg-[var(--color-gold-50)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
                  asChild
                >
                  <Link
                    href="/uploads/kalender-2026-2027.pdf"
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Unduh PDF Gratis</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </Button>
              </div>

              {/* ✅ IMPROVED: Important Dates - Better mobile spacing */}
              <div className="space-y-3 sm:space-y-4 animate-fadeInUp delay-400">
                {importantDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-[var(--color-cream-200)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 active:scale-98"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0 ${item.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon
                        className={`${item.iconColor} w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-[var(--color-text-900)] mb-1 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-base font-semibold text-gradient-gold mb-1 sm:mb-2">
                        {item.date}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--color-text-600)] leading-relaxed">
                        ✓ {item.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ IMPROVED: Calendar Widget - Fully responsive */}
          <div className="lg:animate-fadeInRight delay-200">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border-2 border-[var(--color-cream-200)] overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-[var(--color-brown-700)] via-[var(--color-brown-600)] to-[var(--color-gold-500)] text-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">
                      Juli 2026
                    </h3>
                    <p className="text-gold-100 text-xs sm:text-sm opacity-90 leading-tight">
                      Awal Perjalanan Anak Anda Menuju Kesuksesan
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold border border-white/30 flex-shrink-0">
                    <Flag className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 -mt-0.5" />
                    <span className="hidden xs:inline">BULAN</span>
                    <span className="hidden sm:inline"> KRUSIAL</span>
                  </div>
                </div>
              </div>

              {/* ✅ IMPROVED: Calendar Body - Responsive padding */}
              <div className="p-3 sm:p-4 lg:p-5">
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                  {["M", "S", "R", "K", "J", "S", "M"].map((day, idx) => (
                    <div
                      key={idx}
                      className="text-center text-[var(--color-brown-600)] font-bold text-[10px] xs:text-xs sm:text-sm py-1 sm:py-2 uppercase"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* ✅ IMPROVED: Calendar Grid - Better mobile sizing */}
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                  {calendarDays.map((item, idx) => (
                    <div
                      key={idx}
                      className={`group relative text-center text-[10px] xs:text-xs font-semibold py-1.5 sm:py-2 px-0.5 sm:px-1 rounded-md sm:rounded-lg cursor-pointer transition-all duration-200 active:scale-95 ${
                        item.isGray
                          ? "text-[var(--color-text-400)]"
                          : item.isHighlighted
                            ? "text-white bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-teal-500)] shadow-md scale-105"
                            : item.isSpecial === "brown"
                              ? "text-white bg-[var(--color-brown-600)] shadow-sm"
                              : item.isSpecial === "teal"
                                ? "text-white bg-[var(--color-teal-500)] shadow-sm"
                                : "text-[var(--color-text-700)] hover:bg-[var(--color-gold-50)] hover:scale-105"
                      }`}
                    >
                      {item.day}
                      {/* ✅ IMPROVED: Tooltip - Better positioning for mobile */}
                      {item.isHighlighted && (
                        <div className="hidden sm:block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[var(--color-brown-900)] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg z-20 border border-[var(--color-gold-400)]">
                          <GraduationCap className="inline w-3 h-3 mr-1 -mt-0.5 text-[var(--color-gold-400)]" />
                          {item.event}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ IMPROVED: Footer - Responsive layout */}
              <div className="border-t-2 border-[var(--color-gold-200)] p-3 sm:p-4 bg-gradient-to-r from-[var(--color-cream-50)] to-[var(--color-gold-50)]">
                <div className="flex flex-col xs:flex-row items-center justify-between gap-2">
                  <div className="text-xs sm:text-sm text-[var(--color-text-700)] text-center xs:text-left">
                    <span className="font-bold text-gradient-gold">
                      Langkah berikutnya:
                    </span>
                    <span className="text-[var(--color-gold-600)] ml-1 font-semibold">
                      15 Juli - Hari H!
                    </span>
                  </div>
                  <Link
                    href="/kalender?bulan=juli-2026"
                    className="text-[var(--color-brown-700)] hover:text-[var(--color-brown-900)] text-xs sm:text-sm font-bold inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Detail</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ✅ IMPROVED: Legend & Info Box - Better mobile layout */}
            <div className="mt-4 sm:mt-6 space-y-3">
              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[var(--color-cream-200)]">
                {[
                  {
                    color:
                      "bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-teal-500)]",
                    icon: GraduationCap,
                    label: "Mulai TA",
                  },
                  {
                    color: "bg-[var(--color-brown-600)]",
                    icon: BookText,
                    label: "Pengajian",
                  },
                  {
                    color: "bg-[var(--color-teal-500)]",
                    icon: BookText,
                    label: "Munasabah",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-white/50 hover:bg-white transition-colors duration-200"
                  >
                    <div
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 ${item.color} rounded shadow-sm`}
                    />
                    <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
                      <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--color-brown-600)] flex-shrink-0" />
                      <span className="text-[10px] xs:text-xs font-medium text-[var(--color-text-700)] truncate">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ IMPROVED: Info Box - Better mobile spacing */}
              <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-teal-50)] border-2 border-[var(--color-brown-100)] shadow-lg">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-gold-500)] to-[var(--color-gold-600)] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[var(--color-brown-700)] leading-tight">
                      Jangan Sampai Kehabisan Kuota!
                    </h4>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-500)] mt-0.5 flex-shrink-0" />
                      <p className="text-[var(--color-text-700)] leading-relaxed">
                        <span className="font-bold text-[var(--color-brown-700)]">
                          Pendaftaran dibuka
                        </span>{" "}
                        1 Juni - 31 Maret 2026 (atau sampai kuota penuh)
                      </p>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-teal-500)] mt-0.5 flex-shrink-0" />
                      <p className="text-[var(--color-text-700)] leading-relaxed">
                        <span className="font-bold text-[var(--color-brown-700)]">
                          Ujian masuk
                        </span>{" "}
                        minggu pertama Juli - pastikan anak Anda siap!
                      </p>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brown-500)] mt-0.5 flex-shrink-0" />
                      <p className="text-[var(--color-text-700)] leading-relaxed">
                        <span className="font-bold text-[var(--color-brown-700)]">
                          Pengumuman kelulusan
                        </span>{" "}
                        10 Juli 2026 - waktu yang dinanti-nanti!
                      </p>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="pt-2 sm:pt-3 border-t border-[var(--color-brown-200)]">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[var(--color-text-600)]">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)] flex-shrink-0" />
                      <span className="leading-tight">
                        <span className="font-bold text-[var(--color-gold-700)]">
                          450+ santri
                        </span>{" "}
                        sudah terdaftar untuk TA 2026/2027
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ IMPROVED: Academic Structure - 2 cols mobile, 4 cols desktop */}
        <div className="animate-fadeInUp delay-600 px-4 sm:px-0">
          <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-[var(--color-cream-200)] p-5 sm:p-6 lg:p-8 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-1 sm:p-1.5 bg-[var(--color-gold-100)] rounded-xl shadow-md text-[var(--color-gold-600)]" />
                <span className="text-[var(--color-brown-800)]">
                  Perjalanan{" "}
                </span>
                <span className="text-gradient-gold">
                  Setahun Penuh Manfaat
                </span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[var(--color-text-600)] max-w-2xl mx-auto leading-relaxed">
                Setiap fase dirancang khusus untuk{" "}
                <span className="font-bold text-[var(--color-brown-700)]">
                  memaksimalkan potensi
                </span>{" "}
                anak Anda
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {academicStructure.map((item, idx) => (
                <div
                  key={idx}
                  className={`group p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 ${item.bgColor} ${item.borderColor} hover:shadow-lg hover:-translate-y-2 transition-all duration-300 active:scale-98 text-center cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${item.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white/50`}
                  >
                    <item.icon
                      className={`${item.iconColor} w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8`}
                    />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--color-text-900)] mb-1 group-hover:text-[var(--color-brown-700)] transition-colors duration-300 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-gradient-gold mb-1 sm:mb-2">
                    {item.period}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[var(--color-text-600)] font-medium leading-tight">
                    {item.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ IMPROVED: Final CTA - Fully responsive */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 animate-fadeInUp delay-800 px-4 sm:px-0">
          <div className="bg-gradient-to-r from-[var(--color-cream-200)] to-[var(--color-gold-100)] border-2 border-[var(--color-brown-200)] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 max-w-3xl mx-auto shadow-xl">
            <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 leading-tight">
              <span className="text-[var(--color-brown-900)]">
                Jangan Tunda Lagi!{" "}
              </span>
              <span className="text-gradient-gold">
                Amankan Kursi Anak Anda Sekarang
              </span>
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-text-700)] mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed">
              Hanya{" "}
              <span className="font-bold text-[var(--color-gold-700)]">
                50 kuota tersisa
              </span>{" "}
              dari 500 kursi. Ribuan orang tua tidak mau kehilangan kesempatan
              ini.{" "}
              <span className="font-bold text-[var(--color-brown-700)]">
                Bagaimana dengan Anda?
              </span>
            </p>
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
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Lihat Syarat & Cara Daftar</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 lg:py-6 border-2 border-[var(--color-teal-500)] text-[var(--color-teal-600)] hover:bg-[var(--color-teal-50)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
                asChild
              >
                <Link
                  href="/kontak"
                  className="flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Konsultasi Gratis Sekarang</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
