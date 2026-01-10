import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import {
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  GraduationCap,
} from "lucide-react";

export default function HeroSection() {
  const stats = [
    {
      icon: Calendar,
      value: "29+",
      label: "Tahun Berdiri",
      subtitle: "Sejak 1995",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      value: "500+",
      label: "Santri Aktif",
      subtitle: "Putra & Putri",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: GraduationCap,
      value: "50+",
      label: "Tenaga Pengajar",
      subtitle: "Guru & Ustadz",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Award,
      value: "A",
      label: "Akreditasi",
      subtitle: "BAN S/M",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-white pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl -z-0 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-tr from-amber-200/10 to-green-200/10 rounded-full blur-3xl -z-0 animate-float delay-500"></div>

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Content Left */}
          <div className="lg:w-1/2 animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <i className="fas fa-mosque text-white text-base"></i>
              <span>Pondok Pesantren Terakreditasi A</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Mencetak Generasi Muslim yang{" "}
              <span className="text-gradient-green">Rabbani</span>,{" "}
              <span className="text-gradient-green">Berilmu</span>, dan{" "}
              <span className="text-gradient-gold">Bermanfaat</span>
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
              Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman
              salafus shalih. Mengintegrasikan ilmu agama dengan ilmu umum untuk
              membentuk pribadi muslim yang paripurna.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fadeInUp delay-200">
              <Button
                size="lg"
                className="shadow-xl hover:shadow-2xl text-base"
                asChild
              >
                <Link href="/daftar">
                  <i className="fas fa-file-signature mr-2"></i>
                  Daftar Sekarang
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl text-base"
                asChild
              >
                <Link href="/login">
                  <i className="fas fa-lock mr-2"></i>
                  Login Santri
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-500 text-amber-600 hover:bg-amber-50 shadow-lg hover:shadow-xl text-base"
                asChild
              >
                <Link href="#kontak">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Jadwal Kunjungan
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl animate-fadeInUp delay-300">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 md:p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`${stat.bgColor} rounded-full p-3 mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon
                        className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`}
                      />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Right */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-0 animate-fadeInUp delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="/images/hero.png"
                alt="Santri Pondok Pesantren Al-Imam Al-Islami"
                className="w-full h-[350px] md:h-[500px] object-cover"
                loading="eager"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent"></div>
            </div>

            {/* Floating Contact Badge */}
            <div className="absolute -bottom-4 -right-3 md:-bottom-6 md:-right-4 bg-white rounded-2xl shadow-2xl px-4 py-3 md:px-5 md:py-4 hover:scale-105 transition-transform duration-300 border border-green-100 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium">
                    Hubungi Kami
                  </p>
                  <a
                    href="tel:02667345601"
                    className="text-sm font-bold text-gray-900 hover:text-green-600 transition-colors"
                  >
                    (0266) 734-5601
                  </a>
                  <a
                    href="mailto:info@ponpesalimam.ac.id"
                    className="text-xs text-gray-500 truncate max-w-[160px] md:max-w-[180px] block hover:text-green-600 transition-colors"
                  >
                    info@ponpesalimam.ac.id
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
