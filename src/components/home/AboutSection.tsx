import Link from "next/link";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  BookHeart,
  CheckCircle,
  Trophy,
  Home,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function AboutSection() {
  const quickFacts = [
    {
      icon: Calendar,
      value: "29+",
      label: "Tahun",
      subtitle: "Sejak 1995",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
    },
    {
      icon: Users,
      value: "500+",
      label: "Santri",
      subtitle: "Putra & Putri",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-700",
    },
    {
      icon: GraduationCap,
      value: "50+",
      label: "Pengajar",
      subtitle: "Guru & Ustadz",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      iconColor: "text-amber-600",
      valueColor: "text-amber-700",
    },
  ];

  const visiMisi = [
    {
      icon: CheckCircle,
      label: "Visi:",
      text: "Mencetak generasi muslim yang rabbani, berilmu, dan bermanfaat",
    },
    {
      icon: CheckCircle,
      label: "Misi:",
      text: "Pendidikan Islami berbasis Al-Qur'an dan Sunnah sesuai pemahaman salaf",
    },
    {
      icon: CheckCircle,
      label: "Fokus:",
      text: "Pembentukan akhlak, hafalan Qur'an, penguasaan bahasa Arab, dan ilmu syar'i",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Kitab Kuning",
      description: "Metode pembelajaran Salaf",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: BookHeart,
      title: "Tahfidz Qur'an",
      description: "Program hafalan terstruktur",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <Section
      id="about-section"
      className="bg-white relative overflow-hidden py-16 md:py-24"
    >
      {/* Decorative Background */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gradient-to-tl from-amber-100/20 to-green-100/20 rounded-full blur-3xl -z-0" />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="lg:w-1/2 animate-fadeInLeft">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border-4 border-white">
              {/* Placeholder Image - 4:3 Ratio */}
              <div className="relative w-full pb-[75%] bg-gradient-to-br from-green-400 via-emerald-500 to-green-600">
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Home className="w-32 h-32 md:w-40 md:h-40 text-white opacity-20" />
                </div>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Accreditation Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Trophy className="w-4 h-4" />
                <span>Terakreditasi A</span>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {quickFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className={`text-center p-4 ${fact.bgColor} rounded-xl border ${fact.borderColor} hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <fact.icon
                      className={`${fact.iconColor} w-6 h-6 md:w-8 md:h-8 mb-2`}
                    />
                    <p className={`text-2xl font-bold ${fact.valueColor}`}>
                      {fact.value}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {fact.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {fact.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 text-green-600 font-bold text-sm uppercase tracking-wider mb-5 px-4 py-2.5 bg-green-50 rounded-full border border-green-100 animate-fadeInUp">
              <Home className="w-4 h-4" />
              <span>Tentang Al-Imam Al-Islami</span>
            </div>

            {/* Title */}
            <h2 className="animate-fadeInUp delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Pendidikan Berbasis{" "}
              <span className="text-green-600">Al-Qur'an</span> &{" "}
              <span className="text-emerald-600">As-Sunnah</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8 animate-fadeInUp delay-200">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                <strong>Pondok Pesantren Al-Imam Al-Islami</strong> didirikan
                pada tahun <strong className="text-green-600">1995</strong>{" "}
                dengan komitmen untuk mencetak generasi muslim yang rabbani,
                berilmu, dan bermanfaat bagi umat.
              </p>

              <p className="text-gray-700 text-base leading-relaxed">
                Kami mengintegrasikan pendidikan agama dengan ilmu umum dalam
                sistem pendidikan yang holistik, mengacu pada pemahaman{" "}
                <strong className="text-emerald-600">salafus shalih</strong>{" "}
                dengan metode pembelajaran yang modern dan efektif.
              </p>

              {/* Vision & Mission Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 md:p-6 rounded-xl border border-green-100 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-800 text-lg">
                    Visi & Misi
                  </h3>
                </div>
                <ul className="space-y-3">
                  {visiMisi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">
                          {item.label}
                        </span>
                        <span className="text-gray-700 ml-1">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fadeInUp delay-300">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <feature.icon className={`${feature.iconColor} w-5 h-5`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {feature.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="shadow-xl hover:shadow-2xl group animate-fadeInUp delay-500"
              asChild
            >
              <Link href="/tentang">
                <span className="text-sm md:text-base">
                  Selengkapnya Tentang Kami
                </span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
