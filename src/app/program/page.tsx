"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    BookOpen,
    GraduationCap,
    CheckCircle,
    Users,
    Clock,
    Calendar,
    ArrowRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

// Program Data
const PROGRAMS = [
    {
        id: "mts",
        name: "MTs Al-Imam",
        fullName: "Madrasah Tsanawiyah Al-Imam",
        description: "Program pendidikan setara SMP dengan paduan kurikulum Nasional (Kemenag) dan Kepesantrenan untuk membentuk karakter santri yang berakhlak mulia dan berwawasan luas.",
        stats: [
            { label: "Masa Studi", value: "3 Tahun" },
            { label: "Target Hapalan", value: "5 Juz" },
            { label: "Bahasa", value: "Arab & Inggris" },
        ],
        curriculum: [
            "Tahfidz Al-Qur'an (Target 5 Juz Mutqin)",
            "Bahasa Arab (Nahwu, Shorof, Muhadatsah)",
            "Kajian Kitab Kuning Dasar (Fiqh, Aqidah, Akhlaq)",
            "Kurikulum Nasional (Matematika, IPA, B.Indo, B.Inggris)",
            "Ekstrakurikuler (Pramuka, Silat, Panahan, Futsal)",
        ],
        image: "/images/hero.jpg", // Placeholder
        color: "brown",
    },
    {
        id: "il",
        name: "I'dad Lughowi",
        fullName: "Program I'dad Lughowi (Persiapan Bahasa)",
        description: "Program intensif satu tahun khusus pembelajaran Bahasa Arab dan dasar-dasar ilmu syar'i sebagai persiapan masuk jenjang MA atau perguruan tinggi Timur Tengah.",
        stats: [
            { label: "Masa Studi", value: "1 Tahun" },
            { label: "Fokus", value: "Bahasa Arab" },
            { label: "Target", value: "Mahir Baca Kitab" },
        ],
        curriculum: [
            "Intensif Bahasa Arab (Durusul Lughah, Nahwu, Shorof)",
            "Tahsin & Tahfidz Al-Qur'an",
            "Fiqh Ibadah Praktis",
            "Aqidah Dasar",
            "Praktek Ibadah Harian",
        ],
        image: "/images/hero.jpg", // Placeholder
        color: "gold",
    },
    {
        id: "ma",
        name: "MA Al-Imam",
        fullName: "Madrasah Aliyah Al-Imam",
        description: "Jenjang pendidikan menengah atas dengan pilihan jurusan IPA dan Keagamaan, disiapkan untuk melanjutkan ke perguruan tinggi ternama baik di dalam maupun luar negeri.",
        stats: [
            { label: "Masa Studi", value: "3 Tahun" },
            { label: "Target Hapalan", value: "10+ Juz" },
            { label: "Jurusan", value: "IPA & Agama" },
        ],
        curriculum: [
            "Tahfidz Al-Qur'an Lanjutan",
            "Kajian Kitab Kuning Menengah-Lanjut (Fathul Qorib, Bulughul Maram)",
            "Ujian Nasional & persiapan SBMPTN/Timur Tengah",
            "Leadership & Public Speaking (Muhadhoroh)",
            "Riset & Karya Tulis Ilmiah",
        ],
        image: "/images/hero.jpg", // Placeholder
        color: "teal",
    },
];

