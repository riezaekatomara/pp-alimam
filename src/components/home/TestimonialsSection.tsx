"use client";

import Link from "next/link";
import { MessageCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const TESTIMONIALS = [
  {
    name: "Bapak H. Ahmad Rifa'i",
    role: "Wali Santri MTs Al-Imam",
    initial: "A",
    quote:
      "Perubahan akhlak anak saya luar biasa sejak mondok di sini. Dari yang susah disuruh sholat, sekarang malah ngingetin kami sekeluarga waktu sholat.",
  },
  {
    name: "Ibu Siti Fatimah, S.Pd",
    role: "Wali Santri MA Al-Imam",
    initial: "S",
    quote:
      "Saya guru, jadi saya tahu bedanya pendidikan biasa dengan yang di Al-Imam. Anak saya hafal Qur'an PLUS ranking 3 di kelas. Dua-duanya dapat!",
  },
  {
    name: "Bapak Drs. Muhammad Yusuf",
    role: "Wali Santri Tahfidz",
    initial: "M",
    quote:
      "Awalnya cuma hafal 3 juz, sekarang sudah 15 juz dalam 2 tahun. Bacaannya tartil, artinya paham pula. Ini hasil nyata, bukan janji kosong.",
  },
  {
    name: "Keluarga Bapak Abdullah",
    role: "Wali 3 Santri Al-Imam",
    initial: "A",
    quote:
      "3 anak kami semua di sini, dari SMP sampai SMA. Biaya lebih murah dari sekolah swasta plus dapat asrama, makan, dan bimbingan 24 jam.",
  },
] as const;

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 text-[var(--color-gold-400)] fill-[var(--color-gold-400)]"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  initial,
  quote,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="testimonial-card">
      <StarRating />

      <blockquote className="text-[var(--color-text-700)] leading-relaxed italic mb-6">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-cream-200)]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-brown-600)] to-[var(--color-brown-800)] flex items-center justify-center text-white font-bold text-lg">
          {initial}
        </div>
        <div>
          <p className="font-bold text-[var(--color-text-900)]">{name}</p>
          <p className="text-sm text-[var(--color-text-500)]">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 bg-gradient-to-b from-[var(--color-cream-50)] to-white"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-primary inline-flex mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>Testimoni</span>
          </div>
          <h2 className="section-title mb-3">
            Apa Kata <span className="text-gradient-gold">Orang Tua?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Dengarkan langsung dari para orang tua yang sudah melihat perubahan
            nyata pada anak mereka
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-[var(--color-cream-100)] rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-[var(--color-text-700)] mb-6">
              <span className="font-bold text-[var(--color-brown-700)]">
                500+ keluarga
              </span>{" "}
              sudah mempercayakan pendidikan putra mereka kepada kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white"
                asChild
              >
                <Link href="/ppdb" className="inline-flex items-center gap-2">
                  <span>Info PPDB Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-[var(--color-gold-500)] text-[var(--color-gold-700)] hover:bg-[var(--color-gold-50)]"
                asChild
              >
                <Link href="#kontak" className="inline-flex items-center gap-2">
                  <span>Hubungi Kami</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
