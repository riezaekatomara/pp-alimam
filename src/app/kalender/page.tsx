"use client";

import { Container } from "@/components/layout/Container";
import { Calendar, Clock, Wrench } from "lucide-react";

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
        {/* Development Notice */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-clay-lg border border-surface-200 overflow-hidden">
            <div className="bg-gradient-to-r from-brown-50 to-cream-50 px-8 py-6 border-b border-brown-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-brown-100 flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-brown-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brown-900">Sedang dalam Pengembangan</h2>
                  <p className="text-brown-600 mt-1">Halaman kalender akademik sedang disiapkan</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="prose prose-brown max-w-none">
                <p className="text-ink-600 text-lg leading-relaxed mb-6">
                  Kami sedang mempersiapkan halaman kalender akademik yang komprehensif untuk Anda. 
                  Halaman ini akan menampilkan:
                </p>
                
                <ul className="space-y-3 text-ink-600 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brown-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-3 h-3 text-brown-600" />
                    </div>
                    <span>Jadwal akademik tahun ajaran 2025/2026</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 text-gold-600" />
                    </div>
                    <span>Jadwal kegiatan rutin pondok pesantren</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Wrench className="w-3 h-3 text-teal-600" />
                    </div>
                    <span>Informasi ujian dan kegiatan penting lainnya</span>
                  </li>
                </ul>

                <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gold-900 mb-2">Perkiraan Selesai</h3>
                      <p className="text-gold-700 text-sm leading-relaxed">
                        Halaman ini dijadwalkan akan selesai dalam beberapa hari ke depan. 
                        Untuk informasi sementara, silakan hubungi bagian administrasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
