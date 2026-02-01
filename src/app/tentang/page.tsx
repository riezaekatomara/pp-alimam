"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    Users,
    Target,
    History,
    MapPin,
    Award,
    BookOpen
} from "lucide-react";

export default function TentangPage() {
    return (
        <main className="bg-white min-h-screen pt-20">
            {/* Header Section */}
            <section className="bg-[var(--color-brown-900)] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5" />
                <Container className="relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-gold-500)] text-white text-xs font-bold uppercase tracking-wider mb-4">
                        Tentang Kami
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
                        Mengenal Lebih Dekat<br />Pondok Pesantren Al-Imam
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-cream-200)] max-w-3xl mx-auto leading-relaxed">
                        Lembaga pendidikan Islam yang berdedikasi mencetak generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap berkontribusi untuk umat.
                    </p>
                </Container>
            </section>

            {/* History / Profile */}
            <section className="py-20">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-3xl bg-[var(--color-brown-100)] overflow-hidden shadow-xl">
                                {/* Placeholder for real image */}
                                <div className="w-full h-full bg-gradient-to-br from-[var(--color-brown-200)] to-[var(--color-brown-400)] flex items-center justify-center">
                                    <span className="text-[var(--color-brown-800)] font-bold opacity-30">Foto Pesantren</span>
                                </div>
                            </div>
                            {/* Decoration float */}
                            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[var(--color-gold-500)] p-6 md:p-8 rounded-2xl shadow-lg max-w-xs">
                                <p className="text-white font-bold text-lg leading-tight">
                                    "Berpengalaman mendidik sejak tahun 1995"
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-900)]">
                                Sejarah & Profil Singkat
                            </h2>
                            <p className="text-[var(--color-text-600)] leading-relaxed">
                                Pondok Pesantren Al-Imam Al-Islami didirikan pada tahun 1995 dengan semangat untuk menghadirkan pendidikan Islam berkualitas yang mengintegrasikan nilai-nilai kepesantrenan (Turats) dengan tuntutan zaman modern.
                            </p>
                            <p className="text-[var(--color-text-600)] leading-relaxed">
                                Berawal dari sebuah majelis ta'lim sederhana, kini Al-Imam telah berkembang menjadi lembaga pendidikan yang menaungi ratusan santri dari berbagai daerah di Indonesia, dengan jenjang pendidikan mulai dari MTs hingga MA.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-brown-100)] flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-[var(--color-brown-700)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text-900)] text-lg">500+</h4>
                                        <p className="text-sm text-[var(--color-text-500)]">Santri Aktif</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-teal-100)] flex items-center justify-center flex-shrink-0">
                                        <Award className="w-5 h-5 text-[var(--color-teal-700)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text-900)] text-lg">A</h4>
                                        <p className="text-sm text-[var(--color-text-500)]">Akreditasi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Vision Mission */}
            <section className="py-20 bg-[var(--color-brown-50)]">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[var(--color-text-900)] mb-4">Visi & Misi</h2>
                        <p className="text-[var(--color-text-600)]">
                            Komitmen kami dalam menjalankan amanah pendidikan umat
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Visi */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[var(--color-brown-100)] text-center">
                            <div className="w-16 h-16 mx-auto bg-[var(--color-brown-100)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brown-700)]">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-900)] mb-4">Visi</h3>
                            <p className="text-lg text-[var(--color-text-700)] font-medium leading-relaxed italic">
                                "Terwujudnya Generasi Rabbani yang Cendekia, Mandiri, dan Berwawasan Global berlandaskan Al-Qur'an dan Sunnah."
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[var(--color-brown-100)]">
                            <div className="w-16 h-16 mx-auto md:mx-0 bg-[var(--color-teal-100)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-teal-700)]">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-900)] mb-4 text-center md:text-left">Misi</h3>
                            <ul className="space-y-4">
                                {[
                                    "Menyelenggarakan pendidikan Islam yang integratif.",
                                    "Membangun lingkungan pesantren yang kondusif untuk pembentukan akhlak.",
                                    "Mengembangkan potensi santri dalam bidang akademik dan non-akademik.",
                                    "Membekali santri dengan keterampilan hidup (life skills) dan bahasa asing."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[var(--color-teal-500)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <span className="text-[var(--color-text-700)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[var(--color-brown-900)] text-white text-center">
                <Container>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Bergabunglah Bersama Keluarga Besar Al-Imam</h2>
                    <p className="text-lg text-[var(--color-cream-200)] mb-10 max-w-2xl mx-auto">
                        Mari persiapkan masa depan putra-putri Anda di lingkungan pendidikan terbaik. Pendaftaran tahun ajaran baru telah dibuka.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-[var(--color-gold-500)] text-white hover:bg-[var(--color-gold-600)]" asChild>
                            <Link href="/daftar">Daftar Sekarang</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                            <Link href="/kontak">Hubungi Kami</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
