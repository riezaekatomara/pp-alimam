"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  School,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-50 pt-12 pb-20 lg:pt-16 lg:pb-32">
      {/* Decorative Orbs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brown-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-10 lg:pt-0">

          {/* LEFT: Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-surface-200 shadow-sm text-brown-600 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 mb-4">
              <School className="w-4 h-4" />
              <span>Terakreditasi A • Sejak 1995</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-brown-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
              Pondok Pesantren <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-600 to-brown-800">Al-Imam Al-Islami</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Membangun generasi Rabbani yang berakhlak mulia, hafal Al-Qur'an, dan berwawasan global dengan kurikulum terpadu Syar'i dan Modern.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl bg-brown-900 hover:bg-brown-800 text-white text-base font-bold shadow-lg shadow-brown-900/20 w-full sm:w-auto"
                asChild
              >
                <Link href="/daftar">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-xl border-brown-200 text-brown-800 hover:bg-brown-50 text-base font-bold w-full sm:w-auto"
                asChild
              >
                <Link href="/program">
                  Lihat Program
                </Link>
              </Button>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-bold text-ink-500 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500" />
                <span>(0266) 734-5601</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <span>Senin - Sabtu, 08:00 - 16:00</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image Composition */}
          <div className="relative order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Main Image */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-clay-lg border-8 border-white bg-surface-100 aspect-[4/5] lg:aspect-square">
              <Image
                src="/images/hero.jpg"
                alt="Santri Al-Imam"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10">
                <div className="card-glass p-5 flex items-center gap-4 bg-white/95 backdrop-blur-xl">
                  <div className="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center text-brown-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-0.5">Pendaftaran Dibuka</p>
                    <p className="text-lg font-black text-brown-900">Tahun Ajaran 2026/2027</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-200/50 rounded-full blur-2xl animate-pulse" />
          </div>

        </div>
      </Container>
    </section>
  );
}
