"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Calendar,
  Award,
  Users,
  GraduationCap,
  Target,
  BookOpen,
  School,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const STATS_DATA = [
  {
    icon: Calendar,
    value: "29+",
    label: "Tahun Dipercaya",
    subtitle: "Ribuan Alumni Sukses",
    color: "#6B4423",
    bgColor: "#F5E6D3",
  },
  {
    icon: Users,
    value: "500+",
    label: "Santri Berprestasi",
    subtitle: "Hafidz & Akademis",
    color: "#0F766E",
    bgColor: "#CCFBF1",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "Guru Berpengalaman",
    subtitle: "Lulusan Timur Tengah",
    color: "#DAA520",
    bgColor: "#FFF9E6",
  },
  {
    icon: Award,
    value: "A",
    label: "Akreditasi A",
    subtitle: "Standar Nasional",
    color: "#6B4423",
    bgColor: "#F5E6D3",
  },
] as const;

const CONTACT_INFO = {
  phone: {
    display: "(0266) 734-5601",
    href: "tel:+622667345601",
  },
} as const;

function AccreditationBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-md bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-600)] text-white">
      <School className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      <span className="whitespace-nowrap">
        Terakreditasi A - Terpercaya Sejak 1995
      </span>
    </div>
  );
}

function HeroTitle() {
  return (
    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] lg:text-start xl:text-5xl font-bold leading-tight lg:leading-15 text-left sm:text-justify">
      <span className="block text-[var(--color-brown-800)] mb-1">
        Mencetak Generasi
      </span>
      <span className="block mb-1">
        <span className="text-gradient-brown">Muslim yang Rabbani,</span>
      </span>
      <span className="block">
        <span className="text-gradient-teal text-[22px] lg:text-[44px]">
          Berilmu, dan{" "}
        </span>
        <span className="text-gradient-gold text-[22px] lg:text-[44px]">
          Bermanfaat
        </span>
      </span>
    </h1>
  );
}

function HeroTagline() {
  return (
    <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-[var(--color-text-700)] leading-relaxed font-medium max-w-2xl text-justify">
      <span className="text-[var(--color-brown-800)]">
        Khawatir Akhlak Anak di Zaman Sekarang?{" "}
      </span>
      <span className="text-[var(--color-teal-700)]">Percayakan</span>
      <span className="text-[var(--color-brown-800)]">
        {" "}
        pada Pesantren yang{" "}
      </span>
      <span className="text-[var(--color-gold-700)] font-bold">
        Sudah 29 Tahun
      </span>
      <span className="text-[var(--color-brown-800)]"> Membentuk </span>
      <span className="text-[var(--color-brown-700)] font-bold">
        Ribuan Generasi Qur'ani!
      </span>
    </p>
  );
}

function HeroDescription() {
  return (
    <div className="space-y-2 sm:space-y-2.5 max-w-xl text-justify">
      <p className="text-[var(--color-text-700)] text-sm sm:text-base lg:text-lg leading-relaxed">
        Al-Imam Al-Islami{" "}
        <span className="text-[var(--color-brown-700)] font-bold">
          bukan sekadar pesantren biasa
        </span>
        . Kami memahami kekhawatiran Bapak/Ibu di era digital ini.
      </p>

      {/* 7 BENEFITS */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-teal-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Hafalan Al-Qur'an 30 Juz dengan metode terbukti
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brown-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Pendidikan formal setara SMP/SMA terakreditasi
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <School className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Pembinaan akhlak 24 jam oleh ustadz berpengalaman
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-teal-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Alumni diterima di universitas dalam & luar negeri
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brown-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Lingkungan Islami 100% dengan pengawasan ketat
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Kurikulum terintegrasi: Agama + Akademik + Karakter
          </span>
        </div>
        <div className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-600)]">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-teal-600)] flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            Laporan perkembangan santri rutin setiap bulan ke orang tua
          </span>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: typeof Calendar;
  value: string;
  label: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

function StatCard({
  icon: Icon,
  value,
  label,
  subtitle,
  color,
  bgColor,
}: StatCardProps) {
  return (
    <div className="group bg-white rounded-lg p-2.5 sm:p-3 shadow-md border border-[var(--color-cream-200)] hover:shadow-lg hover:border-[var(--color-teal-200)] transition-all duration-300 hover:-translate-y-1 active:scale-95">
      <div className="flex flex-col items-center text-center space-y-0.5 sm:space-y-1">
        <div
          className="rounded-lg p-1 sm:p-1.5 transition-all duration-300 group-hover:shadow-md"
          style={{ backgroundColor: bgColor }}
        >
          <Icon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color }}
            aria-hidden="true"
          />
        </div>
        <p className="text-lg sm:text-xl font-bold text-[var(--color-text-900)] leading-tight">
          {value}
        </p>
        <p className="text-[9px] sm:text-[10px] font-semibold text-[var(--color-text-700)] leading-tight">
          {label}
        </p>
        <p className="text-[8px] sm:text-[9px] text-[var(--color-text-500)] leading-tight">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="lg:relative lg:bottom-11 space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {STATS_DATA.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[var(--color-text-500)] bg-[var(--color-cream-100)] rounded-lg p-2 sm:p-2.5">
        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)] flex-shrink-0" />
        <span className="font-medium text-center leading-snug">
          Dipercaya ribuan orang tua se-Indonesia
        </span>
      </div>
    </div>
  );
}

