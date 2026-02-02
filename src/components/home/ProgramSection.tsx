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

const PROGRAMS = [
    {
        title: "MTs (Madrasah Tsanawiyah)",
        subtitle: "Program pendidikan setara SMP dengan kurikulum pesantren terpadu",
        features: [
            "Tahfidz Al-Qur'an",
            "Kajian Kitab Kuning",
            "Bahasa Arab & Inggris",
        ],
        quotaPutra: "30 Siswa",
        quotaPutri: "-",
        bgClass: "program-card-brown",
    },
    {
        title: "I'dadiyah Lughawiy",
        subtitle: "Program persiapan MA selama 1 tahun untuk memantapkan kemampuan bahasa Arab",
        features: [
            "Intensif Bahasa Arab",
            "Persiapan Masuk MA",
            "Pemantapan Dasar Islam",
        ],
        quotaPutra: "30 Siswa",
        quotaPutri: "-",
        bgClass: "program-card-gold",
    },
    {
        title: "MA (Madrasah Aliyah)",
        subtitle: "Jenjang pendidikan setara SMA dengan pembelajaran full bahasa Arab",
        features: [
            "Kurikulum Berbahasa Arab",
            "Kajian Kitab Kuning",
            "Sains & Keagamaan",
        ],
        quotaPutra: "30 Siswa",
        quotaPutri: "-",
        bgClass: "program-card-teal",
    },
] as const;

function ProgramCard({
    title,
    subtitle,
    features,
    quotaPutra,
    quotaPutri,
    bgClass,
}: (typeof PROGRAMS)[number]) {
    return (
        <div className={`${bgClass} h-full`}>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-white/80 text-sm mb-6">{subtitle}</p>

            <div className="space-y-2 mb-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/20">
                <div>
                    <p className="text-xs text-white/90 font-medium">Kuota Putra</p>
                    <p className="text-sm font-bold bg-black/20 text-white px-3 py-1 rounded-full mt-1 border border-white/10">
                        {quotaPutra}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-white/90 font-medium">Kuota Putri</p>
                    <p className="text-sm font-bold bg-black/20 text-white px-3 py-1 rounded-full mt-1 border border-white/10">
                        {quotaPutri}
                    </p>
                </div>
            </div>

            {/* Link to Program Detail Page */}
            <div className="mt-6 pt-4 border-t border-white/20">
                <Button
                    variant="secondary"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                    asChild
                >
                    <Link href="/program">
                        <span>Pelajari Lebih Lanjut</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default function ProgramSection() {
    return (
        <section id="program" className="py-16 md:py-20 bg-white">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="badge-teal inline-flex mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Program Unggulan</span>
                    </div>
                    <h2 className="section-title mb-3">Program Pendidikan</h2>
                    <p className="section-subtitle mx-auto">
                        Tiga program pendidikan berkualitas dengan kuota terbatas
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {PROGRAMS.map((program, idx) => (
                        <ProgramCard key={idx} {...program} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
