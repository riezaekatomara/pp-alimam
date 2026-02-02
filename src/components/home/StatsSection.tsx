"use client";

import { Calendar, Users, Award, GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/Container";

const STATS_DATA = [
  {
    icon: Calendar,
    value: "29+",
    label: "Tahun Mengabdi",
    sublabel: "Sejak 1995",
  },
  {
    icon: Users,
    value: "500+",
    label: "Santri Aktif",
    sublabel: "Putra",
  },
  {
    icon: Award,
    value: "A",
    label: "Akreditasi",
    sublabel: "MTs & MA",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "Tenaga Pendidik",
    sublabel: "Berpengalaman",
  },
] as const;

interface StatCardProps {
  icon: typeof Calendar;
  value: string;
  label: string;
  sublabel: string;
  index: number;
}

function StatCard({ icon: Icon, value, label, sublabel, index }: StatCardProps) {
  return (
    <div
      className="stat-card hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--color-brown-100)] flex items-center justify-center">
        <Icon className="w-6 h-6 text-[var(--color-brown-700)]" />
      </div>
      <p className="text-3xl md:text-4xl font-black text-[var(--color-brown-700)]">
        {value}
      </p>
      <p className="text-sm font-bold text-[var(--color-text-800)] mt-1">
        {label}
      </p>
      <p className="text-xs text-[var(--color-text-500)]">{sublabel}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-gradient-brown">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat, idx) => (
            <StatCard key={idx} {...stat} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
