import Link from "next/link";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Award,
  Zap,
  TrendingUp,
  Star,
  Trophy,
  Shield,
  Heart,
  Phone,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";

export default function PPDBPage() {
  const requirements = [
    {
      icon: CheckCircle,
      title: "Persyaratan Umum",
      subtitle: "Dokumen standar yang mudah disiapkan",
      items: [
        {
          text: "Fotokopi Kartu Keluarga (KK)",
          benefit: "Proses verifikasi cepat",
        },
        { text: "Fotokopi Akta Kelahiran", benefit: "Data valid terjamin" },
        {
          text: "Fotokopi KTP Orang Tua/Wali",
          benefit: "Keamanan santri maksimal",
        },
        {
          text: "Pas Foto 3x4 (4 lembar)",
          benefit: "Untuk administrasi lengkap",
        },
        {
          text: "Surat Keterangan Sehat dari Dokter",
          benefit: "Jaminan kesehatan anak",
        },
        {
          text: "Surat Keterangan Tidak Buta Warna",
          benefit: "Syarat akademis standar",
        },
      ],
    },
    {
      icon: FileText,
      title: "Persyaratan Akademik",
      subtitle: "Bukti prestasi & kemampuan anak Anda",
      items: [
        {
          text: "Fotokopi Ijazah/Rapor Terakhir",
          benefit: "Penempatan kelas tepat",
        },
        {
          text: "Surat Keterangan Lulus (bagi yang sudah lulus)",
          benefit: "Legalitas terjamin",
        },
        {
          text: "Nilai Ujian Sekolah/Madrasah",
          benefit: "Evaluasi kemampuan awal",
        },
        {
          text: "Sertifikat Prestasi (jika ada)",
          benefit: "Beasiswa prestasi tersedia!",
        },
      ],
    },
  ];

  const timeline = [
    {
      phase: "Pendaftaran Online",
      date: "1 Januari - 31 Maret 2026",
      description: "Daftar dari rumah, hanya 10 menit!",
      benefit: "Dapat nomor pendaftaran prioritas",
      status: "active",
      icon: FileText,
      color: "from-teal-600 to-teal-700",
    },
    {
      phase: "Seleksi Administrasi",
      date: "1 - 15 April 2026",
      description: "Tim kami verifikasi berkas Anda",
      benefit: "Notifikasi real-time via WhatsApp",
      status: "upcoming",
      icon: CheckCircle,
      color: "from-[var(--color-brown-600)] to-[var(--color-brown-700)]",
    },
    {
      phase: "Tes Masuk & Wawancara",
      date: "20 - 25 April 2026",
      description: "Tes akademik + wawancara santai",
      benefit: "Konsultasi langsung dengan ustadz",
      status: "upcoming",
      icon: Users,
      color: "from-[var(--color-brown-700)] to-[var(--color-brown-800)]",
    },
    {
      phase: "Pengumuman Hasil",
      date: "1 Mei 2026",
      description: "Kelulusan diumumkan via email & WA",
      benefit: "Bonus diskon early bird 15%!",
      status: "upcoming",
      icon: Trophy,
      color: "from-[var(--color-gold-600)] to-[var(--color-gold-700)]",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Pendidikan Berkualitas",
      description: "Kurikulum terintegrasi dengan akreditasi A",
      proof: "95% alumni masuk PTN favorit",
    },
    {
      icon: Users,
      title: "Fasilitas Lengkap",
      description: "Asrama, masjid, lapangan olahraga, dan perpustakaan",
      proof: "Setara pesantren kota besar",
    },
    {
      icon: GraduationCap,
      title: "Pengajar Berpengalaman",
      description: "Ustadz dan guru profesional dengan sertifikasi",
      proof: "50+ guru lulusan Timur Tengah",
    },
    {
      icon: BookOpen,
      title: "Program Unggulan",
      description: "Tahfidz Qur'an, bahasa Arab, dan kitab kuning",
      proof: "Target 30 juz dalam 4 tahun",
    },
  ];

  const testimonials = [
    {
      name: "Ibu Siti Rahmawati",
      role: "Wali Santri Angkatan 2024",
      quote:
        "Awalnya ragu, tapi setelah survey langsung saya YAKIN! Anaknya sekarang sudah hafal 5 juz dalam 8 bulan. Luar biasa!",
      rating: 5,
    },
    {
      name: "Bapak Ahmad Fauzi",
      role: "Wali Santri Angkatan 2023",
      quote:
        "Proses pendaftaran GAMPANG banget! Cuma 10 menit online, langsung dapat konfirmasi. Fasilitasnya juga melebihi ekspektasi!",
      rating: 5,
    },
    {
      name: "Ibu Nurul Hidayah",
      role: "Wali Santri Angkatan 2024",
      quote:
        "Anak saya yang tadinya susah bangun subuh, sekarang malah NGINGETIN keluarga sholat. Ini mukjizat Al-Imam!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Apakah masih ada kuota untuk tahun ajaran 2026/2027?",
      a: "Ya! Saat ini masih tersisa 50 kursi dari total 150 kuota. Daftar sekarang untuk dapat nomor prioritas!",
    },
    {
      q: "Berapa biaya pendaftaran dan SPP per bulan?",
      a: "Biaya pendaftaran Rp 500.000 (sekali bayar). SPP mulai dari Rp 1.200.000/bulan. Ada diskon 15% untuk pendaftar sebelum 31 Maret!",
    },
    {
      q: "Apakah ada beasiswa untuk anak berprestasi?",
      a: "Ada! Kami sediakan beasiswa 50% untuk santri berprestasi akademik/non-akademik. Syarat: sertifikat juara minimal tingkat kabupaten.",
    },
  ];

  const urgencyStats = [
    { value: "500+", label: "Pendaftar 2025", icon: Users },
    { value: "50", label: "Kursi Tersisa", icon: AlertCircle },
    { value: "73", label: "Hari Lagi", icon: Calendar },
  ];

  return (
    <main className="pt-3 sm:pt-4 md:pt-5">
      {/* Hero Section - BROWN DOMINANT */}
      <section className="bg-gradient-to-br from-[var(--color-brown-50)] via-[var(--color-cream-100)] to-[var(--color-gold-50)] py-10 xs:py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="hidden sm:block absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[var(--color-brown-200)] rounded-full blur-3xl opacity-30" />
        <div className="hidden sm:block absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--color-gold-200)] rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] text-white px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-black mb-4 sm:mb-6 shadow-2xl animate-pulse border-2 border-white/50">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>HANYA 50 KURSI TERSISA UNTUK 2026/2027!</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              <span className="block text-[var(--color-brown-900)] mb-1 sm:mb-2">
                Jangan Sampai Menyesal
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brown-600)] via-[var(--color-brown-700)] to-[var(--color-brown-900)]">
                Karena Kehabisan Kuota!
              </span>
            </h1>

            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[var(--color-brown-800)] mb-3 sm:mb-4 leading-tight font-bold px-2 sm:px-0">
              Tahun Lalu 500+ Orang Tua Daftar, 350 Harus Ditolak Karena Penuh
            </p>

            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
              Anda sudah tahu kualitas Al-Imam. Anda sudah yakin ini tempat
              terbaik untuk anak.
              <span className="font-black text-[var(--color-brown-900)]">
                {" "}
                Satu-satunya yang menghalangi adalah KUOTA TERBATAS.
              </span>
            </p>

            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              {urgencyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-4 shadow-xl border-2 border-[var(--color-brown-200)]"
                >
                  <stat.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[var(--color-brown-600)] mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-xl xs:text-2xl sm:text-3xl font-black text-[var(--color-brown-900)] mb-0.5 sm:mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] xs:text-xs sm:text-xs font-bold text-[var(--color-brown-700)] leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="/daftar"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] text-white font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 sm:py-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 bg-gradient-to-r from-[var(--color-brown-700)] via-[var(--color-brown-800)] to-[var(--color-brown-900)] hover:from-[var(--color-brown-800)] hover:via-[var(--color-brown-900)] hover:to-black group mb-3 sm:mb-4 w-full sm:w-auto active:scale-95"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>DAFTAR SEKARANG & AMANKAN KUOTA!</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" />
            </a>

            <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] px-4 sm:px-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 text-[var(--color-brown-900)]" />
              Proses pendaftaran hanya{" "}
              <span className="font-black text-[var(--color-brown-900)]">
                10 menit
              </span>
              . Gratis konsultasi!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial - TEAL ACCENT */}
      <section className="bg-white py-10 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              BUKTI NYATA DARI ORANG TUA YANG SUDAH DAFTAR
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Mereka Sudah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)]">
                Merasakan Keputusan Terbaik
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] max-w-2xl mx-auto px-4 sm:px-0">
              Jangan sampai Anda menyesal seperti ratusan orang tua tahun lalu
              yang terlambat daftar!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-10">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-cream-100)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-teal-200)] shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-2 sm:mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[var(--color-gold-500)] text-[var(--color-gold-500)]"
                    />
                  ))}
                </div>
                <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] italic mb-3 sm:mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-[var(--color-teal-200)]">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--color-teal-600)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs xs:text-sm sm:text-sm text-[var(--color-brown-900)] truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-brown-600)] truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[var(--color-brown-100)] to-[var(--color-gold-50)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-brown-200)] text-center">
            <p className="text-base xs:text-lg sm:text-lg font-black text-[var(--color-brown-900)] flex items-center justify-center gap-2 flex-wrap">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>
                95% orang tua yang sudah daftar mengatakan: "Keputusan terbaik
                dalam hidup saya!"
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-brown-50)] py-10 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              INVESTASI TERBAIK UNTUK MASA DEPAN ANAK
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Ini Yang Akan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brown-600)] to-[var(--color-brown-800)]">
                Anak Anda Dapatkan
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] max-w-2xl mx-auto px-4 sm:px-0">
              Bukan janji kosong. Ini{" "}
              <span className="font-black text-[var(--color-brown-900)]">
                hasil nyata
              </span>{" "}
              yang sudah dibuktikan ribuan alumni!
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[var(--color-brown-200)] rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 xs:mb-3.5 sm:mb-4 bg-gradient-to-br from-[var(--color-brown-600)] to-[var(--color-brown-700)] shadow-lg group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-black text-sm xs:text-base sm:text-lg text-[var(--color-brown-900)] mb-1.5 sm:mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] mb-2 sm:mb-3 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="pt-2 sm:pt-3 border-t-2 border-[var(--color-brown-200)] w-full">
                    <p className="text-[10px] xs:text-xs sm:text-xs font-bold text-[var(--color-brown-800)] flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{benefit.proof}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-10 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PROSES MUDAH & TRANSPARAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              4 Langkah Mudah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brown-600)] to-[var(--color-brown-800)]">
                Menuju Masa Depan Cemerlang
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] max-w-2xl mx-auto px-4 sm:px-0">
              Tidak ribet, tidak bertele-tele.{" "}
              <span className="font-black text-[var(--color-brown-900)]">
                Hanya 10 menit
              </span>{" "}
              untuk mengamankan masa depan anak!
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 xs:space-y-5 sm:space-y-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-start gap-4 xs:gap-5 sm:gap-6 p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  item.status === "active"
                    ? "bg-gradient-to-r from-[var(--color-teal-50)] to-[var(--color-cream-100)] border-[var(--color-teal-400)] shadow-2xl"
                    : "bg-white border-[var(--color-brown-200)] hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-14 h-14 xs:w-16 xs:h-16 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br ${item.color}`}
                >
                  <item.icon className="w-7 h-7 xs:w-8 xs:h-8 sm:w-8 sm:h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-2">
                    <h3 className="font-black text-base xs:text-lg sm:text-xl text-[var(--color-brown-900)]">
                      {item.phase}
                    </h3>
                    {item.status === "active" && (
                      <span className="px-2.5 xs:px-3 py-1 bg-[var(--color-teal-600)] text-white text-[10px] xs:text-xs font-bold rounded-full animate-pulse inline-block w-fit">
                        SEDANG BERLANGSUNG
                      </span>
                    )}
                  </div>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-brown-800)] mb-2 sm:mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{item.date}</span>
                  </p>
                  <div className="bg-white/80 rounded-lg p-2.5 xs:p-3 sm:p-3 border border-[var(--color-teal-200)]">
                    <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-teal-800)] flex items-start gap-1.5 sm:gap-2">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <span>{item.benefit}</span>
                    </p>
                  </div>
                </div>

                <div className="hidden md:block text-5xl sm:text-6xl font-black text-[var(--color-brown-200)]">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center px-4 sm:px-0">
            <p className="text-base xs:text-lg sm:text-lg font-bold text-[var(--color-brown-700)] mb-3 sm:mb-4">
              Semakin cepat daftar, semakin besar peluang dapat{" "}
              <span className="text-[var(--color-brown-900)]">
                beasiswa & diskon!
              </span>
            </p>
            <a
              href="/daftar"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-900)] text-white font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 w-full sm:w-auto active:scale-95"
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Mulai Proses Pendaftaran Sekarang!</span>
            </a>
          </div>
        </div>
      </section>

      {/* Requirements Section - BROWN & TEAL */}
      <section className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-cream-100)] py-10 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PERSYARATAN MUDAH & STANDAR
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Tidak Ada Syarat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)]">
                Yang Menyulitkan!
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] max-w-2xl mx-auto px-4 sm:px-0">
              Dokumen standar yang{" "}
              <span className="font-black text-[var(--color-brown-900)]">
                sudah pasti Anda miliki
              </span>
              . Tidak ada syarat aneh-aneh!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 max-w-6xl mx-auto">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[var(--color-teal-200)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3 xs:gap-3.5 sm:gap-4 mb-5 xs:mb-5.5 sm:mb-6">
                  <div className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-[var(--color-teal-500)] to-[var(--color-teal-600)] shadow-lg flex-shrink-0">
                    <req.icon className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-base xs:text-lg sm:text-xl text-[var(--color-brown-900)] leading-tight">
                      {req.title}
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] leading-tight">
                      {req.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5 xs:space-y-3 sm:space-y-3">
                  {req.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3 p-2.5 xs:p-3 sm:p-3 rounded-lg sm:rounded-xl hover:bg-[var(--color-teal-50)] transition-all">
                        <CheckCircle className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[var(--color-teal-600)]" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs xs:text-sm sm:text-sm font-semibold text-[var(--color-brown-800)] block mb-1 leading-tight">
                            {item.text}
                          </span>
                          <span className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-teal-700)] font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                            <span>{item.benefit}</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 bg-white rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-teal-200)] max-w-3xl mx-auto text-center shadow-lg">
            <Shield className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-[var(--color-teal-600)] mx-auto mb-2.5 sm:mb-3" />
            <p className="text-base xs:text-lg sm:text-lg font-black text-[var(--color-brown-900)] mb-1.5 sm:mb-2 px-2 sm:px-0">
              Kesulitan Menyiapkan Dokumen? Tenang!
            </p>
            <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] px-4 sm:px-0">
              Tim kami siap membantu Anda{" "}
              <span className="font-bold text-[var(--color-teal-700)]">
                GRATIS
              </span>{" "}
              via WhatsApp/Telepon. Kami guide step-by-step sampai selesai!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - BROWN THEME */}
      <section className="bg-white py-10 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PERTANYAAN YANG SERING DITANYAKAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Masih Ragu?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brown-600)] to-[var(--color-brown-800)]">
                Kami Jawab Semua!
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 xs:space-y-4 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[var(--color-brown-50)] to-[var(--color-cream-100)] rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border-2 border-[var(--color-brown-200)] hover:shadow-xl transition-all"
              >
                <h3 className="font-black text-sm xs:text-base sm:text-lg text-[var(--color-brown-900)] mb-2.5 xs:mb-3 sm:mb-3 flex items-start gap-2.5 xs:gap-3 sm:gap-3 leading-tight">
                  <AlertCircle className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-[var(--color-brown-700)] flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] leading-relaxed pl-7 xs:pl-8 sm:pl-9">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center px-4 sm:px-0">
            <p className="text-base xs:text-lg sm:text-lg font-bold text-[var(--color-brown-700)] mb-3 sm:mb-4">
              Masih ada pertanyaan lain?
            </p>
            <a
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] hover:from-[var(--color-teal-700)] hover:to-[var(--color-teal-800)] text-white font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto active:scale-95"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Hubungi Kami Sekarang - Gratis!</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA - BROWN DOMINANT */}
      <section className="bg-gradient-to-br from-[var(--color-brown-800)] via-[var(--color-brown-900)] to-black py-10 xs:py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 hidden sm:block">
          <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--color-gold-500)] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[var(--color-teal-500)] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/25 backdrop-blur-md text-white px-4 xs:px-5 sm:px-5 py-2.5 xs:py-3 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-2xl mb-4 sm:mb-6 border-2 border-white/40">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>KEPUTUSAN YANG AKAN MENGUBAH HIDUP ANAK ANDA</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              Bayangkan 4 Tahun Lagi...
              <br />
              <span className="text-[var(--color-gold-300)]">
                Anak Anda Sudah Hafal 30 Juz!
              </span>
            </h2>

            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-3 sm:mb-4 font-black leading-tight px-4 sm:px-0">
              Sementara Teman Sebayanya Masih Bingung Cari Jati Diri
            </p>

            <p className="text-sm xs:text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Ini bukan mimpi.{" "}
              <span className="font-black text-[var(--color-gold-300)]">
                Ini sudah terjadi pada 500+ santri kami.
              </span>{" "}
              Pertanyaannya: Apakah anak Anda akan jadi salah satunya?
            </p>

            <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 text-white/90 text-xs xs:text-sm sm:text-sm px-4 sm:px-0">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">29 tahun</span>{" "}
                  terpercaya
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">500+ santri</span>{" "}
                  aktif
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">Akreditasi A</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">4.9/5</span> rating
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
              <a
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[var(--color-brown-900)] hover:bg-[var(--color-gold-100)] shadow-2xl font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 sm:py-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] group w-full sm:w-auto active:scale-95"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>DAFTAR SEKARANG - KUOTA TERBATAS!</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </a>

              <a
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent border-2 sm:border-3 border-white text-white hover:bg-white hover:text-[var(--color-brown-900)] font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 sm:py-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] w-full sm:w-auto active:scale-95"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Konsultasi Gratis Dulu</span>
              </a>
            </div>

            <div className="inline-flex items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)] text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl animate-pulse border-2 border-white/30 mx-4 sm:mx-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-white mt-0.5 sm:mt-0" />
              <div className="text-left">
                <p className="text-xs xs:text-sm sm:text-sm font-black tracking-wide text-white leading-tight">
                  PERHATIAN: Pendaftaran Ditutup 31 Maret 2026!
                </p>
                <p className="text-[10px] xs:text-xs sm:text-xs font-semibold text-white leading-tight">
                  Setelah itu, Anda harus tunggu 1 tahun lagi. Jangan sampai
                  menyesal!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
