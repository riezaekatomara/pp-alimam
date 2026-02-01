"use client";

import {
  School,
  Home,
  BookOpen,
  Wifi,
  Utensils,
  Heart,
  Shield,
  Building,
  Building2,
  FlaskConical,
  MonitorPlay,
  Cpu,
  Award,
  CheckCircle2,
  Sparkles,
  Users,
  Droplet,
  Zap,
  Video,
  Lightbulb,
  Wind,
  Check,
  Calendar,
  MapPin,
  Phone,
  Clock,
  Star,
  TrendingUp,
  Trophy,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Container } from "@/components/layout/Container";

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

interface FasilitasUtama {
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

interface FasilitasPendukung {
  icon: any;
  title: string;
  desc: string;
  benefit: string;
  color: string;
  bg: string;
  border: string;
}

interface Spesifikasi {
  label: string;
  value: string;
  icon: any;
}

interface Keunggulan {
  title: string;
  desc: string;
  detail: string;
  benefit: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
}

// ========================================
// REUSABLE COMPONENTS - RESPONSIVE
// ========================================

const FeatureCard = ({
  item,
  index,
}: {
  item: FasilitasUtama;
  index: number;
}) => (
  <ScrollAnimation
    delay={index * 0.1}
    className="group bg-white dark:bg-[var(--color-cream-200)] rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border border-[var(--color-cream-300)] dark:border-[var(--color-cream-400)] overflow-hidden transition-all duration-500 hover:-translate-y-1"
  >
    <div className="grid lg:grid-cols-5 gap-0">
      {/* Image - Responsive */}
      <div
        className={`relative h-44 xs:h-48 sm:h-56 lg:h-full overflow-hidden lg:col-span-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"
          }`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}
        />

        {/* Success Badge - Responsive */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg border border-[var(--color-gold-200)]">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--color-gold-700)]" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-black text-[var(--color-brown-900)] tracking-wide">
              FASILITAS UNGGULAN
            </span>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding - REDUCED PADDING HERE */}
      <div
        className={`p-4 xs:p-5 sm:p-5 lg:p-6 flex flex-col justify-center lg:col-span-3 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"
          }`}
      >
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 ${item.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-2.5 sm:mb-3 group-hover:scale-110 transition-all duration-300`}
        >
          <item.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
        </div>

        {/* Title - Responsive */}
        <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-black text-[var(--color-brown-900)] mb-1.5 sm:mb-2 leading-tight font-display">
          {item.title}
        </h3>

        {/* Description - Responsive */}
        <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-600)] mb-2.5 sm:mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {item.stats.map((stat, statIdx) => (
            <div
              key={statIdx}
              className="text-center p-2 sm:p-2.5 bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-gold-50)] rounded-lg sm:rounded-xl border border-[var(--color-gold-200)] hover:shadow-md transition-all hover:border-[var(--color-gold-300)]"
            >
              <div className="text-base xs:text-lg sm:text-lg lg:text-xl font-black text-[var(--color-gold-800)] mb-0.5">
                {stat.value}
              </div>
              <div className="text-[9px] xs:text-[10px] sm:text-xs text-[var(--color-text-600)] font-semibold tracking-wide leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* KEUNGGULAN - Responsive */}
        <div className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)] rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-[var(--color-teal-200)] mb-2.5 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)]" />
            <span className="text-[10px] xs:text-xs sm:text-xs font-black text-[var(--color-teal-800)] tracking-wide">
              KEUNGGULAN FASILITAS INI:
            </span>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {item.results.map((result, idx) => (
              <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                <result.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-teal-600)] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-text-700)] leading-relaxed font-medium">
                  {result.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Testimonial - Responsive */}
        <div className="bg-white dark:bg-[var(--color-cream-300)] rounded-lg p-2.5 sm:p-3 border border-[var(--color-cream-200)] dark:border-[var(--color-cream-400)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-0.5 mb-1 sm:mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[var(--color-gold-400)] text-[var(--color-gold-400)]"
              />
            ))}
          </div>
          <p className="text-[10px] xs:text-xs sm:text-xs italic text-[var(--color-text-600)] mb-1 sm:mb-1.5 leading-relaxed">
            "{item.testimonial.quote}"
          </p>
          <span className="text-[10px] xs:text-xs sm:text-xs font-bold text-[var(--color-text-800)]">
            — {item.testimonial.parent}
          </span>
        </div>
      </div>
    </div>
  </ScrollAnimation>
);

const StatsCard = ({ icon: Icon, value, label, sublabel }: HeroStat) => (
  <div className="group bg-white/10 backdrop-blur-md px-4 xs:px-5 sm:px-6 py-3.5 xs:py-4 sm:py-5 rounded-lg sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
    <div className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform">
      {value}
    </div>
    <div className="text-xs xs:text-sm sm:text-base lg:text-base text-white/80 font-semibold">
      {label}
    </div>
    <div className="text-[10px] xs:text-xs sm:text-xs text-white/70 mt-0.5 sm:mt-1">
      {sublabel}
    </div>
  </div>
);

const SupportFacilityCard = ({
  facility,
  index,
}: {
  facility: FasilitasPendukung;
  index: number;
}) => (
  <ScrollAnimation
    delay={index * 0.1}
    className={`group p-4 xs:p-5 sm:p-5 rounded-xl sm:rounded-2xl ${facility.bg} dark:bg-[var(--color-cream-200)] border-2 ${facility.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center`}
  >
    <facility.icon
      className={`${facility.color} w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 mx-auto mb-3 xs:mb-3.5 sm:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
    />
    <h4 className="font-black text-sm xs:text-base sm:text-base text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
      {facility.title}
    </h4>
    <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-600)] mb-3 sm:mb-4 leading-relaxed">
      {facility.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-current/10">
      <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-teal-700)]">
        {facility.benefit}
      </p>
    </div>
  </ScrollAnimation>
);

