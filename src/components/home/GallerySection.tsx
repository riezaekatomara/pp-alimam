"use client";

import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  Target,
  School,
  Sun,
  Book,
  Moon,
  BookText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function GallerySection() {
  const previewItems = [
    {
      image: "/images/kitab.JPG",
      title: "Pembelajaran Kitab",
      description:
        "Mengkaji kitab kuning dengan metode bandongan dan sorogan di bawah bimbingan asatidz yang kompeten.",
      icon: BookOpen,
      gradient:
        "from-[var(--color-brown-700)]/90 via-[var(--color-brown-600)]/70 to-[var(--color-gold-500)]/50",
      category: "Kegiatan",
      categoryLink: "/kegiatan",
      bgColor: "bg-[var(--color-brown-600)]",
    },
    {
      image: "/images/tahfiz.JPG",
      title: "Program Tahfidz",
      description:
        "Menghafal 30 juz dengan sistem setoran harian, muroja'ah rutin, dan bimbingan intensif dari tahfidz.",
      icon: BookMarked,
      gradient:
        "from-[var(--color-gold-500)]/90 via-[var(--color-gold-600)]/70 to-[var(--color-teal-500)]/50",
      category: "Kegiatan",
      categoryLink: "/kegiatan",
      bgColor: "bg-[var(--color-gold-500)]",
    },
    {
      image: "/images/ekstra.jpg",
      title: "Ekstrakurikuler",
      description:
        "Pramuka, bela diri, dan seni Islami untuk mengembangkan potensi santri secara menyeluruh.",
      icon: Target,
      gradient:
        "from-[var(--color-teal-500)]/90 via-[var(--color-teal-600)]/70 to-[var(--color-brown-700)]/50",
      category: "Kegiatan",
      categoryLink: "/kegiatan",
      bgColor: "bg-[var(--color-teal-500)]",
    },
    {
      image: "/images/fasilitas.jpeg",
      title: "Fasilitas Pesantren",
      description:
        "Masjid, asrama nyaman, perpustakaan kitab, dan sarana belajar yang menunjang pendidikan Islami.",
      icon: School,
      gradient:
        "from-[var(--color-brown-700)]/90 via-[var(--color-gold-500)]/70 to-[var(--color-cream-200)]/50",
      category: "Fasilitas",
      categoryLink: "/fasilitas",
      bgColor: "bg-[var(--color-brown-600)]",
    },
  ];

  const dailyActivities = [
    {
      icon: Sun,
      time: "Pagi:",
      activity: "Tahfidz Qur'an & Muroja'ah",
      bgColor: "bg-[var(--color-gold-50)]",
      iconColor: "text-[var(--color-gold-500)]",
    },
    {
      icon: Book,
      time: "Siang:",
      activity: "Pembelajaran Formal & Diniyyah",
      bgColor: "bg-[var(--color-brown-50)]",
      iconColor: "text-[var(--color-brown-600)]",
    },
    {
      icon: Target,
      time: "Sore:",
      activity: "Ekstrakurikuler & Pengembangan Bakat",
      bgColor: "bg-[var(--color-teal-50)]",
      iconColor: "text-[var(--color-teal-500)]",
    },
    {
      icon: Moon,
      time: "Malam:",
      activity: "Kajian Islam & Muhadharah",
      bgColor: "bg-[var(--color-cream-100)]",
      iconColor: "text-[var(--color-brown-600)]",
    },
  ];

  return (
    <Section
      id="gallery-preview"
      className="bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-gold-50)] relative overflow-hidden py-12 sm:py-16 md:py-20 animate-fadeInUp"
    >
      {/* ✅ FIXED: Decorative blobs - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute top-20 right-10 w-56 h-56 bg-gradient-to-bl from-[var(--color-brown-100)]/40 to-[var(--color-gold-100)]/40 rounded-full blur-3xl animate-float" />
      <div className="hidden md:block absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-[var(--color-teal-100)]/30 to-[var(--color-gold-50)]/30 rounded-full blur-3xl animate-float delay-700" />

      <Container size="lg" className="relative z-10">
        {/* ✅ REVISED: Section Badge */}
        <div className="text-center mb-4 sm:mb-6 animate-fadeInDown px-4 sm:px-0">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-teal-500)] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
            <BookText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">
              Keseharian Santri Berakhlak Islami
            </span>
          </span>
        </div>

        {/* ✅ REVISED: Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fadeInUp delay-200 px-4 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            <span className="text-[var(--color-brown-800)]">
              Rutinitas Santri yang{" "}
            </span>
            <span className="text-gradient-gold">Penuh Ibadah & Ilmu</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-[var(--color-gold-700)]">
              Setiap waktu diisi dengan kegiatan bermanfaat:
            </span>{" "}
            tahfidz Al-Qur'an, mendalami ilmu syar'i, dan pembinaan akhlaq mulia
          </p>
        </div>

        {/* ✅ REVISED: Preview Cards - Content only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8 px-4 sm:px-0">
          {previewItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.categoryLink}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_25px_50px_-15px_rgba(107,68,35,0.3)] transition-all duration-700 hover:-translate-y-2 active:scale-98 cursor-pointer border-2 border-white/60"
            >
              {/* ✅ Category Badge */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-[var(--color-brown-700)] rounded-lg sm:rounded-xl shadow-lg">
                  <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{item.category}</span>
                </span>
              </div>

              {/* ✅ Image */}
              <div className="relative w-full pb-[85%] sm:pb-[75%] overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              </div>

              {/* ✅ Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-brown-900)]/90 via-[var(--color-brown-800)]/50 to-transparent p-3 sm:p-4 transition-all duration-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${item.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg transition-transform duration-700 group-hover:scale-110 flex-shrink-0`}
                  >
                    <item.icon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-xs sm:text-sm font-bold drop-shadow-lg leading-tight mb-0.5">
                      {item.title}
                    </h3>
                    {/* ✅ REVISED: Description */}
                    <p className="text-white/0 text-[10px] sm:text-xs leading-relaxed transition-all duration-700 group-hover:text-white/90 max-h-0 group-hover:max-h-24 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/5 transition-all duration-700 -translate-x-full group-hover:translate-x-full" />
            </Link>
          ))}
        </div>

        {/* ✅ CTA Buttons - No changes (already good) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
          <Button
            size="lg"
            className="w-full sm:w-auto shadow-lg hover:shadow-xl font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-900)] text-white hover:from-[var(--color-brown-900)] hover:to-[var(--color-teal-600)] transition-all duration-300 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
            asChild
          >
            <Link
              href="/kegiatan"
              className="flex items-center justify-center gap-2"
            >
              <BookText className="w-4 h-4" />
              <span>Lihat Semua Kegiatan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto shadow-md hover:shadow-lg font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 border-2 border-[var(--color-teal-500)] text-[var(--color-teal-600)] hover:bg-[var(--color-teal-50)] transition-all duration-300 active:scale-95 group min-h-[48px] sm:min-h-[44px] rounded-xl sm:rounded-2xl"
            asChild
          >
            <Link
              href="/fasilitas"
              className="flex items-center justify-center gap-2"
            >
              <School className="w-4 h-4" />
              <span>Lihat Semua Fasilitas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* ✅ REVISED: Activity Timeline */}
        <div className="bg-gradient-to-br from-[var(--color-cream-100)] to-[var(--color-gold-50)] border-2 border-[var(--color-brown-100)]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mx-4 sm:mx-0">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black mb-2 flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3">
              <BookText className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-gold-600)]" />
              <span className="text-[var(--color-brown-900)]">
                24 Jam Produktif{" "}
              </span>
              <span className="text-gradient-gold">dalam Ketaatan</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-700)] font-semibold leading-relaxed px-4 sm:px-0">
              Jadwal terstruktur yang membina santri berakhlaq mulia, disiplin,
              dan istiqomah dalam menuntut ilmu
            </p>
          </div>

          {/* ✅ Activity Cards - No changes (already good) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {dailyActivities.map((activity, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-98"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${activity.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-md mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <activity.icon
                    className={`${activity.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
                  />
                </div>
                <span className="text-xs sm:text-sm font-black text-[var(--color-brown-700)] block mb-1">
                  {activity.time}
                </span>
                <span className="text-[10px] sm:text-xs text-[var(--color-text-700)] font-semibold leading-snug">
                  {activity.activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
