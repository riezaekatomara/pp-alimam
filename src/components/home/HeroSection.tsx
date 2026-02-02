"use client";

import Link from "next/link";
import Image from "next/image";
// import ScrollAnimation from "@/components/ui/ScrollAnimation";
import {
  Phone,
  Calendar,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Clock,
  School,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const BENEFITS = [
  "Pendaftaran Online 24/7",
  "Biaya Dapat Dicicil",
  "Kuota Terbatas",
] as const;

const CONTACT_INFO = {
  phone: {
    display: "(0266) 734-5601",
    href: "tel:+622667345601",
  },
} as const;

function HeroBadge() {
  return (
    <div className="badge-outline">
      <School className="w-4 h-4" />
      <span>Akreditasi A - Berpengalaman Sejak 1995</span>
    </div>
  );
}

function HeroTitle() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="block text-[var(--color-text-900)]">Pesantren</span>
        <span className="block text-gradient-brown">Al-Imam </span>
        <span className="block text-gradient-brown">Al-Islami</span>
        <span className="block text-[var(--color-teal-600)] mt-2">Sukabumi</span>
      </h1>
    </div>
  );
}

function HeroDescription() {
  return (
    <p className="text-base sm:text-lg text-[var(--color-text-600)] leading-relaxed text-center lg:text-left">
      Membina generasi Qur'ani yang berakhlak mulia, berilmu luas, dan
      bermanfaat bagi umat dengan kurikulum terpadu Rabbani, Cendekia, dan
      Mandiri
    </p>
  );
}

function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Button
        size="lg"
        className="group bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-900)] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        asChild
      >
        <Link href="/daftar" className="inline-flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          <span>Daftar PPDB 2026/2027</span>
        </Link>
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="border-2 border-[var(--color-brown-600)] text-[var(--color-brown-700)] hover:bg-[var(--color-brown-50)] transition-all duration-300"
        asChild
      >
        <Link href="/ppdb" className="inline-flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span>Pelajari Lebih Lanjut</span>
        </Link>
      </Button>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[var(--color-text-600)]">
      <a
        href={CONTACT_INFO.phone.href}
        className="flex items-center gap-2 hover:text-[var(--color-brown-700)] transition-colors"
      >
        <Phone className="w-4 h-4 text-[var(--color-teal-600)]" />
        <span>{CONTACT_INFO.phone.display}</span>
      </a>
      <span className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-[var(--color-gold-600)]" />
        <span>Senin - Sabtu, 08:00 - 16:00</span>
      </span>
    </div>
  );
}

function RegistrationInfoCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-cream-200)] p-3 md:p-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        {/* Header - Left */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-brown-100)] flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-[var(--color-brown-700)]" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-text-900)] leading-tight text-base">
              PPDB 2026/2027
            </h3>
            <p className="text-xs text-[var(--color-teal-600)] font-bold uppercase tracking-wide flex items-center gap-1.5 align-middle">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
              <span>Dibuka!</span>
            </p>
          </div>
        </div>

        {/* Divider (Desktop) */}
        <div className="hidden md:block w-px h-8 bg-[var(--color-cream-200)]" />

        {/* Period - Middle */}
        <div className="w-full md:w-auto flex-1 min-w-0 bg-[var(--color-cream-50)] md:bg-transparent rounded-lg p-2 md:p-0 border md:border-0 border-[var(--color-cream-200)] text-center md:text-left">
          <div className="flex flex-col justify-center h-full">
            <p className="text-[10px] text-[var(--color-text-500)] font-medium mb-0.5">
              Periode Pendaftaran
            </p>
            <p className="font-bold text-[var(--color-text-900)] text-sm">
              9 Februari - 31 Juni 2026
            </p>
          </div>
        </div>

        {/* CTA - Right */}
        <div className="w-full md:w-auto flex-shrink-0">
          <Button
            className="w-full md:w-auto bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white px-5 h-10 text-xs font-bold rounded-lg uppercase tracking-wide"
            asChild
          >
            <Link href="/daftar" className="inline-flex items-center justify-center gap-2">
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src="/images/hero.jpg"
          alt="Santri Pondok Pesantren Al-Imam Al-Islami sedang belajar Al-Qur'an"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-cream-50)] via-white to-[var(--color-brown-50)] dark:via-[var(--color-cream-50)] dark:to-[var(--color-cream-100)] pt-12 pb-16 md:pt-20 md:pb-20">
      {/* Decorative Elements - Simplified */}
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-teal-200)] dark:bg-[var(--color-teal-900)] rounded-full blur-[100px] opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Text Content */}
          <div className="space-y-8">
            <div className="flex justify-center lg:justify-start">
              <HeroBadge />
            </div>
            <div className="text-center lg:text-left">
              <HeroTitle />
            </div>
            <div className="mx-auto lg:mx-0 max-w-lg">
              <HeroDescription />
            </div>
            <div className="flex justify-center lg:justify-start">
              <HeroCTA />
            </div>
            <div className="flex justify-center lg:justify-start">
              <ContactInfo />
            </div>
          </div>

          {/* RIGHT COLUMN - Image + Info Card */}
          <div className="relative">
            {/* Image - Visible on all screens, layout optimized */}
            <div className="relative z-0 block w-full">
              <HeroImage />
            </div>

            {/* Info Card - Landscape below image */}
            <div className="mt-6 md:mt-8 relative z-10 w-full">
              <RegistrationInfoCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
