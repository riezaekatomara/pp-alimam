"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Download,
    Search
} from "lucide-react";

// Mock Data for Events
const EVENTS = [
    {
        id: 1,
        title: "Penerimaan Santri Baru (PSB) Gelombang 1",
        date: "2026-03-01",
        time: "08:00 - 15:00 WIB",
        location: "Kantor Sekretariat & Online",
        category: "Akademik",
        description: "Pembukaan pendaftaran santri baru untuk tahun ajaran 2026/2027. Tersedia kuota untuk MTs, MA, dan I'dad Lughowi.",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Kajian Akbar Menyambut Ramadhan",
        date: "2026-03-10",
        time: "09:00 - 11:30 WIB",
        location: "Masjid Utama Al-Imam",
        category: "Acara",
        description: "Kajian umum terbuka untuk wali santri dan masyarakat umum dengan tema persiapan ruhiyah menyambut bulan suci.",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Ujian Tengah Semester Genap",
        date: "2026-03-15",
        time: "07:00 - 12:00 WIB",
        location: "Ruang Kelas",
        category: "Akademik",
        description: "Pelaksanaan ujian tengah semester bagi seluruh santri MTs dan MA.",
        status: "upcoming"
    },
    {
        id: 4,
        title: "Libur Awal Ramadhan",
        date: "2026-03-20",
        time: "Sehari Penuh",
        location: "-",
        category: "Libur",
        description: "Libur kegiatan belajar mengajar menyambut awal bulan Ramadhan 1447 H.",
        status: "upcoming"
    },
    {
        id: 5,
        title: "Daurah Tahfidz Intensif",
        date: "2026-03-22",
        time: "Full Day",
        location: "Asrama Santri",
        category: "Program Khusus",
        description: "Program karantina menghafal Al-Qur'an selama bulan Ramadhan untuk mencapai target hafalan.",
        status: "upcoming"
    },
];

const CATEGORIES = ["Semua", "Akademik", "Acara", "Libur", "Program Khusus"];

export default function AgendaPage() {
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026

    const filteredEvents = selectedCategory === "Semua"
        ? EVENTS
        : EVENTS.filter(event => event.category === selectedCategory);

    return (
        <main className="bg-surface-50 min-h-screen">
            {/* 1. Hero Section - Brown Aesthetic */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-brown-900 border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

                <Container className="relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4">
                                <Calendar className="w-4 h-4" />
                                <span>Jadwal Kegiatan</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                                Kalender <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Akademik</span>
                            </h1>
                        </div>

                        <div className="w-full md:w-auto animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-1 rounded-2xl flex items-center">
                                <button className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="px-6 text-center">
                                    <span className="block text-xs uppercase font-bold text-white/50 tracking-widest">Periode</span>
                                    <span className="font-bold text-xl text-white">Maret 2026</span>
                                </div>
                                <button className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 2. Controls & Filter */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-brown-100 shadow-sm">
                <Container>
                    <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border
                                    ${selectedCategory === cat
                                        ? 'bg-brown-800 text-white border-brown-800 shadow-lg shadow-brown-900/10'
                                        : 'bg-white text-ink-500 border-ink-100 hover:border-brown-300 hover:text-brown-700'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 3. Events List */}
            <section className="py-16">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* List */}
                        <div className="lg:col-span-2 space-y-6">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <div key={event.id} className="group card-glass p-0 overflow-hidden hover:-translate-y-1 transition-transform border border-surface-200">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Date Stripe */}
                                            <div className="md:w-32 bg-surface-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-surface-200 group-hover:bg-brown-50 transition-colors">
                                                <span className="text-4xl font-black text-brown-900">{new Date(event.date).getDate()}</span>
                                                <span className="text-xs font-bold text-ink-400 uppercase tracking-widest">{new Date(event.date).toLocaleString('id-ID', { month: 'short' })}</span>
                                            </div>

                                            {/* Details */}
                                            <div className="p-6 md:p-8 flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                                                        ${event.category === 'Akademik' ? 'bg-blue-50 text-blue-700' :
                                                            event.category === 'Libur' ? 'bg-red-50 text-red-700' :
                                                                event.category === 'Acara' ? 'bg-purple-50 text-purple-700' :
                                                                    'bg-orange-50 text-orange-700'}
                                                    `}>
                                                        {event.category}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-brown-900 mb-2 group-hover:text-teal-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-ink-500 leading-relaxed mb-6">
                                                    {event.description}
                                                </p>

                                                <div className="flex flex-wrap gap-4 pt-4 border-t border-surface-100">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-ink-500">
                                                        <Clock className="w-4 h-4 text-gold-500" />
                                                        {event.time}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-ink-500">
                                                        <MapPin className="w-4 h-4 text-teal-500" />
                                                        {event.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-ink-200">
                                    <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-ink-400">
                                        <Search className="w-8 h-8" />
                                    </div>
                                    <p className="text-ink-500 font-medium">Tidak ada agenda pada kategori ini.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Download Widget */}
                            <div className="bg-brown-900 rounded-[2rem] p-8 text-center shadow-clay-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl group-hover:bg-gold-500/30 transition-colors" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold-400 backdrop-blur-md border border-white/10">
                                        <Download className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2">Unduh Kalender PDF</h3>
                                    <p className="text-sm text-white/70 mb-8 leading-relaxed">
                                        Dapatkan jadwal lengkap satu tahun ajaran dalam format PDF.
                                    </p>
                                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-gold-900/20">
                                        Download PDF
                                    </Button>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="card-glass p-6">
                                <h4 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                    Catatan Penting
                                </h4>
                                <ul className="space-y-3">
                                    <li className="text-xs text-ink-600 font-medium leading-relaxed bg-surface-50 p-3 rounded-lg border border-surface-200">
                                        Jadwal dapat berubah sewaktu-waktu menyesuaikan kondisi pesantren.
                                    </li>
                                    <li className="text-xs text-ink-600 font-medium leading-relaxed bg-surface-50 p-3 rounded-lg border border-surface-200">
                                        Info detail diumumkan via Grup WhatsApp Wali Santri H-3 kegiatan.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
