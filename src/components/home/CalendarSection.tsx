"use client";

import Link from "next/link";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const IMPORTANT_DATES = [
  {
    date: "15 Juli 2026",
    title: "Mulai Tahun Ajaran",
    description: "Awal perjalanan santri baru di lingkungan pesantren",
    color: "gold",
  },
  {
    date: "22 Juli 2026",
    title: "Pengajian Umum",
    description: "Pertemuan orang tua dan pengenalan sistem pendidikan",
    color: "brown",
  },
  {
    date: "17-20 Ramadhan",
    title: "Munasabah Al-Qur'an",
    description: "Program intensif tahfidz selama bulan Ramadhan",
    color: "teal",
  },
] as const;

const ACADEMIC_TIMELINE = [
  {
    icon: BookOpen,
    title: "Semester 1",
    period: "Juli - Des 2026",
    color: "gold",
  },
  {
    icon: BookOpen,
    title: "Semester 2",
    period: "Jan - Jun 2027",
    color: "brown",
  },
  {
    icon: GraduationCap,
    title: "Wisuda",
    period: "Juni 2027",
    color: "teal",
  },
] as const;

function DateCard({
  date,
  title,
  description,
  color,
}: (typeof IMPORTANT_DATES)[number]) {
  const colorClasses = {
    gold: "bg-[var(--color-gold-100)] text-[var(--color-gold-700)]",
    brown: "bg-[var(--color-brown-100)] text-[var(--color-brown-700)]",
    teal: "bg-[var(--color-teal-100)] text-[var(--color-teal-700)]",
  };

  return (
    <div className="card-modern p-5">
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${colorClasses[color]}`}
      >
        {date}
      </span>
      <h4 className="font-bold text-[var(--color-text-900)] mb-1">{title}</h4>
      <p className="text-sm text-[var(--color-text-600)]">{description}</p>
    </div>
  );
}

function TimelineCard({
  icon: Icon,
  title,
  period,
  color,
}: (typeof ACADEMIC_TIMELINE)[number]) {
  const colorClasses = {
    gold: {
      bg: "bg-[var(--color-gold-100)]",
      icon: "text-[var(--color-gold-600)]",
    },
    brown: {
      bg: "bg-[var(--color-brown-100)]",
      icon: "text-[var(--color-brown-600)]",
    },
    teal: {
      bg: "bg-[var(--color-teal-100)]",
      icon: "text-[var(--color-teal-600)]",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div
        className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-3`}
      >
        <Icon className={`w-7 h-7 ${colors.icon}`} />
      </div>
      <h4 className="font-bold text-[var(--color-text-900)] mb-1">{title}</h4>
      <p className="text-sm text-[var(--color-text-600)]">{period}</p>
    </div>
  );
}

export default function CalendarSection() {
  return (
    <section
      id="kalender"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-[var(--color-cream-50)]"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-accent inline-flex mb-4">
            <Calendar className="w-4 h-4" />
            <span>Kalender Akademik</span>
          </div>
          <h2 className="section-title mb-3">
            Tahun Ajaran <span className="text-gradient-gold">2026/2027</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Jadwal penting yang perlu diketahui orang tua dan calon santri
          </p>
        </div>

        {/* Important Dates */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {IMPORTANT_DATES.map((item, idx) => (
            <DateCard key={idx} {...item} />
          ))}
        </div>

        {/* Academic Timeline */}
        <div className="card-modern p-6 md:p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-2">
              Timeline Akademik
            </h3>
            <p className="text-sm text-[var(--color-text-600)]">
              Struktur tahun ajaran untuk memaksimalkan pembelajaran santri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACADEMIC_TIMELINE.map((item, idx) => (
              <TimelineCard key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-[var(--color-cream-100)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-2">
              Lihat Kalender Lengkap
            </h3>
            <p className="text-sm text-[var(--color-text-600)] mb-6">
              Unduh kalender akademik atau lihat jadwal lengkap secara online
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white"
                asChild
              >
                <Link
                  href="/agenda"
                  className="inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lihat Kalender</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-[var(--color-gold-500)] text-[var(--color-gold-700)] hover:bg-[var(--color-gold-50)]"
                asChild
              >
                <Link
                  href="/uploads/kalender-2026-2027.pdf"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh PDF</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
