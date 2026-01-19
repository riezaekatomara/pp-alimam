"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  BookHeart,
  CheckCircle,
  Trophy,
  Home,
  Target,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Image from "next/image";

export default function AboutSection() {
  // ✨ PERSUASIVE STATS - Benefit-Oriented
  const quickFacts = [
    {
      icon: Calendar,
      value: "29+",
      label: "Tahun Dipercaya",
      subtitle: "Ribuan Alumni Sukses",
      bgColor: "bg-[var(--color-brown-100)]",
      borderColor: "border-[var(--color-brown-100)]",
      iconColor: "text-[var(--color-brown-700)]",
      valueColor: "text-[var(--color-brown-700)]",
    },
    {
      icon: Users,
      value: "500+",
      label: "Santri Berprestasi",
      subtitle: "Hafidz & Akademis",
      bgColor: "bg-[var(--color-cream-200)]",
      borderColor: "border-[var(--color-cream-200)]",
      iconColor: "text-[var(--color-teal-500)]",
      valueColor: "text-[var(--color-teal-600)]",
    },
    {
      icon: GraduationCap,
      value: "50+",
      label: "Guru Berpengalaman",
      subtitle: "Lulusan Timur Tengah",
      bgColor: "bg-[var(--color-gold-50)]",
      borderColor: "border-[var(--color-gold-50)]",
      iconColor: "text-[var(--color-gold-500)]",
      valueColor: "text-[var(--color-gold-600)]",
    },
  ];

  // 🎯 FEATURES
  const features = [
    {
      icon: BookOpen,
      title: "Kitab Kuning",
      description: "Metode pembelajaran Salaf terbukti efektif",
      bgColor: "bg-[var(--color-brown-100)]",
      iconColor: "text-[var(--color-brown-700)]",
    },
    {
      icon: BookHeart,
      title: "Tahfidz Qur'an",
      description: "Target 30 Juz dengan metode terstruktur",
      bgColor: "bg-[var(--color-gold-50)]",
      iconColor: "text-[var(--color-gold-500)]",
    },
  ];

  // 💪 COMMITMENTS - Enhanced Visi Misi
  const visiMisi = [
    {
      icon: CheckCircle,
      label: "Jaminan Hafalan:",
      text: "Target 30 Juz dengan metode tahfidz terstruktur & terbukti efektif",
    },
    {
      icon: CheckCircle,
      label: "Pembinaan Akhlak:",
      text: "Pendampingan 24 jam untuk membentuk karakter Qur'ani yang kuat",
    },
    {
      icon: CheckCircle,
      label: "Prestasi Akademik:",
      text: "Kurikulum terintegrasi untuk persiapan pendidikan tinggi terbaik",
    },
  ];

  return (
    <Section
      id="about"
      className="animate-fadeInUp bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-gold-50)] relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Decorative blobs - ✅ Responsive sizing */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-8 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl sm:blur-3xl -z-0 bg-[var(--color-brown-100)]/30 animate-float" />
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-8 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-2xl sm:blur-3xl -z-0 bg-[var(--color-gold-50)]/30 animate-float delay-500" />

      <Container className="relative z-10">
        {/* ✅ IMPROVED: Section Header - Responsive text */}
        <div className="animate-fadeInDown text-center mb-8 sm:mb-10 md:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mb-2 sm:mb-3 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-600)] text-white shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">
              29 Tahun Membentuk Generasi Qur'ani
            </span>
          </div>

          {/* Title - ✅ Better mobile sizing */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 leading-tight px-4 sm:px-0">
            <span className="block text-[var(--color-brown-800)] mb-1">
              Mengapa Ribuan Orang Tua
            </span>
            <span className="block">
              <span className="text-gradient-gold">Mempercayakan Anak</span>
              <span className="text-[var(--color-brown-800)]"> Kepada </span>
              <span className="text-gradient-teal">Kami?</span>
            </span>
          </h2>

          {/* Subtitle - ✅ Responsive text */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-text-600)] max-w-2xl mx-auto px-4 sm:px-0">
            Bukan sekadar pesantren, kami{" "}
            <span className="font-bold text-[var(--color-brown-700)]">
              mitra terpercaya
            </span>{" "}
            Anda
          </p>
        </div>

        {/* ✅ IMPROVED: Better gap scaling */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Image + Quick Facts + Features + CTA */}
          <div className="lg:w-1/2 animate-fadeInLeft delay-200 flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* Image with Badge - ✅ Responsive height */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group border-2 sm:border-4 border-white/80 hover:shadow-2xl transition-all duration-500 active:scale-98">
              {/* Next.js Image Component */}
              <div className="relative w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px]">
                <Image
                  src="/images/about.jpg"
                  alt="Pondok Pesantren Al-Hidayah"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown-900)]/30 via-transparent/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
              </div>

              {/* Enhanced Badge - ✅ Responsive sizing */}
              <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 inline-flex flex-col gap-1.5 sm:gap-2 z-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-bold shadow-lg backdrop-blur-sm bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-500)]">
                  <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Terakreditasi A</span>
                </div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-bold shadow-lg backdrop-blur-sm bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Dipercaya Sejak 1995</span>
                </div>
              </div>
            </div>

            {/* Quick Facts - ✅ Responsive grid & sizing */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {quickFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className={`group text-center p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border hover:shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 active:scale-98 ${fact.bgColor} ${fact.borderColor}`}
                >
                  <fact.icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 mx-auto ${fact.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <p
                    className={`text-lg sm:text-xl md:text-2xl font-black mb-0.5 sm:mb-1 ${fact.valueColor}`}
                  >
                    {fact.value}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--color-text-700)] mb-0.5 leading-tight">
                    {fact.label}
                  </p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-[var(--color-text-500)] leading-tight">
                    {fact.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Features Grid - ✅ Stack on mobile, 2 cols on larger */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-white/80 border border-[var(--color-cream-200)] rounded-xl sm:rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-98"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 flex-shrink-0`}
                  >
                    <feature.icon
                      className={`${feature.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base text-[var(--color-text-900)] mb-0.5 sm:mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[var(--color-text-600)] text-xs sm:text-sm leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dual CTA Buttons - ✅ Full width on mobile */}
            <div className="animate-fadeInRight delay-500 space-y-2.5 sm:space-y-3">
              {/* Primary: Info Lengkap Tentang Kami */}
              <Button
                size="lg"
                variant="outline"
                className="w-full shadow-md hover:shadow-lg border-2 border-[var(--color-teal-600)] text-[var(--color-teal-700)] font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl hover:bg-[var(--color-teal-50)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group min-h-[44px]"
                asChild
              >
                <Link
                  href="/tentang"
                  className="flex items-center justify-center gap-2"
                >
                  <i className="fas fa-info-circle text-xs sm:text-sm" />
                  <span className="whitespace-nowrap">
                    Selengkapnya Tentang Kami
                  </span>
                  <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              {/* Secondary: PPDB Info */}
              <Button
                size="lg"
                className="w-full shadow-lg hover:shadow-xl text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-950)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group min-h-[44px]"
                asChild
              >
                <Link
                  href="/ppdb"
                  className="flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Lihat Syarat & Jadwal PPDB</span>
                </Link>
              </Button>

              {/* Soft Urgency - ✅ Smaller text on mobile */}
              <p className="text-[10px] sm:text-xs text-center text-[var(--color-text-500)]">
                <span className="font-bold text-[var(--color-gold-700)]">
                  50 kuota tersisa
                </span>{" "}
                untuk tahun ajaran 2026/2027
              </p>
            </div>
          </div>

          {/* Right Column: Description + Visi Misi */}
          <div className="lg:w-1/2 animate-fadeInRight delay-300 flex flex-col">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-1 flex flex-col">
              {/* Description - ✅ Responsive text */}
              <div className="space-y-2.5 sm:space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-900)]">
                  Lebih dari Sekadar Pesantren
                </h3>

                <p className="text-[var(--color-text-600)] text-sm sm:text-base leading-relaxed">
                  Sejak{" "}
                  <span className="font-bold text-[var(--color-brown-700)]">
                    1995
                  </span>
                  , kami telah membantu{" "}
                  <span className="font-bold text-[var(--color-teal-700)]">
                    ribuan orang tua
                  </span>{" "}
                  mewujudkan impian: anak yang berakhlak mulia, hafal Al-Qur'an,
                  dan berprestasi.
                </p>

                <p className="text-[var(--color-text-600)] text-sm sm:text-base leading-relaxed">
                  Kami memahami kekhawatiran Anda tentang pergaulan anak di era
                  digital. Itulah mengapa kami ciptakan{" "}
                  <span className="font-bold text-[var(--color-brown-700)]">
                    lingkungan Islami 24/7
                  </span>{" "}
                  dengan pengawasan ketat namun penuh kasih sayang.
                </p>
              </div>

              {/* Visi Misi Card - ✅ Responsive padding */}
              <div className="flex-1 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border bg-gradient-to-br from-[var(--color-cream-200)] to-[var(--color-gold-50)] border-[var(--color-brown-100)] shadow-lg flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-brown-700)] rounded-lg p-1.5 bg-white/50" />
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-gradient-brown">
                    Komitmen Kami untuk Anak Anda
                  </h3>
                </div>
                <div className="space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-center">
                  {visiMisi.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/70 hover:bg-white hover:shadow-sm transition-all duration-300 active:scale-98"
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[var(--color-gold-500)] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-[var(--color-text-800)] block mb-0.5">
                          {item.label}
                        </span>
                        <span className="text-[var(--color-text-600)] text-xs sm:text-sm leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badge at Bottom - ✅ Responsive */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--color-brown-200)]/30">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[var(--color-text-500)]">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)]" />
                    <span className="font-medium text-center">
                      Dipercaya ribuan orang tua se-Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
