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
  <div className="group bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border-2 border-emerald-200 overflow-hidden transition-all duration-500 hover:-translate-y-1">
    <div className="grid lg:grid-cols-5 gap-0">
      {/* Image - Responsive */}
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
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-amber-200">
          <div className="flex items-center gap-1 sm:gap-2">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-amber-700" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-black text-amber-900 tracking-wide">
              FASILITAS UNGGULAN
            </span>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div
        className={`p-4 xs:p-5 sm:p-6 lg:p-8 flex flex-col justify-center lg:col-span-3 ${
          index % 2 === 0 ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bgColor} rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300`}
        >
          <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        {/* Title - Responsive */}
        <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-black text-stone-900 mb-2 sm:mb-3 leading-tight">
          {item.title}
        </h3>

        {/* Description - Responsive */}
        <p className="text-xs xs:text-sm sm:text-base text-stone-600 mb-3 sm:mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-5">
          {item.stats.map((stat, statIdx) => (
            <div
              key={statIdx}
              className="text-center p-2 sm:p-3 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-lg sm:rounded-xl border border-amber-200 hover:shadow-md transition-all hover:border-amber-300"
            >
              <div className="text-base xs:text-lg sm:text-xl lg:text-2xl font-black text-amber-800 mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-[9px] xs:text-[10px] sm:text-xs text-stone-600 font-semibold tracking-wide leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* KEUNGGULAN - Responsive */}
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-emerald-200 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span className="text-[10px] xs:text-xs sm:text-sm font-black text-emerald-800 tracking-wide">
              KEUNGGULAN FASILITAS INI:
            </span>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            {item.results.map((result, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3">
                <result.icon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {result.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Testimonial - Responsive */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-0.5 mb-1.5 sm:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm italic text-stone-600 mb-1.5 sm:mb-2 leading-relaxed">
            "{item.testimonial.quote}"
          </p>
          <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-stone-800">
            — {item.testimonial.parent}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, value, label, sublabel }: HeroStat) => (
  <div className="group bg-white/20 backdrop-blur-md px-4 xs:px-5 sm:px-6 py-3.5 xs:py-4 sm:py-5 rounded-lg sm:rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
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
  <div
    className={`group p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl ${facility.bg} border-2 ${facility.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center`}
  >
    <facility.icon
      className={`${facility.color} w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 mx-auto mb-3 xs:mb-3.5 sm:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
    />
    <h4 className="font-black text-sm xs:text-base sm:text-base text-stone-900 mb-1.5 sm:mb-2">
      {facility.title}
    </h4>
    <p className="text-xs xs:text-sm sm:text-sm text-stone-600 mb-3 sm:mb-4 leading-relaxed">
      {facility.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-emerald-100">
      <p className="text-xs xs:text-sm sm:text-sm font-bold text-emerald-700">
        {facility.benefit}
      </p>
    </div>
  </div>
);

const AdvantageCard = ({
  advantage,
  index,
}: {
  advantage: Keunggulan;
  index: number;
}) => (
  <div
    className={`group p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl ${advantage.bg} border-2 ${advantage.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center`}
  >
    <div className="flex justify-center mb-3 xs:mb-4 sm:mb-5">
      <advantage.icon
        className={`${advantage.color} w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      />
    </div>
    <h4 className="font-black text-base xs:text-lg sm:text-lg text-stone-900 mb-2 sm:mb-3">
      {advantage.title}
    </h4>
    <p className="text-sm xs:text-base sm:text-base text-stone-600 font-semibold mb-2 sm:mb-3">
      {advantage.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-current/20 mb-3 sm:mb-4">
      <p className="text-xs xs:text-sm sm:text-sm text-stone-500 font-medium">
        {advantage.detail}
      </p>
    </div>

    {/* Benefit */}
    <div className="bg-white/70 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border-2 border-emerald-100 shadow-sm">
      <p className="text-xs xs:text-sm sm:text-sm font-bold text-emerald-800 leading-tight">
        {advantage.benefit}
      </p>
    </div>
  </div>
);

// ========================================
// MAIN COMPONENT - FULLY RESPONSIVE
// ========================================

export default function FasilitasPage() {
  const fasilitasUtama: FasilitasUtama[] = [
    {
      image:
        "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
      title: "Masjid & Musholla Megah",
      description:
        "BUKAN masjid biasa! Masjid 2 lantai ber-AC dengan sound system berkualitas. Anak Anda sholat dalam kenyamanan seperti di masjid kota besar!",
      icon: Home,
      gradient: "from-emerald-700/90 via-emerald-600/70 to-teal-600/50",
      bgColor: "bg-emerald-600",
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
          text: "Perpustakaan mini dengan 1000+ buku Islam",
        },
      ],
      testimonial: {
        quote:
          "Masjidnya luas dan bersih! Anak saya bilang lebih nyaman sholat di sini daripada di rumah",
        parent: "Ibu Nurul Hidayah, Wali Santri MTs",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      title: "Asrama Nyaman & Aman",
      description:
        "Kamar asrama BUKAN seperti kos-kosan kumuh! Bersih, rapi, ventilasi baik, dan dijaga 24/7. Orang tua tenang, anak nyaman!",
      icon: Building,
      gradient: "from-amber-700/90 via-amber-600/70 to-emerald-600/50",
      bgColor: "bg-amber-600",
      stats: [
        { label: "Total Kamar", value: "50+" },
        { label: "Per Kamar", value: "4-6" },
        { label: "Keamanan", value: "24/7" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Kamar bersih dibersihkan rutin setiap hari",
        },
        { icon: Award, text: "CCTV & security guard di setiap sudut asrama" },
        { icon: CheckCircle2, text: "Lemari pribadi untuk setiap santri" },
      ],
      testimonial: {
        quote:
          "Awalnya khawatir anak tidak betah di asrama, ternyata kamarnya rapih dan dia sangat nyaman!",
        parent: "Bapak Hendra Wijaya, Wali Santri MA",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      title: "Ruang Kelas Modern",
      description:
        "Belajar di kelas ber-AC dengan proyektor LCD dan WiFi! Seperti sekolah favorit di kota, tapi dengan nilai-nilai pesantren!",
      icon: School,
      gradient: "from-teal-600/90 via-emerald-700/70 to-amber-600/50",
      bgColor: "bg-teal-600",
      stats: [
        { label: "Ruang Kelas", value: "30+" },
        { label: "Kapasitas", value: "25-30" },
        { label: "WiFi", value: "100Mbps" },
      ],
      results: [
        { icon: Trophy, text: "AC di setiap kelas untuk kenyamanan belajar" },
        { icon: Award, text: "Proyektor LCD untuk pembelajaran interaktif" },
        {
          icon: CheckCircle2,
          text: "WiFi cepat untuk akses materi online",
        },
      ],
      testimonial: {
        quote:
          "Kelasnya keren banget! Anak saya bilang lebih canggih dari SMP negeri di kota",
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
      color: "text-emerald-600",
      bg: "bg-gradient-to-br from-emerald-50 to-amber-50",
      border: "border-emerald-200",
    },
    {
      icon: FlaskConical,
      title: "Laboratorium",
      desc: "Lab IPA, Komputer, dan Bahasa lengkap",
      benefit: "Praktik langsung & paham mendalam",
      color: "text-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-emerald-50",
      border: "border-amber-200",
    },
    {
      icon: MonitorPlay,
      title: "Ruang Multimedia",
      desc: "Audio visual & presentasi modern",
      benefit: "Public speaking sejak dini",
      color: "text-teal-600",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
      border: "border-teal-200",
    },
    {
      icon: Wifi,
      title: "WiFi 100Mbps",
      desc: "Internet cepat 24/7 untuk belajar",
      benefit: "Akses ilmu tanpa batas",
      color: "text-emerald-500",
      bg: "bg-gradient-to-br from-stone-50 to-emerald-50",
      border: "border-stone-200",
    },
    {
      icon: Utensils,
      title: "Dapur & Kantin",
      desc: "Makanan bergizi 3x sehari & snack",
      benefit: "Anak tumbuh sehat & kuat",
      color: "text-amber-500",
      bg: "bg-gradient-to-br from-amber-50 to-teal-50",
      border: "border-amber-200",
    },
    {
      icon: Heart,
      title: "UKS & Klinik",
      desc: "Dokter & perawat siaga 24 jam",
      benefit: "Kesehatan terjaga maksimal",
      color: "text-teal-500",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
      border: "border-teal-200",
    },
    {
      icon: Shield,
      title: "Keamanan 24/7",
      desc: "Security & CCTV di seluruh area",
      benefit: "Orang tua tenang & aman",
      color: "text-emerald-600",
      bg: "bg-gradient-to-br from-emerald-50 to-stone-50",
      border: "border-emerald-200",
    },
    {
      icon: Building2,
      title: "Aula Serbaguna",
      desc: "Kapasitas 300+ untuk acara besar",
      benefit: "Tempat event & wisuda megah",
      color: "text-amber-600",
      bg: "bg-gradient-to-br from-stone-50 to-amber-50",
      border: "border-stone-200",
    },
  ];

  const keunggulanFasilitas: Keunggulan[] = [
    {
      title: "Lingkungan Islami",
      desc: "Setiap Hari",
      detail: "Suasana pesantren kondusif",
      benefit: "Anak jadi sholeh/solehah alami",
      icon: Home,
      color: "text-emerald-700",
      bg: "bg-gradient-to-br from-emerald-50 to-amber-50",
      border: "border-emerald-200",
    },
    {
      icon: Sparkles,
      title: "Kebersihan Terjaga",
      desc: "Setiap Hari",
      detail: "Cleaning service profesional",
      benefit: "Bebas penyakit & hidup sehat",
      color: "text-amber-700",
      bg: "bg-gradient-to-br from-amber-50 to-emerald-50",
      border: "border-amber-200",
    },
    {
      title: "Teknologi Modern",
      desc: "Fasilitas Digital",
      detail: "Integrasi teknologi pembelajaran",
      benefit: "Anak tidak gaptek & update",
      icon: Cpu,
      color: "text-teal-700",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
      border: "border-teal-200",
    },
    {
      title: "Keamanan Maksimal",
      desc: "24/7 Non-Stop",
      detail: "Security & CCTV lengkap",
      benefit: "Orang tua tidur nyenyak",
      icon: Shield,
      color: "text-emerald-700",
      bg: "bg-gradient-to-br from-stone-50 to-emerald-50",
      border: "border-stone-200",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-emerald-800 to-teal-800 flex items-center min-h-screen py-12 xs:py-16 sm:py-20">
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-700 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-4 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/20 backdrop-blur-md text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl border border-white/30">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              FASILITAS KELAS DUNIA
            </span>
          </div>

          {/* Hero Title - Responsive */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Anak Anda Layak Dapat
            <br />
            <span className="text-emerald-300">Fasilitas Terbaik!</span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-3 sm:mb-4 leading-relaxed font-bold px-4 sm:px-0">
            Belajar di Pesantren BUKAN Berarti Hidup Susah & Serba Kekurangan
          </p>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Fasilitas lengkap & modern yang{" "}
            <span className="font-black text-emerald-300">
              setara sekolah favorit di kota
            </span>
            , tapi dengan lingkungan Islami yang membentuk akhlak mulia
          </p>

          <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-6 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            {heroStats.map((stat, idx) => (
              <StatsCard key={idx} {...stat} />
            ))}
          </div>

          {/* Urgency Badge - Responsive */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-800 to-emerald-800 text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl animate-pulse border-2 border-amber-400/30 mx-4 sm:mx-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
            <div className="text-left">
              <p className="text-xs xs:text-sm sm:text-sm font-black text-white">
                LIHAT LANGSUNG!
              </p>
              <p className="text-[10px] xs:text-xs sm:text-xs text-emerald-100">
                Kunjungi pesantren & buktikan sendiri
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Utama Section - Responsive */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50 to-emerald-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              FASILITAS YANG MEMBANGGAKAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Bukan Janji, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Ini Bukti Nyata!
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              <span className="font-black text-emerald-700">
                500+ orang tua sudah survey langsung:
              </span>{" "}
              Fasilitas kami JAUH LEBIH BAIK dari yang mereka bayangkan!
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {fasilitasUtama.map((item, idx) => (
              <FeatureCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Pendukung Section - Responsive */}
      <section className="bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              BONUS FASILITAS PREMIUM
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Fasilitas Pendukung </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Tanpa Biaya Tambahan
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Semua fasilitas ini{" "}
              <span className="font-black text-emerald-700">
                SUDAH TERMASUK dalam biaya pesantren
              </span>
              . Tidak ada biaya tersembunyi!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
            {fasilitasPendukung.map((facility, idx) => (
              <SupportFacilityCard key={idx} facility={facility} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Spesifikasi Section - Responsive */}
      <section className="bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-700 to-amber-700 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              DETAIL SPESIFIKASI
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Lihat Detail </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Spesifikasi Lengkap
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Tidak ada yang kami sembunyikan.{" "}
              <span className="font-black text-emerald-700">
                Transparansi penuh
              </span>{" "}
              untuk kepercayaan Anda!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8">
            {/* Spesifikasi Asrama - Responsive */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 shadow-xl border-2 border-emerald-200">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-stone-900">
                    Spesifikasi Asrama
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-stone-600">
                    Detail lengkap kamar santri
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {spesifikasiAsrama.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200 text-center hover:shadow-md transition-shadow"
                  >
                    <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mx-auto mb-2 sm:mb-3" />
                    <div className="text-[10px] xs:text-xs sm:text-xs text-stone-600 mb-0.5 sm:mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs xs:text-sm sm:text-sm font-black text-emerald-700">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spesifikasi Kelas - Responsive */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 shadow-xl border-2 border-amber-200">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <School className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-stone-900">
                    Spesifikasi Kelas
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-stone-600">
                    Detail lengkap ruang belajar
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {spesifikasiKelas.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-center hover:shadow-md transition-shadow"
                  >
                    <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-700 mx-auto mb-2 sm:mb-3" />
                    <div className="text-[10px] xs:text-xs sm:text-xs text-stone-600 mb-0.5 sm:mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs xs:text-sm sm:text-sm font-black text-amber-700">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Section - Responsive */}
      <section className="bg-gradient-to-br from-teal-50 via-emerald-50 to-stone-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              MENGAPA MEMILIH KAMI
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">4 Keunggulan </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Yang Tidak Dimiliki Pesantren Lain
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              <span className="font-black text-emerald-700">
                Bandingkan dengan pesantren lain
              </span>
              , Anda akan tahu perbedaannya!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {keunggulanFasilitas.map((advantage, idx) => (
              <AdvantageCard key={idx} advantage={advantage} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Kunjungi Pesantren Section - Responsive */}
      <section className="bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-600 to-amber-700 text-white px-4 xs:px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-4 sm:mb-6">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              SURVEY LANGSUNG GRATIS
            </span>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              <span className="text-stone-900">Masih Ragu? </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Lihat Sendiri Buktinya!
              </span>
            </h2>

            <p className="text-sm xs:text-base sm:text-lg text-stone-700 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              Kami terbuka untuk kunjungan. Survey GRATIS, tidak ada paksaan
              daftar. Lihat fasilitas, bertemu ustadz, dan rasakan suasananya!
            </p>
          </div>

          {/* Info Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-10">
            {/* Jam Kunjungan */}
            <div className="group p-5 xs:p-6 sm:p-6 bg-white rounded-xl sm:rounded-2xl border-2 border-emerald-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 xs:w-15 xs:h-15 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
        </div>
      </section>

      {/* Final CTA Section - Fully Responsive */}
      <section className="bg-gradient-to-br from-amber-900 via-emerald-900 to-teal-800 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/25 backdrop-blur-md text-white px-4 xs:px-5 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-2xl mb-4 sm:mb-6 border-2 border-white/40">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              INVESTASI TERBAIK UNTUK MASA DEPAN
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              Jangan Sampai Menyesal
              <br />
              <span className="text-emerald-300">
                Karena Salah Pilih Pesantren!
              </span>
            </h2>

            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-3 sm:mb-4 font-black leading-tight px-4 sm:px-0">
              Fasilitas Terbaik = Kenyamanan Maksimal = Prestasi Gemilang
            </p>

            <p className="text-sm xs:text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Orang tua lain sudah survey & langsung yakin daftar.{" "}
              <span className="font-black text-emerald-300">
                Jangan sampai kehabisan kuota!
              </span>
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

            {/* Urgency Message - PERBAIKAN WARNA */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-800 to-emerald-800 text-white px-6 py-4 rounded-2xl shadow-2xl animate-pulse border-2 border-amber-400/30">
              <Zap className="w-6 h-6 flex-shrink-0 text-amber-300" />
              <div className="text-left">
                <p className="text-sm font-black tracking-wide text-white">
                  SURVEY SEKARANG JUGA!
                </p>
                <p className="text-xs font-semibold text-emerald-100">
                  Banyak orang tua yang sudah booking survey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
