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
    ArrowRight,
    Star
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

// Program Data with Updated Colors
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
        theme: "brown",
        gradient: "from-brown-800 to-brown-600",
        accent: "text-brown-600",
        bg: "bg-brown-50"
    },
    {
        id: "il",
        name: "I'dad Lughowi",
        fullName: "Program I'dad Lughowi (Setara SMA)",
        description: "Program pendidikan 4 tahun (1 tahun persiapan bahasa + 3 tahun MA) yang setara dengan SMA/MA. Memadukan kurikulum kepesantrenan dan umum untuk mencetak kader ulama dan profesional.",
        stats: [
            { label: "Masa Studi", value: "4 Tahun" },
            { label: "Jenjang", value: "Setara SMA" },
            { label: "Target", value: "Hafal 30 Juz" },
        ],
        curriculum: [
            "Tahun 1: Intensif Bahasa Arab & Dasar Syar'i",
            "Tahun 2-4: Kurikulum MA & Lanjutan Diniyah",
            "Tahfidz Al-Qur'an (Target 30 Juz)",
            "Kajian Kitab Kuning/Turats",
            "Ijazah Negara (Paket C/Formal)",
        ],
        image: "/images/hero.jpg", // Placeholder
        theme: "gold",
        gradient: "from-gold-600 to-gold-400",
        accent: "text-gold-600",
        bg: "bg-gold-50"
    },

];

export default function ProgramPage() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const viewportMiddle = window.scrollY + (window.innerHeight / 2);

            // Find which section is currently in the middle of the viewport
            for (const program of PROGRAMS) {
                const element = document.getElementById(program.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (viewportMiddle >= offsetTop && viewportMiddle < offsetTop + offsetHeight) {
                        setActiveSection(program.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="bg-surface-50 min-h-screen">
            {/* 1. Hero Section - Brown Aesthetic */}
            <section className="relative pt-12 pb-20 md:pt-16 overflow-hidden bg-brown-900">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 animate-in fade-in slide-in-from-bottom-4">
                        <GraduationCap className="w-4 h-4" />
                        <span>Jenjang Pendidikan</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                        Program Pendidikan <br />
                        <span className="text-white">Al-Imam Al-Islami</span>
                    </h1>

                    <p className="text-lg md:text-xl text-brown-100 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Membangun generasi unggul dengan kurikulum terpadu yang menyeimbangkan ilmu dunia dan akhirat untuk masa depan yang gemilang.
                    </p>
                </Container>
            </section>

            {/* 2. Navigation Tabs (Sticky) */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-brown-100 shadow-sm transition-all">
                <Container>
                    <div className="flex justify-center gap-2 md:gap-4 py-4 overflow-x-auto no-scrollbar">
                        {PROGRAMS.map((program) => (
                            <a
                                key={program.id}
                                href={`#${program.id}`}
                                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap border
                                ${activeSection === program.id
                                        ? program.theme === 'brown' ? 'bg-brown-600 text-white border-brown-600 shadow-lg shadow-brown-600/20' :
                                            program.theme === 'gold' ? 'bg-gold-500 text-white border-gold-500 shadow-lg shadow-gold-500/20' :
                                                'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/20'
                                        : 'bg-white text-ink-500 border-ink-100 hover:border-brown-300 hover:text-brown-700'
                                    }`}
                            >
                                {program.name}
                            </a>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 3. Program Sections */}
            <div className="space-y-20 py-20">
                {PROGRAMS.map((program, idx) => (
                    <section key={program.id} id={program.id} className="scroll-mt-40">
                        <Container>
                            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

                                {/* Text Content */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 font-bold text-xs uppercase tracking-widest
                                        ${program.theme === 'brown' ? 'bg-brown-100 text-brown-700' :
                                            program.theme === 'gold' ? 'bg-gold-100 text-gold-700' :
                                                'bg-teal-100 text-teal-700'}
                                    `}>
                                        <Star className="w-4 h-4" />
                                        <span>Program Unggulan</span>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-black text-brown-900 mb-6 font-display">
                                        {program.fullName}
                                    </h2>
                                    <p className="text-ink-600 text-lg leading-relaxed mb-8">
                                        {program.description}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-10">
                                        {program.stats.map((stat, statIdx) => (
                                            <div key={statIdx} className="bg-white p-4 rounded-2xl border border-surface-200 text-center shadow-clay-sm hover:shadow-clay-md transition-shadow">
                                                <p className="text-[10px] text-ink-400 uppercase font-extrabold tracking-widest mb-1.5">{stat.label}</p>
                                                <p className={`text-lg font-bold
                                                    ${program.theme === 'brown' ? 'text-brown-700' :
                                                        program.theme === 'gold' ? 'text-gold-600' :
                                                            'text-teal-600'}
                                                `}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Curriculum */}
                                    <div className={`rounded-3xl p-8 mb-10 border ${program.bg} ${program.theme === 'brown' ? 'border-brown-200' : program.theme === 'gold' ? 'border-gold-200' : 'border-teal-200'}`}>
                                        <h3 className="text-xl font-bold text-brown-900 mb-6 flex items-center gap-3">
                                            <BookOpen className={`w-6 h-6 ${program.accent}`} />
                                            Kurikulum & Materi
                                        </h3>
                                        <ul className="space-y-4">
                                            {program.curriculum.map((item, cIdx) => (
                                                <li key={cIdx} className="flex items-start gap-4">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                                        ${program.theme === 'brown' ? 'bg-brown-200 text-brown-700' :
                                                            program.theme === 'gold' ? 'bg-gold-200 text-gold-700' :
                                                                'bg-teal-200 text-teal-700'}
                                                    `}>
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span className="text-ink-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button
                                        size="lg"
                                        className={`w-full sm:w-auto text-white rounded-xl h-14 px-8 text-base shadow-lg transition-all hover:scale-105
                                            ${program.theme === 'brown' ? 'bg-brown-600 hover:bg-brown-700 shadow-brown-500/20' :
                                                program.theme === 'gold' ? 'bg-gold-500 hover:bg-gold-600 shadow-gold-500/20' :
                                                    'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'}
                                        `}
                                        asChild
                                    >
                                        <Link href={`/daftar?jenjang=${program.id.toUpperCase()}`}>
                                            <span className="mr-2">Daftar {program.name}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Image Card */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-clay-lg group-hover:rotate-1 transition-transform duration-700">
                                        {/* Placeholder Pattern */}
                                        <div className={`absolute inset-0 bg-gradient-to-br opacity-90 z-10 ${program.gradient}`} />
                                        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20 z-10 mix-blend-overlay" />

                                        <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end text-white">
                                            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-auto border border-white/30">
                                                <GraduationCap className="w-12 h-12 text-white" />
                                            </div>

                                            <h3 className="text-4xl font-display font-black mb-2">{program.name}</h3>
                                            <p className="text-white/80 text-lg font-medium">Mencetak Generasi Rabbani</p>
                                        </div>
                                    </div>

                                    {/* Decorative Blob specific to section */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl -z-10 opacity-40
                                         ${program.theme === 'brown' ? 'bg-brown-300' :
                                            program.theme === 'gold' ? 'bg-gold-300' :
                                                'bg-teal-300'}
                                    `} />
                                </div>

                            </div>
                        </Container>
                    </section>
                ))}
            </div>
        </main>
    );
}
