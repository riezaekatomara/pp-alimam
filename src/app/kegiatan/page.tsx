"use client";

import { useState } from "react";
import {
  BookOpen,
  BookMarked,
  Target,
  Sun,
  Book,
  Moon,
  Users,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Heart,
  Home,
  BookText,
  Tent,
  Swords,
  Music,
  PenTool,
  Globe,
  MessageCircle,
  Dribbble,
  CheckCircle2,
  TrendingUp,
  Star,
  Zap,
  Shield,
  Trophy,
} from "lucide-react";

// ========================================
// TYPE DEFINITIONS
// ========================================

interface StatItem {
  label: string;
  value: string;
}

interface ResultItem {
  icon: any;
  text: string;
}

interface KegiatanUtama {
  image: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  bgColor: string;
  stats: StatItem[];
  results: ResultItem[];
  testimonial: {
    quote: string;
    parent: string;
  };
}

interface HeroStat {
  icon: any;
  value: string;
  label: string;
  sublabel: string;
}

interface JadwalHarian {
  icon: any;
  time: string;
  activity: string;
  detail: string;
  benefit: string;
  bgColor: string;
  iconColor: string;
}

interface KegiatanMingguan {
  title: string;
  desc: string;
  detail: string;
  benefit: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
}

interface Ekstrakurikuler {
  name: string;
  icon: any;
  desc: string;
  benefit: string;
}

// ========================================
// REUSABLE COMPONENTS
// ========================================

