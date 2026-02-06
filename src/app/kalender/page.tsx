"use client";

import { Container } from "@/components/layout/Container";
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react";

const academicCalendar = [
  {
    month: "Juli",
    events: [
      { date: "10-15", title: "Pendaftaran Santri Baru", type: "pendaftaran" },
      { date: "20", title: "Tes Masuk Santri Baru", type: "ujian" },
    ],
  },
  {
    month: "Agustus",
    events: [
      { date: "1-5", title: "Pengumuman Kelulusan", type: "pengumuman" },
      { date: "15", title: "Pembukaan Tahun Ajaran Baru", type: "pembukaan" },
      { date: "17", title: "Upacara Kemerdekaan RI", type: "kegiatan" },
    ],
  },
  {
    month: "September",
    events: [
      { date: "Setiap Sabtu", title: "Kajian Kitab Kuning", type: "rutin" },
      { date: "Minggu ke-2", title: "Ujian Tengah Semester", type: "ujian" },
    ],
  },
  {
    month: "Oktober",
    events: [
      { date: "Setiap Jumat", title: "Khotbah Jumat", type: "rutin" },
      { date: "Akhir Bulan", title: "Pekan Olahraga", type: "kegiatan" },
    ],
  },
];

const eventColors: Record<string, string> = {
  pendaftaran: "bg-blue-100 text-blue-700 border-blue-200",
  ujian: "bg-red-100 text-red-700 border-red-200",
  pengumuman: "bg-green-100 text-green-700 border-green-200",
  pembukaan: "bg-purple-100 text-purple-700 border-purple-200",
  kegiatan: "bg-gold-100 text-gold-700 border-gold-200",
  rutin: "bg-brown-100 text-brown-700 border-brown-200",
};

export default function KalenderPage() {
  return (
    <main className="min-h-screen bg-surface-50 pt-24 pb-16">
      {/* Header */}
      <section className="bg-brown-900 py-12 mb-12">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar className="w-4 h-4" />
              <span>Kalender Akademik</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
              Kalender Kegiatan
            </h1>
            <p className="mt-4 text-lg text-brown-100 max-w-2xl mx-auto">
              Jadwal akademik dan kegiatan tahun ajaran 2025/2026
            </p>
          </div>
        </Container>
      </section>

      <Container>
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-clay-sm border border-surface-200">
            <div className="w-12 h-12 rounded-xl bg-brown-100 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-brown-600" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">Jam Belajar</h3>
            <p className="text-ink-600 text-sm">
              Senin - Jumat: 06.00 - 16.00 WIB<br />
              Sabtu: 06.00 - 12.00 WIB
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-clay-sm border border-surface-200">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">Tahun Ajaran</h3>
            <p className="text-ink-600 text-sm">
              Tahun Ajaran 2025/2026<br />
              Dimulai 15 Agustus 2025
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-clay-sm border border-surface-200">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">Lokasi</h3>
            <p className="text-ink-600 text-sm">
              Cikembar, Sukabumi<br />
              Jawa Barat 43157
            </p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-8">
          {academicCalendar.map((monthData, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-clay-sm border border-surface-200 overflow-hidden">
              <div className="bg-brown-50 px-6 py-4 border-b border-brown-100">
                <h2 className="text-xl font-bold text-brown-800">{monthData.month}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {monthData.events.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-clay-sm"
                    >
                      <div className={`px-3 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${eventColors[event.type] || "bg-surface-100 text-ink-600 border-surface-200"}`}>
                        {event.date}
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-900">{event.title}</h3>
                        <p className="text-sm text-ink-500 capitalize">{event.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 bg-gold-50 border border-gold-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <h3 className="font-bold text-gold-900 mb-2">Catatan Penting</h3>
              <p className="text-gold-700 text-sm leading-relaxed">
                Jadwal dapat berubah sesuai dengan kebijakan pimpinan pondok pesantren. 
                Untuk informasi terbaru, silakan cek dashboard santri atau hubungi bagian administrasi.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
