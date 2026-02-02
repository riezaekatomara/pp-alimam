"use client";

import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const BENEFITS = [
  "Kurikulum terpadu Rabbani, Cendekia, dan Mandiri yang terbukti efektif",
  "Terakreditasi A (BAN SM) dengan standar nasional",
  "Kerjasama dengan universitas Islam di 3 benua (Asia, Afrika, Eropa)",
  "Pengajar berkualitas dan berpengalaman",
  "Fasilitas lengkap dan lokasi strategis",
  "Biaya pendidikan terjangkau dengan sistem cicilan",
] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-[var(--color-cream-50)]"
    >
      <Container>
        {/* Why Choose Us Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Vision Card */}
          <div className="card-modern p-8">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brown-100)] flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-[var(--color-brown-700)]" />
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text-900)] mb-4">
              Visi Kami
            </h3>
            <p className="text-[var(--color-text-600)] leading-relaxed mb-6">
              Menjadi lembaga pendidikan Islam terkemuka yang menghasilkan
              generasi Qur'ani, berakhlak mulia, berilmu luas, dan bermanfaat
              bagi umat
            </p>

            <div className="pt-4 border-t border-[var(--color-cream-200)]">
              <p className="text-xs text-[var(--color-text-500)]">Managed By:</p>
              <p className="text-sm font-bold text-[var(--color-brown-700)]">
                Yayasan Al-Imam Al-Islami
              </p>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full border-2 border-[var(--color-brown-600)] text-[var(--color-brown-700)] hover:bg-[var(--color-brown-50)]"
                asChild
              >
                <Link href="/tentang" className="inline-flex items-center justify-center gap-2">
                  <span>Profil Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Benefits List */}
          <div>
            <div className="badge-outline inline-flex mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>Mengapa Kami?</span>
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text-900)] mb-2">
              Alasan Memilih Pesantren Al-Imam
            </h3>
            <p className="text-[var(--color-text-600)] mb-6">
              Berbagai keunggulan yang menjadikan kami pilihan terbaik untuk
              pendidikan putra Anda
            </p>

            <div className="space-y-4 mb-8">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-teal-500)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--color-text-700)]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white"
              asChild
            >
              <Link href="/tentang" className="inline-flex items-center gap-2">
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
