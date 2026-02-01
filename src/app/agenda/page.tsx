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
    Download
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
        <main className="bg-[var(--color-cream-50)] min-h-screen pt-20">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--color-cream-200)] md:hidden">
                <div className="flex items-center h-16 px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="w-6 h-6 text-[var(--color-text-900)]" />
                    </Button>
                    <h1 className="text-lg font-bold text-[var(--color-text-900)]">Kalender Akademik</h1>
                </div>
            </div>



            {/* Redesigned Hero Section */}
            <section className="py-12 md:py-20">
                <Container>
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                        {/* Left Column: Visual "Jurnal" Representation */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                {/* Decorative "Binder" elements */}
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-50 rounded-l-3xl border-r border-gray-100 flex flex-col justify-center gap-4 py-8">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-3 h-3 rounded-full bg-gray-300 mx-auto" />
                                    ))}
                                </div>

                                <div className="pl-6 h-full flex flex-col">
                                    {/* Header Visual: "Jurnal" + Month Badge */}
                                    <div className="flex items-stretch gap-4 mb-6">
                                        <div className="flex-1 bg-blue-600 rounded-xl flex items-center justify-center p-4 shadow-lg active-pattern">
                                            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                                                Jurnal
                                            </h2>
                                        </div>
                                        <div className="w-24 sm:w-32 bg-yellow-400 rounded-xl flex flex-col items-center justify-center p-2 shadow-md rotate-2">
                                            <span className="text-xs font-bold uppercase tracking-wider">Bulan</span>
                                            <span className="text-lg sm:text-xl font-black uppercase">Maret</span>
                                            <span className="text-lg sm:text-xl font-black">2026</span>
                                        </div>
                                    </div>

                                    {/* Calendar Grid Visual */}
                                    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 shadow-inner">
                                        <div className="bg-blue-600 text-white text-center py-1.5 rounded-lg mb-4 text-sm font-bold shadow-md">
                                            Maret 2026
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-gray-400 mb-2">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                                                <div key={d}>{d}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-700">
                                            {/* Mock days for visual appeal */}
                                            {[...Array(31)].map((_, i) => {
                                                const day = i + 1;
                                                const isToday = day === 15; // Example highlight
                                                const isHoliday = day === 20; // Example holiday
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`aspect-square flex items-center justify-center rounded-lg
                                                            ${isToday ? 'bg-blue-600 text-white shadow-md scale-110' : ''}
                                                            ${isHoliday ? 'bg-red-100 text-red-600' : ''}
                                                        `}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Text Content */}
                        <div className="w-full lg:w-1/2 pt-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-900)] mb-6">
                                Kalender Akademik
                            </h1>

                            <div className="prose prose-lg text-[var(--color-text-600)] mb-8">
                                <p className="mb-4">
                                    Kalender Akademik Pondok Pesantren Al-Imam Al-Islami dirancang sebagai panduan utama bagi seluruh santri, orang tua, dan dewan guru dalam mengikuti kegiatan belajar-mengajar selama tahun pelajaran berlangsung.
                                </p>
                                <p className="mb-4">
                                    Setiap bulannya, sejumlah agenda penting akan dilaksanakan, mulai dari ujian, kegiatan ekstrakurikuler, hingga hari libur nasional dan cuti bersama yang telah dijadwalkan secara sistematis.
                                </p>
                                <p>
                                    Kami berharap dengan adanya kalender ini, seluruh pihak dapat lebih siap dan terkoordinasi dalam menjalani aktivitas pendidikan di lingkungan pesantren. Silakan klik tombol di bawah ini untuk melihat detail lengkap kalender.
                                </p>
                            </div>

                            <Button
                                onClick={() => {
                                    const eventsSection = document.getElementById('events-grid');
                                    eventsSection?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full sm:w-auto h-12 px-8 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                Lihat Kalender
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Controls & Filter */}
            <section className="py-12 border-b border-[var(--color-cream-200)] bg-white sticky top-20 z-30 shadow-sm">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                                        ${selectedCategory === cat
                                            ? 'bg-[var(--color-brown-700)] text-white shadow-md'
                                            : 'bg-[var(--color-cream-100)] text-[var(--color-text-600)] hover:bg-[var(--color-brown-100)]'}
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Month Nav */}
                        <div className="flex items-center gap-4 bg-[var(--color-cream-50)] p-2 rounded-xl">
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <ChevronLeft className="w-5 h-5 text-[var(--color-text-600)]" />
                            </button>
                            <span className="font-bold text-[var(--color-text-900)] min-w-[120px] text-center">
                                Maret 2026
                            </span>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5 text-[var(--color-text-600)]" />
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Events Grid */}
            <section id="events-grid" className="py-16">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Events List */}
                        <div className="lg:col-span-2 space-y-6">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)] hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                                        {/* Date Box */}
                                        <div className="flex-shrink-0 bg-[var(--color-cream-50)] rounded-xl p-4 flex flex-col items-center justify-center min-w-[100px] border border-[var(--color-cream-200)]">
                                            <span className="text-3xl font-bold text-[var(--color-brown-700)]">
                                                {new Date(event.date).getDate()}
                                            </span>
                                            <span className="text-xs uppercase font-bold text-[var(--color-text-500)] tracking-wider">
                                                {new Date(event.date).toLocaleString('id-ID', { month: 'short' })}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                                    ${event.category === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                                                        event.category === 'Libur' ? 'bg-red-100 text-red-700' :
                                                            event.category === 'Acara' ? 'bg-purple-100 text-purple-700' :
                                                                'bg-orange-100 text-orange-700'}
                                                `}>
                                                    {event.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-[var(--color-text-600)] text-sm mb-4 leading-relaxed">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-500)]">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">Tidak ada agenda pada kategori ini.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar / Widgets */}
                        <div className="space-y-8">
                            {/* Download Calendar */}
                            <div className="bg-[var(--color-brown-900)] text-white p-8 rounded-3xl text-center">
                                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-80" />
                                <h3 className="text-xl font-bold mb-2">Unduh Kalender</h3>
                                <p className="text-white/80 text-sm mb-6">
                                    Dapatkan versi PDF lengkap kalender akademik tahun ajaran 2026/2027.
                                </p>
                                <Button className="w-full bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-600)] text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </div>

                            {/* Info Box */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-brown-100)]">
                                <h4 className="font-bold text-[var(--color-text-900)] mb-4">Catatan Penting</h4>
                                <ul className="space-y-3 text-sm text-[var(--color-text-600)]">
                                    <li className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                                        Jadwal dapat berubah sewaktu-waktu menyesuaikan kondisi.
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                                        Informasi detail setiap kegiatan akan diumumkan melalui grup WhatsApp wali santri.
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
