import Link from "next/link";
import {
  MessageCircle,
  Star,
  TrendingUp,
  Share2,
  Trophy,
  User,
  Users,
  GraduationCap,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Bapak H. Ahmad Rifa'i",
      role: "Wali Santri MTs Al-Imam",
      initial: "A",
      color: "from-green-500 to-emerald-600",
      delay: "100",
      location: "Bogor",
      years: "2 Tahun",
      icon: User,
      iconColor: "text-green-600",
      quote:
        "Alhamdulillah, sejak anak saya mondok di Al-Imam, perubahan akhlaknya sangat signifikan. Kedisiplinan dalam sholat berjama'ah dan hafalan Qur'annya meningkat pesat. Pendidikan agama yang kuat diimbangi dengan pendidikan formal yang baik.",
      tags: [
        { icon: TrendingUp, label: "Peningkatan Akhlak", color: "green" },
        { icon: GraduationCap, label: "Disiplin Ibadah", color: "emerald" },
      ],
    },
    {
      name: "Ibu Siti Fatimah, S.Pd",
      role: "Wali Santri MA Al-Imam",
      initial: "S",
      color: "from-amber-500 to-orange-600",
      delay: "200",
      location: "Sukabumi",
      years: "3 Tahun",
      icon: User,
      iconColor: "text-amber-600",
      quote:
        "Sebagai seorang guru, saya sangat memperhatikan kualitas pendidikan. Al-Imam memberikan pendidikan terpadu yang seimbang antara ilmu agama dan umum. Ustadz dan ustadzahnya sangat perhatian, komunikasi dengan orang tua juga terjaga baik.",
      tags: [
        { icon: GraduationCap, label: "Latar Belakang Guru", color: "amber" },
        { icon: MessageCircle, label: "Komunikasi Baik", color: "orange" },
      ],
    },
    {
      name: "Bapak Drs. Muhammad Yusuf",
      role: "Wali Santri Tahfidz",
      initial: "M",
      color: "from-blue-500 to-cyan-600",
      delay: "300",
      location: "Jakarta",
      years: "4 Tahun",
      icon: GraduationCap,
      iconColor: "text-blue-600",
      quote:
        "Program tahfidz di Al-Imam sangat terstruktur. Anak saya yang awalnya hanya hafal beberapa juz, sekarang sudah menyelesaikan 15 juz dengan tartil. Metode muroja'ah yang rutin sangat membantu.",
      specialNote: "Progress: 15 Juz dalam 3 tahun dengan mutqin",
      tags: [
        { icon: GraduationCap, label: "Program Tahfidz", color: "blue" },
        { icon: TrendingUp, label: "Progress Terukur", color: "cyan" },
      ],
    },
    {
      name: "Keluarga Bapak Abdullah",
      role: "Wali 3 Santri Al-Imam",
      initial: "A",
      color: "from-purple-500 to-violet-600",
      delay: "400",
      location: "Depok",
      years: "5+ Tahun",
      icon: Users,
      iconColor: "text-purple-600",
      quote:
        "Tiga anak kami semua sekolah di Al-Imam, dari MTs sampai MA. Lingkungan pesantren yang asri di kaki gunung sangat mendukung konsentrasi belajar. Biaya yang terjangkau dengan kualitas pendidikan yang excellent.",
      specialNote: "Pekerjaan Orang Tua: Wiraswasta",
      tags: [
        { icon: Users, label: "Multi Anak", color: "purple" },
        { icon: TrendingUp, label: "Biaya Terjangkau", color: "violet" },
      ],
    },
  ];

  const stats = [
    {
      value: "95%",
      label: "Kepuasan Orang Tua",
      sublabel: "Berdasarkan survey tahunan",
      icon: Star,
      color: "text-green-600",
    },
    {
      value: "85%",
      label: "Rekomendasi ke Kerabat",
      sublabel: "Santri merekomendasikan",
      icon: Share2,
      color: "text-emerald-600",
    },
    {
      value: "4.8/5",
      label: "Rating Ustadz/Pengajar",
      sublabel: "Kompetensi mengajar",
      icon: Star,
      color: "text-amber-600",
    },
    {
      value: "90%",
      label: "Peningkatan Prestasi",
      sublabel: "Akademik & Non-Akademik",
      icon: Trophy,
      color: "text-blue-600",
    },
  ];

  return (
    <Section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
      <Container size="lg">
        {/* Badge */}
        <div className="text-center mb-6 animate-fadeIn">
          <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md border border-green-100">
            <MessageCircle className="inline w-4 h-4 mr-1 -mt-0.5" />
            TESTIMONI WALI SANTRI
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 animate-fadeInUp">
          Apa Kata Wali Santri Al-Imam?
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-lg animate-fadeInUp">
          Kepercayaan Orang Tua dalam Mendidik Putra-Putri adalah Amanah Kami
        </p>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp group"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}
                  >
                    {item.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{item.role}</span>
                      <span className="text-gray-400">•</span>
                      <span>{item.location}</span>
                      <span className="text-gray-400">•</span>
                      <span>{item.years}</span>
                    </div>
                  </div>
                </div>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <div className="absolute -left-2 top-0 text-4xl text-gray-200 opacity-50">
                  "
                </div>
                <p className="text-gray-700 italic leading-relaxed pl-4">
                  {item.quote}
                </p>
              </div>

              {/* Special Note */}
              {item.specialNote && (
                <div
                  className={`${
                    idx === 2
                      ? "bg-blue-50 border-blue-100"
                      : "bg-purple-50 border-purple-100"
                  } p-3 rounded-lg border mb-4`}
                >
                  <p
                    className={`${
                      idx === 2 ? "text-blue-800" : "text-purple-800"
                    } text-sm flex items-center gap-2`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      <strong>
                        {idx === 2 ? "Progress:" : "Pekerjaan Orang Tua:"}
                      </strong>{" "}
                      {idx === 2
                        ? "15 Juz dalam 3 tahun dengan mutqin"
                        : "Wiraswasta"}
                    </span>
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className={`px-3 py-1 bg-${tag.color}-50 text-${tag.color}-700 text-xs font-medium rounded-full border border-${tag.color}-100`}
                  >
                    <tag.icon className="inline w-3 h-3 mr-1 -mt-0.5" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div
          className="mt-12 bg-white rounded-2xl shadow-lg border border-green-100 p-6 animate-fadeInUp"
          style={{ animationDelay: "500ms" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4">
                <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </p>
                <p className="text-gray-700 font-medium flex items-center justify-center gap-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  {stat.label}
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-10 animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan keluarga yang telah mempercayakan
            pendidikan putra-putri mereka kepada{" "}
            <span className="font-bold text-green-600">
              Pondok Pesantren Al-Imam Al-Islami
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-lg hover:shadow-xl" asChild>
              <Link href="/kontak">
                <Phone className="w-4 h-4" />
                <span>Konsultasi Pendaftaran</span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              asChild
            >
              <Link href="/testimoni">
                <MessageCircle className="w-4 h-4" />
                <span>Lihat Testimoni Lainnya</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
