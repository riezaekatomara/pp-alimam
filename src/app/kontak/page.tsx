"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle,
    Instagram,
    Facebook,
    Youtube
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        telepon: "",
        pesan: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setShowSuccess(true);
            setFormData({ nama: "", email: "", telepon: "", pesan: "" });
            setIsSubmitting(false);
            setTimeout(() => setShowSuccess(false), 5000);
        }, 1500);
    };

    const SOCIAL_MEDIA = [
        {
            name: "Instagram",
            username: "@pp_alimam",
            url: "https://instagram.com/pp_alimam",
            icon: Instagram,
            color: "bg-pink-500", // kept for fallback or other uses if needed
            textColor: "text-pink-600",
            bgLight: "bg-pink-50",
        },
        {
            name: "Facebook",
            username: "Ponpes Al-Imam Al-Islami",
            url: "https://facebook.com/ppalimam",
            icon: Facebook,
            color: "bg-blue-600",
            textColor: "text-blue-600",
            bgLight: "bg-blue-50",
        },
        {
            name: "Youtube",
            username: "Al-Imam TV",
            url: "https://youtube.com/@alimamtv",
            icon: Youtube,
            color: "bg-red-600",
            textColor: "text-red-600",
            bgLight: "bg-red-50",
        },
    ];

    return (
        <main className="bg-white min-h-screen pt-20">
            {/* Header Section */}
            <section className="bg-[var(--color-brown-900)] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5" />
                <Container className="relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-gold-500)] text-white text-xs font-bold uppercase tracking-wider mb-4">
                        Hubungi Kami
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
                        Kami Siap Membantu Anda
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-cream-200)] max-w-3xl mx-auto leading-relaxed">
                        Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran, program pendidikan, atau kunjungan ke pesantren.
                    </p>
                </Container>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-[var(--color-cream-50)]">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Sidebar: Contact Info & Socials */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Quick Info Cards */}
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)]">
                                    <MapPin className="w-8 h-8 text-[var(--color-brown-600)] mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Alamat Lengkap</h3>
                                    <p className="text-[var(--color-text-600)] leading-relaxed text-sm">
                                        Jl. Pelabuhan Ratu II KM 18, Kp. Pupunjul, Desa Cikembar, Kec. Cikembar, Kab. Sukabumi, Jawa Barat 43157
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)]">
                                    <Phone className="w-8 h-8 text-[var(--color-teal-600)] mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Kontak Telepon</h3>
                                    <p className="text-[var(--color-text-600)] mb-3 text-sm">
                                        Hubungi kami pada jam kerja
                                    </p>
                                    <a href="tel:+6285722253236" className="text-lg font-bold text-[var(--color-teal-700)] hover:underline">
                                        +62 857-2225-3236
                                    </a>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)]">
                                    <Mail className="w-8 h-8 text-[var(--color-gold-600)] mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Email Resmi</h3>
                                    <a href="mailto:alimamalislami@gmail.com" className="text-[var(--color-text-700)] font-medium hover:text-[var(--color-gold-600)] transition-colors">
                                        alimamalislami@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)]">
                                <h3 className="font-bold text-lg mb-6">Ikuti Media Sosial Kami</h3>
                                <div className="space-y-4">
                                    {SOCIAL_MEDIA.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[var(--color-brown-200)] shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <div className={`p-3 rounded-full ${social.bgLight} transition-colors group-hover:scale-110 duration-300`}>
                                                <social.icon className={`w-5 h-5 ${social.textColor}`} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 mb-0.5">{social.name}</p>
                                                <p className={`font-bold text-sm ${social.textColor}`}>{social.username}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Column: Form & Map */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Form */}
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-[var(--color-brown-100)]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[var(--color-brown-100)] rounded-xl flex items-center justify-center">
                                        <Send className="w-6 h-6 text-[var(--color-brown-600)]" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[var(--color-text-900)]">
                                            Kirim Pesan
                                        </h2>
                                        <p className="text-[var(--color-text-600)]">
                                            Kami akan membalas pesan Anda secepatnya
                                        </p>
                                    </div>
                                </div>

                                {showSuccess && (
                                    <div className="bg-[var(--color-teal-50)] border border-[var(--color-teal-200)] p-4 rounded-xl mb-6">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-[var(--color-teal-600)]" />
                                            <p className="text-sm font-semibold text-[var(--color-teal-700)]">
                                                Pesan berhasil dikirim! Kami akan menghubungi Anda segera.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[var(--color-text-700)] mb-2">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-brown-500)] focus:ring-2 focus:ring-[var(--color-brown-200)] outline-none transition-all"
                                                placeholder="Nama Anda"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[var(--color-text-700)] mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-brown-500)] focus:ring-2 focus:ring-[var(--color-brown-200)] outline-none transition-all"
                                                placeholder="email@contoh.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[var(--color-text-700)] mb-2">
                                            Nomor WhatsApp / Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            name="telepon"
                                            value={formData.telepon}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-brown-500)] focus:ring-2 focus:ring-[var(--color-brown-200)] outline-none transition-all"
                                            placeholder="08xx xxxx xxxx"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[var(--color-text-700)] mb-2">
                                            Pesan
                                        </label>
                                        <textarea
                                            name="pesan"
                                            value={formData.pesan}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-brown-500)] focus:ring-2 focus:ring-[var(--color-brown-200)] outline-none transition-all resize-none"
                                            placeholder="Tuliskan pertanyaan atau pesan Anda..."
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white px-8"
                                        >
                                            {isSubmitting ? (
                                                "Mengirim..."
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Kirim Pesan
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Map */}
                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-[var(--color-brown-100)]">
                                <div className="rounded-2xl overflow-hidden h-[400px] w-full bg-gray-100">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.456!2d106.860!3d-6.910!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzYuMCJTIDEwNsKwNTEnMzYuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Pondok Pesantren Al-Imam Al-Islami"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