const FeatureCard = ({
  item,
  index,
}: {
  item: KegiatanUtama;
  index: number;
}) => (
  <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl border-2 border-amber-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
    <div className="grid lg:grid-cols-5 gap-0">
      {/* Image - Responsive height */}
      <div
        className={`relative h-44 xs:h-48 sm:h-56 lg:h-auto overflow-hidden lg:col-span-2 ${
          index % 2 === 0 ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}
        />

        {/* Success Badge - Responsive */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg shadow-lg">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-black text-amber-900">
              PROGRAM UNGGULAN
            </span>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div
        className={`p-4 xs:p-5 sm:p-5 lg:p-6 flex flex-col justify-center lg:col-span-3 ${
          index % 2 === 0 ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 ${item.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-2.5 sm:mb-3 group-hover:scale-110 transition-all duration-300`}
        >
          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Title - Responsive text */}
        <h3 className="text-base xs:text-lg sm:text-xl lg:text-xl font-black text-stone-900 mb-2 sm:mb-2.5 leading-tight">
          {item.title}
        </h3>

        {/* Description - Responsive text */}
        <p className="text-xs xs:text-sm sm:text-sm text-stone-600 mb-2.5 sm:mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {item.stats.map((stat, statIdx) => (
            <div
              key={statIdx}
              className="text-center p-2 sm:p-2.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200 hover:shadow-md transition-all hover:border-amber-300"
            >
              <div className="text-base xs:text-lg sm:text-xl lg:text-xl font-black text-amber-900 mb-0.5">
                {stat.value}
              </div>
              <div className="text-[9px] xs:text-[10px] sm:text-xs text-stone-600 font-semibold leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* HASIL NYATA - Responsive padding */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border-2 border-teal-200 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600" />
            <span className="text-[10px] xs:text-xs sm:text-xs font-black text-teal-900">
              HASIL NYATA SANTRI KAMI:
            </span>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {item.results.map((result, idx) => (
              <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                <result.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-xs text-stone-700 leading-relaxed font-medium">
                  {result.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Testimonial - Responsive padding */}
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-0.5 mb-1 sm:mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-[10px] xs:text-xs sm:text-xs italic text-stone-600 mb-1 sm:mb-1.5 leading-relaxed">
            "{item.testimonial.quote}"
          </p>
          <span className="text-[10px] xs:text-xs sm:text-xs font-bold text-stone-800">
            — {item.testimonial.parent}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, value, label, sublabel }: HeroStat) => (
  <div className="group bg-white/10 backdrop-blur-md px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 mx-auto mb-1 group-hover:scale-110 transition-transform" />
    <div className="text-xl xs:text-2xl sm:text-2xl font-black text-white group-hover:scale-110 transition-transform">
      {value}
    </div>
    <div className="text-xs xs:text-sm sm:text-sm text-white/80">{label}</div>
    <div className="text-[10px] xs:text-xs sm:text-xs text-white/70 mt-0.5 sm:mt-1">
      {sublabel}
    </div>
  </div>
);

const ScheduleCard = ({
  schedule,
  index,
}: {
  schedule: JadwalHarian;
  index: number;
}) => (
  <div
    className={`group p-4 xs:p-5 sm:p-6 xl:p-8 rounded-xl sm:rounded-2xl ${schedule.bgColor} border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2`}
  >
    <div className="flex items-start gap-3 xs:gap-4 sm:gap-5">
      <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0">
        <schedule.icon
          className={`${schedule.iconColor} w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs xs:text-sm sm:text-base xl:text-base font-bold text-amber-900 mb-1.5 sm:mb-2">
          {schedule.time}
        </div>
        <h3 className="text-base xs:text-lg sm:text-xl xl:text-xl font-black text-stone-900 mb-2 sm:mb-3 leading-tight">
          {schedule.activity}
        </h3>
        <p className="text-xs xs:text-sm sm:text-base xl:text-base text-stone-600 mb-3 sm:mb-4 leading-relaxed">
          {schedule.detail}
        </p>

        {/* Benefit Badge - Responsive */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-teal-200 shadow-sm">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
          <span className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-teal-900">
            {schedule.benefit}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const WeeklyActivityCard = ({
  activity,
  index,
}: {
  activity: KegiatanMingguan;
  index: number;
}) => (
  <div
    className={`group p-4 xs:p-5 sm:p-6 xl:p-7 rounded-xl sm:rounded-2xl ${activity.bg} border-2 ${activity.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 text-center`}
  >
    <div className="flex justify-center mb-3 xs:mb-4 sm:mb-5">
      <activity.icon
        className={`${activity.color} w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      />
    </div>
    <h4 className="font-black text-sm xs:text-base sm:text-lg xl:text-lg text-stone-900 mb-1.5 sm:mb-2">
      {activity.title}
    </h4>
    <p className="text-xs xs:text-sm sm:text-base xl:text-base text-stone-600 font-semibold mb-2 sm:mb-3">
      {activity.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-current/20 mb-3 sm:mb-4">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm text-stone-500 font-medium">
        {activity.detail}
      </p>
    </div>

    {/* Benefit - Responsive */}
    <div className="bg-white/70 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-teal-100 shadow-sm">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-teal-800 leading-tight">
        {activity.benefit}
      </p>
    </div>
  </div>
);

const EkskulCard = ({
  ekskul,
  index,
}: {
  ekskul: Ekstrakurikuler;
  index: number;
}) => (
  <div className="group p-4 xs:p-5 sm:p-5 xl:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-teal-100 shadow-lg hover:shadow-2xl hover:border-teal-400 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 text-center">
    <ekskul.icon className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 text-teal-600 mx-auto mb-3 xs:mb-3.5 sm:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
    <h4 className="font-black text-xs xs:text-sm sm:text-base xl:text-base text-stone-900 mb-1.5 sm:mb-2">
      {ekskul.name}
    </h4>
    <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm text-stone-600 mb-2 sm:mb-3 leading-relaxed">
      {ekskul.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-teal-100">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-teal-700">
        {ekskul.benefit}
      </p>
    </div>
  </div>
);

// ========================================
// MAIN COMPONENT
// ========================================

export default function KegiatanPage() {
  const kegiatanUtama: KegiatanUtama[] = [
    {
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
      title: "Pembelajaran Kitab Kuning",
      description:
        "Bukan sekadar hafalan! Santri kami PAHAM isi kitab, bisa berdebat ilmiah, dan siap jadi ulama muda yang membanggakan keluarga",
      icon: BookOpen,
      gradient: "from-stone-900/90 via-stone-800/70 to-amber-700/50",
      bgColor: "bg-stone-800",
      stats: [
        { label: "Kitab Dikuasai", value: "15+" },
        { label: "Ustadz Expert", value: "20+" },
        { label: "Jam/Hari", value: "4+" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "95% santri menguasai nahwu-shorof dalam 1 tahun",
        },
        { icon: Award, text: "Juara 1 Debat Kitab se-Jawa Barat 2024" },
        {
          icon: CheckCircle2,
          text: "Lulusan diterima di Universitas Al-Azhar & Madinah",
        },
      ],
      testimonial: {
        quote:
          "Anak saya sekarang bisa membaca kitab gundul sendiri! Dulu saya pikir itu mustahil untuk anak SMP",
        parent: "Ibu Siti Aminah, Wali Santri MTs",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
      title: "Program Tahfidz 30 Juz",
      description:
        "Target PASTI tercapai! Dengan metode terbukti, anak Anda bisa hafal 30 juz + PAHAM artinya. Bukan mimpi, ini JAMINAN kami!",
      icon: BookMarked,
      gradient: "from-amber-700/90 via-amber-600/70 to-teal-600/50",
      bgColor: "bg-amber-700",
      stats: [
        { label: "Target Hafalan", value: "30 Juz" },
        { label: "Metode Proven", value: "Talaqqi" },
        { label: "Setoran", value: "Harian" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Rata-rata 7-10 juz per tahun untuk santri rajin",
        },
        { icon: Award, text: "15 santri wisuda tahfidz 30 juz tahun 2024" },
        { icon: CheckCircle2, text: "Bacaan tartil + tajwid sempurna dijamin" },
      ],
      testimonial: {
        quote:
          "Dari 0 juz jadi 12 juz dalam 18 bulan! Ini bukan keajaiban, tapi sistem Al-Imam yang luar biasa",
        parent: "Bapak Ahmad Rifa'i, Wali Santri MA",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      title: "Ekstrakurikuler Prestasi",
      description:
        "Anak Anda TIDAK HANYA pintar ngaji! Mereka juga juara olimpiade, atlet berprestasi, dan public speaker handal. Komplit!",
      icon: Target,
      gradient: "from-teal-600/90 via-teal-700/70 to-stone-900/50",
      bgColor: "bg-teal-600",
      stats: [
        { label: "Pilihan Ekskul", value: "10+" },
        { label: "Pelatih Expert", value: "15+" },
        { label: "Jam/Minggu", value: "6+" },
      ],
      results: [
        { icon: Trophy, text: "Juara 1 Pencak Silat Popda Sukabumi 2024" },
        { icon: Award, text: "Finalis Olimpiade Sains Nasional (OSN) 2024" },
        {
          icon: CheckCircle2,
          text: "85% santri minimal kuasai 2 skill non-akademik",
        },
      ],
      testimonial: {
        quote:
          "Anak saya dulu pemalu, sekarang berani pidato di depan ratusan orang. Confidence-nya meningkat drastis!",
        parent: "Ibu Fatimah Zahra, Wali Santri Tahfidz",
      },
    },
  ];

  const heroStats: HeroStat[] = [
    {
      icon: BookOpen,
      value: "15+",
      label: "Kitab Kuning",
      sublabel: "Dikuasai dalam 4 tahun",
    },
    {
      icon: BookMarked,
      value: "30 Juz",
      label: "Target Hafalan",
      sublabel: "Dengan metode proven",
    },
    {
      icon: Target,
      value: "10+",
      label: "Ekstrakurikuler",
      sublabel: "Untuk bakat tersembunyi",
    },
  ];

  const jadwalHarian: JadwalHarian[] = [
    {
      icon: Sun,
      time: "04:30 - 07:00",
      activity: "Tahajud, Subuh & Tahfidz Pagi",
      detail:
        "Mulai hari dengan spiritualitas tinggi dan setoran hafalan segar",
      benefit: "Anak jadi disiplin bangun pagi seumur hidup",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: Book,
      time: "07:30 - 14:00",
      activity: "KBM Formal & Kajian Kitab",
      detail: "Sekolah formal (MTs/MA) + pembelajaran kitab kuning intensif",
      benefit: "Nilai rapor bagus + ilmu agama mendalam",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      iconColor: "text-stone-800",
    },
    {
      icon: Target,
      time: "15:30 - 17:00",
      activity: "Ekstrakurikuler & Olahraga",
      detail: "Pengembangan bakat terpendam dan kesehatan fisik",
      benefit: "Anak jadi multitalenta & percaya diri",
      bgColor: "bg-gradient-to-br from-teal-50 to-emerald-50",
      iconColor: "text-teal-600",
    },
    {
      icon: Moon,
      time: "19:30 - 21:00",
      activity: "Kajian Malam & Muhadharah",
      detail: "Pendalaman ilmu agama dan latihan public speaking",
      benefit: "Anak berani tampil & jadi pemimpin masa depan",
      bgColor: "bg-gradient-to-br from-stone-50 to-amber-50",
      iconColor: "text-stone-800",
    },
  ];

  const kegiatanMingguan: KegiatanMingguan[] = [
    {
      title: "Sholat Berjama'ah",
      desc: "5 Waktu Setiap Hari",
      detail: "Fardhu & Sunnah Rawatib",
      benefit: "Anak jadi taat beribadah seumur hidup",
      icon: Home,
      color: "text-stone-800",
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
      border: "border-amber-200",
    },
    {
      title: "Kajian Jum'at",
      desc: "Setiap Hari Jum'at",
      detail: "Tafsir & Hadits Mendalam",
      benefit: "Paham agama, bukan asal ikut-ikutan",
      icon: BookText,
      color: "text-amber-700",
      bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
      border: "border-yellow-200",
    },
    {
      title: "Muhadharah",
      desc: "Kamis Malam",
      detail: "Latihan Pidato & Khutbah",
      benefit: "Jadi public speaker handal sejak muda",
      icon: Users,
      color: "text-teal-700",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
      border: "border-teal-200",
    },
    {
      title: "Rihlah Ilmiyyah",
      desc: "Setiap Bulan",
      detail: "Kunjungan Edukatif",
      benefit: "Wawasan luas, tidak kuper",
      icon: Calendar,
      color: "text-stone-700",
      bg: "bg-gradient-to-br from-stone-50 to-amber-50",
      border: "border-stone-200",
    },
  ];

  const ekstrakurikuler: Ekstrakurikuler[] = [
    {
      name: "Pramuka",
      icon: Tent,
      desc: "Leadership & survival",
      benefit: "Jadi pemimpin tangguh",
    },
    {
      name: "Pencak Silat",
      icon: Swords,
      desc: "Bela diri tradisional",
      benefit: "Percaya diri & disiplin",
    },
    {
      name: "Tilawah",
      icon: BookOpen,
      desc: "Seni baca Qur'an",
      benefit: "Suara merdu & tartil",
    },
    {
      name: "Kaligrafi",
      icon: PenTool,
      desc: "Seni tulis Arab",
      benefit: "Kreativitas & kesabaran",
    },
    {
      name: "Nasyid",
      icon: Music,
      desc: "Vokal Islami",
      benefit: "Bakat seni tersalurkan",
    },
    {
      name: "Sepak Bola",
      icon: Dribbble,
      desc: "Olahraga tim",
      benefit: "Teamwork & sportivitas",
    },
    {
      name: "Bahasa Arab",
      icon: MessageCircle,
      desc: "Muhadatsah aktif",
      benefit: "Siap kuliah Timur Tengah",
    },
    {
      name: "Bahasa Inggris",
      icon: Globe,
      desc: "English club",
      benefit: "Global communication skill",
    },
  ];

  return (
    <>
      {/* Hero Section - Fully Responsive */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 flex items-center min-h-screen py-12 xs:py-16 sm:py-20">
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-600 rounded-full blur-3xl opacity-10 animate-float" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-amber-700 rounded-full blur-3xl opacity-10 animate-float delay-500" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/15 backdrop-blur-md text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl border border-white/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              TERBUKTI MENGUBAH HIDUP ANAK
            </span>
          </div>

          {/* Hero Title - Responsive */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Anak Anda Bukan Sekadar
            <br />
            <span className="text-amber-400">Menghafal & Belajar</span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-3 sm:mb-4 leading-relaxed font-bold px-4 sm:px-0">
            Mereka PAHAM Agama, JUARA Akademik, dan PERCAYA DIRI Tampil di Mana
            Saja
          </p>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Program terstruktur 24 jam yang sudah{" "}
            <span className="font-black text-amber-400">
              terbukti menghasilkan 500+ alumni sukses
            </span>{" "}
            di PTN favorit & universitas Timur Tengah
          </p>

          <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-5 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            {heroStats.map((stat, idx) => (
              <StatsCard key={idx} {...stat} />
            ))}
          </div>

          {/* Urgency Badge - Responsive */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-stone-700 to-amber-800 text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl animate-pulse border-2 border-amber-500/40 mx-4 sm:mx-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs xs:text-sm sm:text-sm font-black text-white">
                KUOTA TERBATAS!
              </p>
              <p className="text-[10px] xs:text-xs sm:text-xs text-amber-100">
                Hanya 100 kursi untuk tahun ajaran 2026/2027
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kegiatan Utama Section - Responsive */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PROGRAM YANG MENGUBAH MASA DEPAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Bukan Janji Kosong, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-600">
                Ini Bukti Nyata!
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              <span className="font-black text-teal-700">
                500+ orang tua membuktikan:
              </span>{" "}
              Anak mereka kembali ke rumah dengan prestasi gemilang dan akhlak
              mulia
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {kegiatanUtama.map((item, idx) => (
              <FeatureCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Jadwal Harian Section - Responsive */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-stone-800 to-amber-800 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              TIDAK ADA WAKTU TERBUANG SIA-SIA
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Setiap Menit </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-600">
                Membentuk Karakter Juara
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Rutinitas terstruktur yang{" "}
              <span className="font-black text-teal-700">sudah terbukti</span>{" "}
              menghasilkan santri disiplin, cerdas, dan berakhlak mulia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-12">
            {jadwalHarian.map((schedule, idx) => (
              <ScheduleCard key={idx} schedule={schedule} index={idx} />
            ))}
          </div>

          {/* Success Rate - Responsive */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 lg:p-10 text-center text-white shadow-2xl">
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black">
                92% Orang Tua Melaporkan:
              </h3>
            </div>
            <p className="text-base xs:text-lg sm:text-xl lg:text-xl font-bold mb-1.5 sm:mb-2 leading-tight px-4 sm:px-0">
              "Anak saya LEBIH DISIPLIN & MANDIRI dalam 6 bulan pertama mondok"
            </p>
            <p className="text-xs xs:text-sm sm:text-sm text-white/90 px-4 sm:px-0">
              Berdasarkan survei kepuasan 2024 dari 500+ responden
            </p>
          </div>
        </div>
      </section>

      {/* Kegiatan Mingguan Section - Responsive */}
      <section className="bg-gradient-to-br from-stone-50 via-teal-50 to-emerald-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              BONUS KEGIATAN PREMIUM
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Bonus Kegiatan </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Tanpa Biaya Tambahan
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Program mingguan & bulanan yang memperkaya pengalaman spiritual &
              sosial anak{" "}
              <span className="font-black text-teal-700">100% GRATIS</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {kegiatanMingguan.map((activity, idx) => (
              <WeeklyActivityCard key={idx} activity={activity} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section - Responsive */}
      <section className="bg-gradient-to-br from-teal-50 via-emerald-50 to-stone-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-teal-700 to-stone-800 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              BAKAT TERSEMBUNYI ANAK ANDA
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Tidak Cuma Pintar Ngaji, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Juga Juara Kompetisi!
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              <span className="font-black text-teal-700">85% santri kami</span>{" "}
              minimal menguasai 2 skill non-akademik. Dari atlet berprestasi
              hingga public speaker handal!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 mb-8 sm:mb-12">
            {ekstrakurikuler.map((ekskul, idx) => (
              <EkskulCard key={idx} ekskul={ekskul} index={idx} />
            ))}
          </div>

          {/* Achievement Showcase - Responsive */}
          <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 lg:p-10 border-2 border-amber-300 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black text-amber-900 mb-1.5 sm:mb-2">
                Prestasi Gemilang 2024
              </h3>
              <p className="text-xs xs:text-sm sm:text-base lg:text-base text-stone-700 font-semibold px-4 sm:px-0">
                Bukti nyata santri kami bukan hanya pintar ngaji
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 xs:gap-6 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <Trophy className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-amber-700 mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-amber-900 mb-1.5 sm:mb-2">
                  15+
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-stone-800 mb-1">
                  Juara Kompetisi 2024
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-stone-600">
                  Olimpiade & Lomba Regional
                </p>
              </div>
              <div className="text-center">
                <Award className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-teal-700 mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-teal-900 mb-1.5 sm:mb-2">
                  Juara 1
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-stone-800 mb-1">
                  Pencak Silat Popda
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-stone-600">
                  Sukabumi 2024
                </p>
              </div>
              <div className="text-center">
                <Star className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-yellow-700 mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-yellow-900 mb-1.5 sm:mb-2">
                  Finalis
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-stone-800 mb-1">
                  OSN Nasional
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-stone-600">
                  Sains & Matematika 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Fully Responsive */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/15 backdrop-blur-md text-white px-4 xs:px-5 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-2xl mb-4 sm:mb-6 border-2 border-white/20">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              INVESTASI TERBAIK UNTUK MASA DEPAN ANAK
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              Masih Ragu?
              <br />
              <span className="text-amber-400">Lihat Sendiri Buktinya!</span>
            </h2>

            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-3 sm:mb-4 font-black leading-tight px-4 sm:px-0">
              Ratusan Orang Tua Sudah Merasakan Perubahan Luar Biasa
            </p>

            <p className="text-sm xs:text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Dari yang susah dibangunin subuh, sekarang malah ngingetin
              sekeluarga waktu sholat.{" "}
              <span className="font-black text-amber-400">
                Ini bukan keajaiban, tapi hasil sistem pendidikan kami.
              </span>
            </p>

            {/* Trust Indicators - Responsive Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10 text-white/90 text-xs xs:text-sm sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/20">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">29 tahun</span>{" "}
                  pengalaman
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/20">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">500+ santri</span>{" "}
                  aktif
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/20">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">Terakreditasi A</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/20">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">4.9/5</span> rating
                </span>
              </div>
            </div>

            {/* CTA Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
              <a
                href="/ppdb"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-9 py-3.5 xs:py-4 sm:py-5 bg-white text-stone-900 hover:bg-amber-50 shadow-2xl font-bold text-sm xs:text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Daftar PPDB 2026/2027
                <span className="group-hover:translate-x-1 transition-transform text-base sm:text-lg">
                  →
                </span>
              </a>
              <a
                href="/fasilitas"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-9 py-3.5 xs:py-4 sm:py-5 bg-transparent border-2 sm:border-3 border-white text-white hover:bg-white hover:text-stone-900 font-bold text-sm xs:text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Lihat Fasilitas Lengkap
              </a>
            </div>

            {/* Urgency Message - Responsive */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-stone-700 to-amber-800 text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl animate-pulse border-2 border-amber-500/40 mx-4 sm:mx-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-amber-300" />
              <div className="text-left">
                <p className="text-xs xs:text-sm sm:text-sm font-black tracking-wide text-white">
                  PERHATIAN: Kuota Hampir Penuh!
                </p>
                <p className="text-[10px] xs:text-xs sm:text-xs font-semibold text-amber-100">
                  Hanya tersisa 23 kursi untuk gelombang 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
