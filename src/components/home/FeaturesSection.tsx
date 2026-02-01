"use client";

import Link from "next/link";
import { BookOpen, Award, Users, BookOpenCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Kurikulum Terintegrasi",
    description:
      "Pendidikan formal MTs/MA terintegrasi dengan kurikulum pesantren tahfidz dan kitab kuning",
    color: "brown",
  },
  {
    icon: Award,
    title: "Terakreditasi A",
    description:
      "Lembaga pendidikan formal MTs dan MA terakreditasi A oleh BAN-S/M dengan standar nasional",
    color: "gold",
  },
  {
    icon: Users,
    title: "Tenaga Pendidik Berpengalaman",
    description:
      "Dibimbing oleh 50+ ustadz dan ustadzah berpengalaman di bidang tahfidz dan ilmu syar'i",
    color: "teal",
  },
  {
    icon: BookOpenCheck,
    title: "Program Tahfidz 30 Juz",
    description:
      "Program hafalan Al-Qur'an dengan metode mutqin, sanad jelas, dan bimbingan intensif harian",
    color: "brown",
  },
] as const;

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: typeof BookOpen;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const colorClasses = {
    brown: {
      iconBg: "bg-[var(--color-brown-100)]",
      iconColor: "text-[var(--color-brown-700)]",
    },
    gold: {
      iconBg: "bg-[var(--color-gold-100)]",
      iconColor: "text-[var(--color-gold-600)]",
    },
    teal: {
      iconBg: "bg-[var(--color-teal-100)]",
      iconColor: "text-[var(--color-teal-600)]",
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <div
      className="card-modern p-6 text-center hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${colors.iconBg} flex items-center justify-center`}
      >
        <Icon className={`w-7 h-7 ${colors.iconColor}`} />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-text-900)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-600)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="keunggulan"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-[var(--color-cream-50)]"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-outline inline-flex mb-4">
            <Award className="w-4 h-4" />
            <span>Keunggulan Kami</span>
          </div>
          <h2 className="section-title mb-3">
            Mengapa Memilih{" "}
            <span className="text-gradient-brown">Al-Imam?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Program pendidikan berkualitas dengan kurikulum terintegrasi untuk
            mencetak generasi Qur'ani yang berakhlak mulia
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} index={idx} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[var(--color-cream-100)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-2">
              Tertarik Bergabung?
            </h3>
            <p className="text-sm text-[var(--color-text-600)] mb-6">
              Pelajari informasi pendaftaran santri baru tahun ajaran 2026/2027
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
                className="border-[var(--color-teal-600)] text-[var(--color-teal-700)] hover:bg-[var(--color-teal-50)]"
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