function FloatingContactCard() {
  return (
    <div className="lg:relative lg:bottom-9 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-3.5 sm:p-4 hover:shadow-[0_20px_50px_-12px_rgba(15,118,110,0.4)] transition-all duration-300 border-2 border-[var(--color-cream-200)] hover:border-[var(--color-teal-400)] active:scale-95">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br from-[var(--color-brown-700)] to-[var(--color-gold-600)]">
          <Phone
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            aria-hidden="true"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs text-[var(--color-text-500)] font-medium mb-0.5 sm:mb-1">
            Konsultasi Langsung
          </p>

          <a
            href={CONTACT_INFO.phone.href}
            className="text-sm sm:text-base font-bold text-[var(--color-text-900)] hover:text-[var(--color-brown-700)] transition-colors duration-300 block mb-1 sm:mb-1.5"
          >
            {CONTACT_INFO.phone.display}
          </a>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-[9px] sm:text-[10px] text-green-600 font-medium whitespace-nowrap">
              Online Sekarang
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(15,118,110,0.3)] transition-all duration-500 group">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
        <Image
          src="/images/hero.jpg"
          alt="Santri Pondok Pesantren Al-Imam Al-Islami sedang belajar Al-Qur'an"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-brown-900)]/10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function DecorativeElements() {
  return (
    <>
      <div
        className="absolute top-20 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[var(--color-teal-200)] rounded-full blur-2xl sm:blur-3xl opacity-20 animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-[var(--color-gold-200)] rounded-full blur-2xl sm:blur-3xl opacity-20 animate-float delay-500"
        aria-hidden="true"
      />
    </>
  );
}

// ✅ NEW: Combined CTA Section with proper layout
function CTASection() {
  return (
    <div className="space-y-4">
      {/* ✅ Desktop: Side by side | Mobile: Stacked */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4">
        {/* Left: CTA Button + Date Info */}
        <div className="lg:flex-1 space-y-3">
          <Button
            size="lg"
            className="lg:relative lg:bottom-2 group shadow-lg hover:shadow-xl text-white font-semibold transition-all duration-300 hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-900)] w-full"
            asChild
          >
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                Pelajari PPDB 2026/2027
              </span>
            </Link>
          </Button>

          {/* Date info below button */}
          <p className="lg:relative lg:left-3 lg:bottom-3 text-[10px] sm:text-xs text-[var(--color-text-500)] flex items-center gap-1.5 justify-center lg:justify-start">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-gold-600)] flex-shrink-0" />
            <span className="font-medium text-[var(--color-gold-700)]">
              Pendaftaran dibuka hingga 31 Maret 2026
            </span>
          </p>
        </div>

        {/* Right: Contact Card (Desktop only, hidden on mobile) */}
        <div className="hidden lg:block lg:w-[280px] flex-shrink-0">
          <FloatingContactCard />
        </div>
      </div>

      {/* ✅ Mobile: Contact Card shown separately below */}
      <div className="lg:hidden">
        <FloatingContactCard />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[var(--color-cream-50)] via-white to-[var(--color-brown-50)] pt-6 pb-8 xs:pt-8 xs:pb-10 sm:pt-8 sm:pb-12 md:pt-8 md:pb-16 lg:pt-8 lg:pb-10"
      aria-label="Hero Section - Pondok Pesantren Al-Imam Al-Islami"
    >
      <DecorativeElements />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN - Text Content */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-5 animate-fadeInUp">
            <AccreditationBadge />
            <HeroTitle />
            <HeroTagline />
            <HeroDescription />
          </div>

          {/* RIGHT COLUMN - Image + CTA + Stats */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 animate-fadeInRight">
            <HeroImage />
            <CTASection />
            <StatsGrid />
          </div>
        </div>
      </Container>
    </section>
  );
}