export default function ProgramPage() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = PROGRAMS.map(p => ({
                id: p.id,
                element: document.getElementById(p.id)
            }));

            // "Center of Viewport" Strategy
            // We consider the "active" section to be the one that occupies the middle of the screen.
            const scrollPosition = window.scrollY + (window.innerHeight / 2);

            for (const section of sections) {
                if (section.element) {
                    const top = section.element.offsetTop;
                    const height = section.element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                        return;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="bg-[var(--color-cream-50)] min-h-screen pt-20">
            {/* Header Section */}
            <section className="bg-[var(--color-brown-900)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat" />
                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white">
                        Program Pendidikan
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-cream-200)] max-w-2xl mx-auto">
                        Membangun generasi unggul dengan kurikulum terpadu yang menyeimbangkan ilmu dunia dan akhirat.
                    </p>
                </Container>
            </section>

            {/* Navigation Tabs (Sticky) */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-cream-200)] shadow-sm">
                <Container>
                    <div className="flex justify-center gap-4 py-4 overflow-x-auto">
                        <a
                            href="#mts"
                            className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap
                             ${activeSection === 'mts'
                                    ? 'bg-[var(--color-brown-700)] text-white'
                                    : 'bg-[var(--color-cream-100)] text-[var(--color-brown-800)] hover:bg-[var(--color-brown-100)]'}
                           `}
                        >
                            MTs Al-Imam
                        </a>
                        <a
                            href="#il"
                            className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap
                             ${activeSection === 'il'
                                    ? 'bg-[var(--color-gold-500)] text-white'
                                    : 'bg-[var(--color-cream-100)] text-[var(--color-brown-800)] hover:bg-[var(--color-gold-50)] hover:text-[var(--color-gold-700)]'}
                           `}
                        >
                            I'dad Lughowi
                        </a>
                        <a
                            href="#ma"
                            className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap
                             ${activeSection === 'ma'
                                    ? 'bg-[var(--color-teal-600)] text-white'
                                    : 'bg-[var(--color-cream-100)] text-[var(--color-brown-800)] hover:bg-[var(--color-teal-50)] hover:text-[var(--color-teal-700)]'}
                           `}
                        >
                            MA Al-Imam
                        </a>
                    </div>
                </Container>
            </div>

            <div className="space-y-24 py-16">
                {PROGRAMS.map((program, idx) => (
                    <section key={program.id} id={program.id} className="scroll-mt-32">
                        <Container>
                            <div className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

                                {/* Text Content */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-semibold
                    ${program.color === 'brown' ? 'bg-[var(--color-brown-100)] text-[var(--color-brown-700)]' :
                                            program.color === 'teal' ? 'bg-[var(--color-teal-100)] text-[var(--color-teal-700)]' :
                                                'bg-[var(--color-gold-100)] text-[var(--color-gold-700)]'}
                  `}>
                                        <GraduationCap className="w-5 h-5" />
                                        <span>{program.name}</span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-900)] mb-6">
                                        {program.fullName}
                                    </h2>
                                    <p className="text-[var(--color-text-600)] text-lg leading-relaxed mb-8">
                                        {program.description}
                                    </p>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {program.stats.map((stat, statIdx) => (
                                            <div key={statIdx} className="bg-white p-4 rounded-xl border border-[var(--color-cream-200)] text-center shadow-sm">
                                                <p className="text-xs text-[var(--color-text-500)] uppercase font-bold mb-1">{stat.label}</p>
                                                <p className={`text-lg font-bold
                          ${program.color === 'brown' ? 'text-[var(--color-brown-700)]' :
                                                        program.color === 'teal' ? 'text-[var(--color-teal-700)]' :
                                                            'text-[var(--color-gold-600)]'}
                        `}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Curriculum List */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-4 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-[var(--color-text-500)]" />
                                            Kurikulum Unggulan
                                        </h3>
                                        <ul className="space-y-3">
                                            {program.curriculum.map((item, cIdx) => (
                                                <li key={cIdx} className="flex items-start gap-3">
                                                    <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5
                               ${program.color === 'brown' ? 'text-[var(--color-brown-500)]' :
                                                            program.color === 'teal' ? 'text-[var(--color-teal-500)]' :
                                                                'text-[var(--color-gold-500)]'}
                            `} />
                                                    <span className="text-[var(--color-text-700)]">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button
                                        size="lg"
                                        className={`w-full sm:w-auto text-white shadow-lg transition-all hover:-translate-y-1
                      ${program.color === 'brown' ? 'bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)]' :
                                                program.color === 'teal' ? 'bg-[var(--color-teal-600)] hover:bg-[var(--color-teal-700)]' :
                                                    'bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-600)]'}
                    `}
                                        asChild
                                    >
                                        <Link href={`/daftar?jenjang=${program.id.toUpperCase()}`}>
                                            <span className="mr-2">Daftar {program.name}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Image Section */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
                                        {/* Placeholder Image using colors if real image fails */}
                                        <div className={`absolute inset-0 bg-gradient-to-br opacity-80 z-0
                        ${program.color === 'brown' ? 'from-[var(--color-brown-800)] to-[var(--color-brown-600)]' :
                                                program.color === 'teal' ? 'from-[var(--color-teal-800)] to-[var(--color-teal-600)]' :
                                                    'from-[var(--color-gold-700)] to-[var(--color-gold-500)]'}
                     `} />
                                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                                            <GraduationCap className="w-20 h-20 mb-auto opacity-20" />
                                            <h3 className="text-3xl font-bold mb-2">{program.name}</h3>
                                            <p className="text-white/80">Mencetak Generasi Rabbani</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Container>
                    </section>
                ))}
            </div>
        </main>
    );
}