const AdvantageCard = ({
  advantage,
  index,
}: {
  advantage: Keunggulan;
  index: number;
}) => (
  <ScrollAnimation
    delay={index * 0.1}
    className={`group p-4 xs:p-5 sm:p-5 rounded-xl sm:rounded-2xl ${advantage.bg} dark:bg-[var(--color-cream-200)] border-2 ${advantage.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center`}
  >
    <div className="flex justify-center mb-3 xs:mb-4 sm:mb-5">
      <advantage.icon
        className={`${advantage.color} w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      />
    </div>
    <h4 className="font-black text-base xs:text-lg sm:text-lg text-[var(--color-brown-900)] mb-2 sm:mb-3 font-display">
      {advantage.title}
    </h4>
    <p className="text-sm xs:text-base sm:text-base text-[var(--color-text-600)] font-semibold mb-2 sm:mb-3">
      {advantage.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-current/10 mb-3 sm:mb-4">
      <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-500)] font-medium">
        {advantage.detail}
      </p>
    </div>

    {/* Benefit */}
    <div className="bg-white/70 rounde-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-[var(--color-teal-200)] shadow-sm">
      <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-teal-800)] leading-tight">
        {advantage.benefit}
      </p>
    </div>
  </ScrollAnimation>
);

// ========================================
// MAIN COMPONENT - FULLY RESPONSIVE
// ========================================

export default function FasilitasPage() {
  const fasilitasUtama: FasilitasUtama[] = [
    {
      image:
        "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
      title: "Masjid Jami'",
      description:
        "Masjid 2 lantai yang luas dan nyaman sebagai pusat kegiatan ibadah santri. Dilengkapi dengan pendingin ruangan dan karpet yang bersih.",
      icon: Home,
      gradient: "from-[var(--color-teal-700)]/90 via-[var(--color-teal-600)]/70 to-[var(--color-teal-600)]/50",
      bgColor: "bg-[var(--color-teal-600)]",
      stats: [
        { label: "Kapasitas", value: "500+" },
        { label: "Lantai", value: "2" },
        { label: "Fasilitas", value: "AC" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Suasana sejuk & nyaman untuk khusyuk beribadah",
        },
        { icon: Award, text: "Sound system jernih untuk kajian & ceramah" },
        {
          icon: CheckCircle2,
          text: "Perpustakaan mini dengan koleksi kitab",
        },
      ],
      testimonial: {
        quote:
          "Masjidnya luas dan bersih, membuat anak-anak nyaman beribadah.",
        parent: "Ibu Nurul Hidayah, Wali Santri MTs",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      title: "Asrama Santri",
      description:
        "Kamar asrama yang representatif, bersih, dan memiliki ventilasi yang baik. Setiap kamar diawasi oleh musyrif untuk memastikan ketertiban.",
      icon: Building,
      gradient: "from-[var(--color-brown-700)]/90 via-[var(--color-brown-600)]/70 to-[var(--color-gold-600)]/50",
      bgColor: "bg-[var(--color-brown-600)]",
      stats: [
        { label: "Total Kamar", value: "50+" },
        { label: "Per Kamar", value: "4-6" },
        { label: "Keamanan", value: "24/7" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Kebersihan kamar terjaga setiap hari",
        },
        { icon: Award, text: "Pengawasan 24 jam oleh keamanan pesantren" },
        { icon: CheckCircle2, text: "Lemari pribadi untuk setiap santri" },
      ],
      testimonial: {
        quote:
          "Fasilitas asrama cukup memadai dan kondusif untuk istirahat santri.",
        parent: "Bapak Hendra Wijaya, Wali Santri MA",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      title: "Ruang Kelas",
      description:
        "Ruang belajar yang kondusif dilengkapi dengan AC dan media pembelajaran multimedia untuk mendukung kegiatan belajar mengajar yang efektif.",
      icon: School,
      gradient: "from-[var(--color-gold-600)]/90 via-[var(--color-gold-700)]/70 to-[var(--color-brown-600)]/50",
      bgColor: "bg-[var(--color-gold-600)]",
      stats: [
        { label: "Ruang Kelas", value: "30+" },
        { label: "Kapasitas", value: "25-30" },
        { label: "Koneksi", value: "WiFi" },
      ],
      results: [
        { icon: Trophy, text: "Pendingin ruangan (AC) di setiap kelas" },
        { icon: Award, text: "Proyektor untuk pembelajaran interaktif" },
        {
          icon: CheckCircle2,
          text: "Akses internet untuk materi pembelajaran",
        },
      ],
      testimonial: {
        quote:
          "Ruang kelasnya nyaman dan mendukung proses belajar anak.",
        parent: "Ibu Siti Rahmawati, Wali Santri Tahfidz",
      },
    },
  ];

  const heroStats: HeroStat[] = [
    {
      icon: Building,
      value: "50+",
      label: "Kamar Asrama",
      sublabel: "Bersih & nyaman",
    },
    {
      icon: School,
      value: "30+",
      label: "Ruang Kelas",
      sublabel: "Ber-AC & proyektor",
    },
    {
      icon: BookOpen,
      value: "3000+",
      label: "Koleksi Buku",
      sublabel: "Perpustakaan lengkap",
    },
  ];

  const fasilitasPendukung: FasilitasPendukung[] = [
    {
      icon: BookOpen,
      title: "Perpustakaan",
      desc: "3000+ buku Islam, sains, dan novel inspiratif",
      benefit: "Wawasan luas & cinta baca",
      color: "text-[var(--color-teal-600)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-gold-50)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      icon: FlaskConical,
      title: "Laboratorium",
      desc: "Lab IPA, Komputer, dan Bahasa lengkap",
      benefit: "Praktik langsung & paham mendalam",
      color: "text-[var(--color-gold-600)]",
      bg: "bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-gold-200)]",
    },
    {
      icon: MonitorPlay,
      title: "Ruang Multimedia",
      desc: "Audio visual & presentasi modern",
      benefit: "Public speaking sejak dini",
      color: "text-[var(--color-teal-600)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      icon: Wifi,
      title: "WiFi 100Mbps",
      desc: "Internet cepat 24/7 untuk belajar",
      benefit: "Akses ilmu tanpa batas",
      color: "text-[var(--color-teal-500)]",
      bg: "bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-cream-200)]",
    },
    {
      icon: Utensils,
      title: "Dapur & Kantin",
      desc: "Makanan bergizi 3x sehari & snack",
      benefit: "Anak tumbuh sehat & kuat",
      color: "text-[var(--color-gold-500)]",
      bg: "bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-gold-200)]",
    },
    {
      icon: Heart,
      title: "UKS & Klinik",
      desc: "Dokter & perawat siaga 24 jam",
      benefit: "Kesehatan terjaga maksimal",
      color: "text-[var(--color-teal-500)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      icon: Shield,
      title: "Keamanan 24/7",
      desc: "Security & CCTV di seluruh area",
      benefit: "Orang tua tenang & aman",
      color: "text-[var(--color-teal-600)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-cream-50)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      icon: Building2,
      title: "Aula Serbaguna",
      desc: "Kapasitas 300+ untuk acara besar",
      benefit: "Tempat event & wisuda megah",
      color: "text-[var(--color-gold-600)]",
      bg: "bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-gold-50)]",
      border: "border-[var(--color-cream-200)]",
    },
  ];

  const keunggulanFasilitas: Keunggulan[] = [
    {
      title: "Lingkungan Islami",
      desc: "Setiap Hari",
      detail: "Suasana pesantren kondusif",
      benefit: "Anak jadi sholeh/solehah alami",
      icon: Home,
      color: "text-[var(--color-teal-700)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-gold-50)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      icon: Sparkles,
      title: "Kebersihan Terjaga",
      desc: "Setiap Hari",
      detail: "Cleaning service profesional",
      benefit: "Bebas penyakit & hidup sehat",
      color: "text-[var(--color-gold-700)]",
      bg: "bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-gold-200)]",
    },
    {
      title: "Teknologi Modern",
      desc: "Fasilitas Digital",
      detail: "Integrasi teknologi pembelajaran",
      benefit: "Anak tidak gaptek & update",
      icon: Cpu,
      color: "text-[var(--color-teal-700)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      title: "Keamanan Maksimal",
      desc: "24/7 Non-Stop",
      detail: "Security & CCTV lengkap",
      benefit: "Orang tua tidur nyenyak",
      icon: Shield,
      color: "text-[var(--color-teal-700)]",
      bg: "bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-teal-50)]",
      border: "border-[var(--color-cream-200)]",
    },
  ];

  const spesifikasiAsrama: Spesifikasi[] = [
    { label: "Kapasitas/Kamar", value: "4-6 Santri", icon: Users },
    { label: "Total Kamar", value: "50+ Kamar", icon: Home },
    { label: "Kamar Mandi", value: "Dalam & Luar", icon: Droplet },
    { label: "Listrik", value: "24 Jam", icon: Zap },
    { label: "Air Bersih", value: "PAM & Sumur", icon: Droplet },
    { label: "Keamanan", value: "CCTV", icon: Video },
  ];

  const spesifikasiKelas: Spesifikasi[] = [
    { label: "Kapasitas", value: "25-30 Siswa", icon: School },
    { label: "Fasilitas", value: "AC & Proyektor", icon: MonitorPlay },
    { label: "Internet", value: "WiFi 100 Mbps", icon: Wifi },
    { label: "Meja & Kursi", value: "Ergonomis", icon: Check },
    { label: "Pencahayaan", value: "LED", icon: Lightbulb },
    { label: "Ventilasi", value: "Optimal", icon: Wind },
  ];

  return (
    <>
      {/* Hero Section - Fully Responsive */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brown-900)] via-[var(--color-brown-800)] to-[var(--color-brown-950)] flex items-center min-h-screen py-12 xs:py-16 sm:py-20">
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-gold-500)] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-brown-700)] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-4 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/10 backdrop-blur-md text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl border border-white/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              FASILITAS PESANTREN
            </span>
          </div>

          {/* Hero Title - Responsive */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0 font-display">
            Sarana & Prasarana
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal-300)] to-[var(--color-teal-400)]">
              Penunjang Pendidikan
            </span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[var(--color-cream-100)] max-w-4xl mx-auto mb-3 sm:mb-4 leading-relaxed font-bold px-4 sm:px-0">
            Mendukung kenyamanan dan kelancaran kegiatan belajar mengajar para santri.
          </p>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Kami menyediakan fasilitas yang memadai untuk menunjang aktivitas harian santri, baik akademik maupun non-akademik.
          </p>

          <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-6 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            {heroStats.map((stat, idx) => (
              <StatsCard key={idx} {...stat} />
            ))}
          </div>

          {/* Visit Badge - Responsive */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[var(--color-brown-900)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-[var(--color-gold-400)]/30 mx-4 sm:mx-0">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-gold-400)]" />
            <div className="text-left">
              <p className="text-xs xs:text-sm sm:text-sm font-black text-white">
                LOKASI STRATEGIS
              </p>
              <p className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-cream-200)]">
                Lingkungan asri dan kondusif untuk belajar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Utama Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] via-[var(--color-cream-100)] to-[var(--color-brown-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              SARANA UTAMA
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              Fasilitas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Pendidikan Terpadu
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Fasilitas utama yang menjadi pusat kegiatan santri dalam menuntut ilmu dan beribadah.
            </p>
          </ScrollAnimation>

          <div className="space-y-8 sm:space-y-12">
            {fasilitasUtama.map((item, idx) => (
              <FeatureCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* Fasilitas Pendukung Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-100)] via-[var(--color-brown-50)] to-[var(--color-cream-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-600)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PENUNJANG
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              Fasilitas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Pendukung
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Berbagai fasilitas pendukung untuk memaksimalkan potensi dan kenyamanan santri.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
            {fasilitasPendukung.map((facility, idx) => (
              <SupportFacilityCard key={idx} facility={facility} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* Spesifikasi Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] via-[var(--color-gold-50)] to-[var(--color-brown-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-700)] to-[var(--color-teal-900)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              DETAIL SPESIFIKASI
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              Informasi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Detail
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8">
            {/* Spesifikasi Asrama - Responsive */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 shadow-xl border border-[var(--color-teal-200)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--color-teal-600)] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-[var(--color-brown-900)] font-display">
                    Spesifikasi Asrama
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-600)]">
                    Detail lengkap kamar santri
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {spesifikasiAsrama.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[var(--color-teal-50)] border border-[var(--color-teal-200)] text-center hover:shadow-md transition-shadow"
                  >
                    <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-teal-600)] mx-auto mb-2 sm:mb-3" />
                    <div className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-text-600)] mb-0.5 sm:mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs xs:text-sm sm:text-sm font-black text-[var(--color-teal-700)]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spesifikasi Kelas - Responsive */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 shadow-xl border border-[var(--color-gold-200)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--color-gold-600)] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <School className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-[var(--color-brown-900)] font-display">
                    Spesifikasi Kelas
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-600)]">
                    Detail lengkap ruang belajar
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {spesifikasiKelas.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[var(--color-gold-50)] border border-[var(--color-gold-200)] text-center hover:shadow-md transition-shadow"
                  >
                    <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-gold-700)] mx-auto mb-2 sm:mb-3" />
                    <div className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-text-600)] mb-0.5 sm:mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs xs:text-sm sm:text-sm font-black text-[var(--color-gold-700)]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Keunggulan Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-teal-50)] via-[var(--color-emerald-50)] to-[var(--color-stone-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              KEUNGGULAN FASILITAS
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              <span className="text-[var(--color-brown-900)]">Lingkungan Belajar </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)]">
                Yang Kondusif
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Dirancang khusus untuk mendukung kenyamanan dan fokus belajar santri.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {keunggulanFasilitas.map((advantage, idx) => (
              <AdvantageCard key={idx} advantage={advantage} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* Kunjungi Pesantren Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-teal-50)] via-[var(--color-gold-50)] to-[var(--color-teal-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <ScrollAnimation className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-4 sm:mb-6">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              SURVEY LANGSUNG GRATIS
            </span>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              <span className="text-[var(--color-brown-900)]">Masih Ragu? </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Lihat Sendiri Buktinya!
              </span>
            </h2>

            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-text-700)] max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              Kami terbuka untuk kunjungan. Survey GRATIS, tidak ada paksaan
              daftar. Lihat fasilitas, bertemu ustadz, dan rasakan suasananya!
            </p>
          </div>

          {/* Info Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-10">
            {/* Jam Kunjungan */}
            <div className="group p-5 xs:p-6 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-[var(--color-teal-200)] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 xs:w-15 xs:h-15 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-teal-500)] to-[var(--color-teal-600)] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-black text-sm xs:text-base sm:text-base text-stone-900 mb-1.5 sm:mb-2">
                Jam Kunjungan
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm text-stone-600 font-semibold">
                Senin - Jumat
                <br />
                09:00 - 15:00 WIB
              </p>
            </div>

            {/* Kontak */}
            <div className="group p-5 xs:p-6 sm:p-6 bg-white rounded-xl sm:rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 xs:w-15 xs:h-15 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-black text-sm xs:text-base sm:text-base text-stone-900 mb-1.5 sm:mb-2">
                Hubungi Kami
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm text-stone-600 font-semibold">
                +62 857-2225-3236
                <br />
                WhatsApp & Telepon
              </p>
            </div>

            {/* Lokasi */}
            <div className="group p-5 xs:p-6 sm:p-6 bg-white rounded-xl sm:rounded-2xl border-2 border-teal-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 xs:w-15 xs:h-15 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-black text-sm xs:text-base sm:text-base text-stone-900 mb-1.5 sm:mb-2">
                Lokasi Pesantren
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm text-stone-600 font-semibold">
                Kp. Pupunjul, Cikembar
                <br />
                Sukabumi, Jawa Barat
              </p>
            </div>
          </div>

          {/* CTA Buttons - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 justify-center px-4 sm:px-0">
            <a
              href="/kontak"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-7 lg:px-9 py-3.5 xs:py-4 sm:py-4 lg:py-5 bg-gradient-to-r from-emerald-600 to-amber-600 text-white hover:from-emerald-700 hover:to-amber-700 shadow-2xl font-bold text-sm xs:text-base sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Jadwalkan Kunjungan
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/6285722253236?text=Assalamualaikum%2C%20saya%20ingin%20survey%20fasilitas%20Pondok%20Pesantren%20Al-Imam%20Al-Islami"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-7 lg:px-9 py-3.5 xs:py-4 sm:py-4 lg:py-5 bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-2xl font-bold text-sm xs:text-base sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              WhatsApp Langsung
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollAnimation>
      </section>

      {/* Final CTA Section - Fully Responsive */}
      <section className="bg-gradient-to-br from-amber-900 via-emerald-900 to-teal-800 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/25 backdrop-blur-md text-white px-4 xs:px-5 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-2xl mb-4 sm:mb-6 border-2 border-white/40">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              MARI BERGABUNG BERSAMA KAMI
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              Wujudkan Generasi
              <br />
              <span className="text-emerald-300">
                Rabbani & Berprestasi
              </span>
            </h2>

            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-3 sm:mb-4 font-black leading-tight px-4 sm:px-0">
              Lingkungan pendidikan yang mendukung tumbuh kembang santri secara optimal
            </p>

            <p className="text-sm xs:text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Bergabunglah bersama keluarga besar Pondok Pesantren Al-Imam Al-Islami dan persiapkan masa depan putra-putri Anda dengan bekal ilmu agama dan umum yang seimbang.
            </p>

            {/* Trust Indicators - Responsive Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10 text-white/90 text-xs xs:text-sm sm:text-sm px-4 sm:px-0">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">29 tahun</span>{" "}
                  pengalaman
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">500+ santri</span>{" "}
                  aktif
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">Terakreditasi A</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">4.9/5</span> rating
                </span>
              </div>
            </div>

            {/* CTA Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 lg:gap-5 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
              <a
                href="/ppdb"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-7 lg:px-9 py-3.5 xs:py-4 sm:py-4 lg:py-5 bg-white text-emerald-900 hover:bg-emerald-100 shadow-2xl font-bold text-sm xs:text-base sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Daftar PPDB 2026/2027
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/kegiatan"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 xs:px-7 sm:px-7 lg:px-9 py-3.5 xs:py-4 sm:py-4 lg:py-5 bg-transparent border-2 sm:border-3 border-white text-white hover:bg-white hover:text-emerald-900 font-bold text-sm xs:text-base sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[44px] active:scale-95"
              >
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />
                Lihat Kegiatan Santri
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
