"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Phone, Calendar, Award, Users, GraduationCap } from "lucide-react";

export default function HeroSection() {
  const stats = [
    {
      icon: Calendar,
      value: "29+",
      label: "Tahun Berdiri",
      subtitle: "Sejak 1995",
      color: "#6B4423",
      bgColor: "#F5E6D3",
    },
    {
      icon: Users,
      value: "500+",
      label: "Santri Aktif",
      subtitle: "Putra & Putri",
      color: "#8B5A3C",
      bgColor: "#FDF6EC",
    },
    {
      icon: GraduationCap,
      value: "50+",
      label: "Tenaga Pengajar",
      subtitle: "Guru & Ustadz",
      color: "#DAA520",
      bgColor: "#FFF9E6",
    },
    {
      icon: Award,
      value: "A",
      label: "Akreditasi",
      subtitle: "BAN S/M",
      color: "#6B4423",
      bgColor: "#F5E6D3",
    },
  ];

  return (
    <section
      className="relative overflow-hidden h-screen flex items-center"
      style={{
        background:
          "linear-gradient(to bottom right, #FDF6EC 0%, #FFFBF0 50%, #ffffff 100%)",
      }}
    >
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl -z-0 animate-float"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(213, 180, 140, 0.15), rgba(245, 230, 211, 0.15))",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl -z-0 animate-float delay-500"
        style={{
          background:
            "linear-gradient(to top right, rgba(218, 165, 32, 0.08), rgba(213, 180, 140, 0.08))",
        }}
      />

      <Container
        size="lg"
        className="relative z-10 pt-32 md:pt-36 lg:pt-32 pb-6"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 lg:gap-8">
          {/* Content Left */}
          <div className="lg:w-1/2 animate-fadeInUp">
            {/* Badge - UPDATED: Balanced size */}
            <div
              className="inline-flex items-center gap-2 text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-2 shadow-lg hover:shadow-xl transition-shadow"
              style={{
                background: "linear-gradient(to right, #6B4423, #4A2C19)",
              }}
            >
              <i className="fas fa-mosque text-white text-xs md:text-sm" />
              <span>Pondok Pesantren Terakreditasi A</span>
            </div>

            {/* Title - UPDATED: Bigger but balanced */}
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-2">
              <span style={{ color: "#6B4423" }}>
                Mencetak Generasi Muslim{" "}
              </span>
              <span style={{ color: "#6B4423" }}>yang </span>
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #6B4423, #8B5A3C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Rabbani
              </span>
              <span style={{ color: "#6B4423" }}>, </span>
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #6B4423, #8B5A3C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Berilmu
              </span>
              <span style={{ color: "#6B4423" }}>, </span>
              <span style={{ color: "#6B4423" }}>dan </span>
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #DAA520, #B8860B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Bermanfaat
              </span>
            </h1>

            {/* Description - UPDATED: Better readability */}
            <p className="text-gray-700 text-xs md:text-sm mb-3 leading-relaxed max-w-2xl text-justify">
              Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman
              salafus shalih. Mengintegrasikan ilmu agama dengan ilmu umum untuk
              membentuk pribadi muslim yang paripurna.
            </p>

            {/* CTA Buttons - UPDATED: Better spacing */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3 animate-fadeInUp delay-200">
              <Button
                size="md"
                className="shadow-xl hover:shadow-2xl text-xs md:text-sm text-white font-semibold"
                style={{
                  background: "linear-gradient(to right, #6B4423, #4A2C19)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to right, #4A2C19, #2D1A0F)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to right, #6B4423, #4A2C19)";
                }}
                asChild
              >
                <Link href="/daftar">
                  <i className="fas fa-file-signature mr-2" />
                  Daftar Sekarang
                </Link>
              </Button>
              <Button
                variant="outline"
                size="md"
                className="shadow-lg hover:shadow-xl text-xs md:text-sm font-semibold"
                style={{
                  borderColor: "#6B4423",
                  color: "#6B4423",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDF6EC";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                asChild
              >
                <Link href="/login">
                  <i className="fas fa-lock mr-2" />
                  Login Santri
                </Link>
              </Button>
              <Button
                variant="outline"
                size="md"
                className="shadow-lg hover:shadow-xl text-xs md:text-sm font-semibold"
                style={{
                  borderColor: "#DAA520",
                  color: "#B8860B",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF9E6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                asChild
              >
                <Link href="#kontak">
                  <i className="fas fa-calendar-alt mr-2" />
                  Jadwal Kunjungan
                </Link>
              </Button>
            </div>

            {/* Stats Cards - UPDATED: Better size */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5 max-w-2xl animate-fadeInUp delay-300">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-2 md:p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="rounded-full p-1.5 md:p-2 mb-1 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: stat.bgColor }}
                    >
                      <stat.icon
                        className="w-4 h-4 md:w-5 md:h-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-700">
                      {stat.label}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500">
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Right - UPDATED: Better proportion */}
          <div className="lg:w-1/2 relative animate-fadeInUp delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="/images/hero.png"
                alt="Santri Pondok Pesantren Al-Imam Al-Islami"
                className="w-full h-[260px] md:h-[340px] lg:h-[400px] object-cover"
                loading="eager"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(74, 44, 25, 0.35), transparent)",
                }}
              />
            </div>

            {/* Floating Contact Badge - UPDATED: Balanced size */}
            <div
              className="absolute -bottom-4 -right-3 md:-bottom-6 md:-right-4 bg-white rounded-xl shadow-2xl px-4 py-3 md:px-5 md:py-4 hover:scale-105 transition-transform duration-300 animate-pulse"
              style={{ borderWidth: "1px", borderColor: "#F5E6D3" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #6B4423, #DAA520)",
                  }}
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium">
                    Hubungi Kami
                  </p>
                  <a
                    href="tel:02667345601"
                    className="text-sm md:text-base font-bold text-gray-900 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#6B4423";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#111827";
                    }}
                  >
                    (0266) 734-5601
                  </a>
                  <a
                    href="mailto:info@ponpesalimam.ac.id"
                    className="text-xs text-gray-500 truncate max-w-[160px] md:max-w-[180px] block transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#6B4423";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#6b7280";
                    }}
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
