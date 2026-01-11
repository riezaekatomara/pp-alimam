"use client";

import Link from "next/link";
import {
  Images,
  BookOpen,
  BookMarked,
  Target,
  School,
  Sun,
  Book,
  Moon,
  Home,
  BookText,
  Newspaper,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function GallerySection() {
  const galleryItems = [
    {
      image: "/images/kitab.JPG",
      title: "Pembelajaran Kitab",
      description:
        "Kegiatan pembelajaran kitab kuning dengan metode bandongan dan sorogan",
      icon: BookOpen,
      iconColor: "text-green-600",
      gradient: "from-green-900/90 via-emerald-900/70 to-emerald-900/50",
      delay: "100",
      category: "Pembelajaran",
      bgColor: "bg-green-600",
    },
    {
      image: "/images/tahfiz.JPG",
      title: "Program Tahfidz",
      description:
        "Sesi setoran hafalan Al-Qur'an dengan bimbingan ustadz tahfidz",
      icon: BookMarked,
      iconColor: "text-emerald-600",
      gradient: "from-emerald-900/90 via-teal-900/70 to-teal-900/50",
      delay: "200",
      category: "Tahfidz",
      bgColor: "bg-emerald-600",
    },
    {
      image: "/images/ekstra.jpg",
      title: "Ekstrakurikuler",
      description:
        "Kegiatan pramuka, pencak silat, dan seni Islami untuk pengembangan bakat",
      icon: Target,
      iconColor: "text-amber-600",
      gradient: "from-amber-900/90 via-orange-900/70 to-orange-900/50",
      delay: "300",
      category: "Ekstrakurikuler",
      bgColor: "bg-amber-600",
    },
    {
      image: "/images/fasilitas.jpeg",
      title: "Fasilitas Pesantren",
      description:
        "Masjid, asrama, perpustakaan, dan laboratorium yang nyaman untuk santri",
      icon: School,
      iconColor: "text-blue-600",
      gradient: "from-blue-900/90 via-cyan-900/70 to-cyan-900/50",
      delay: "400",
      category: "Fasilitas",
      bgColor: "bg-blue-600",
    },
  ];

  const dailyActivities = [
    {
      icon: Sun,
      time: "Pagi:",
      activity: "Tahfidz Qur'an & Muroja'ah",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Book,
      time: "Siang:",
      activity: "Pembelajaran Formal & Diniyyah",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      icon: Target,
      time: "Sore:",
      activity: "Ekstrakurikuler & Pengembangan Bakat",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: Moon,
      time: "Malam:",
      activity: "Kajian Islam & Muhadharah",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <Section
      id="gallery-section"
      className="bg-white relative overflow-hidden py-16 md:py-20"
    >
      {/* Decorative Background */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-bl from-green-100/30 to-emerald-100/30 rounded-full blur-2xl" />
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-gradient-to-tr from-amber-100/20 to-green-100/20 rounded-full blur-2xl" />

      <Container size="lg" className="relative z-10">
        {/* Badge */}
        <div className="text-center mb-4 animate-fadeIn">
          <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider shadow-md border border-green-100">
            <Images className="inline w-3 h-3 mr-1 -mt-0.5" />
            GALERI AL-IMAM
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 animate-fadeInUp">
          <span className="text-gray-900">Kegiatan & Fasilitas</span>
          <span className="block text-green-600">
            Pondok Pesantren Al-Imam Al-Islami
          </span>
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed animate-fadeInUp">
          Dokumentasi kegiatan pembelajaran, fasilitas pendidikan, dan kehidupan
          santri di lingkungan pesantren
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 animate-fadeInUp`}
              style={{ animationDelay: `${item.delay}ms` }}
            >
              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-xs font-semibold text-gray-800 rounded-full border border-white/50 shadow-lg">
                  <item.icon
                    className={`inline w-3 h-3 mr-1.5 -mt-0.5 ${item.iconColor}`}
                  />
                  {item.category}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative w-full pb-[75%] overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x300/${
                        item.category === "Ekstrakurikuler"
                          ? "047857"
                          : "065f46"
                      }/ffffff?text=${encodeURIComponent(item.title)}`;
                    }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                </div>
              </div>

              {/* Hover Overlay Content */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent p-4 md:p-5 flex flex-col justify-end transition-all duration-300 opacity-0 group-hover:opacity-100`}
              >
                <div className="transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                      <item.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-bold drop-shadow-lg leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-16 h-1.5 bg-white/60 rounded-full mt-2" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/95 text-sm drop-shadow-lg leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Default overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 md:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md">
                    <item.icon className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold drop-shadow-lg leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-10 h-1 bg-white/60 rounded-full mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Highlights */}
        <div
          className="mb-10 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 md:p-8 animate-fadeInUp"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                <BookText className="inline w-6 h-6 text-green-600 mr-2 -mt-1" />
                <span className="text-green-600">Kalender Kegiatan</span> Santri
              </h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                Kegiatan harian, pekanan, dan tahunan yang terstruktur untuk
                pembentukan karakter dan pengembangan potensi santri secara
                optimal.
              </p>
              <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                {dailyActivities.map((activity, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <activity.icon
                        className={`${activity.iconColor} w-4 h-4`}
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        {activity.time}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {activity.activity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-green-100 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl text-green-600 mb-3">
                  <Home className="w-10 h-10 mx-auto" />
                </div>
                <p className="font-bold text-gray-800 text-lg mb-1">
                  Sholat Berjama'ah
                </p>
                <p className="text-gray-600">5 Waktu di Masjid</p>
                <div className="mt-3 pt-3 border-t border-green-100">
                  <p className="text-xs text-gray-500">Fardhu & Sunnah</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl text-emerald-600 mb-3">
                  <BookText className="w-10 h-10 mx-auto" />
                </div>
                <p className="font-bold text-gray-800 text-lg mb-1">
                  Kajian Mingguan
                </p>
                <p className="text-gray-600">Setiap Hari Jum'at</p>
                <div className="mt-3 pt-3 border-t border-emerald-100">
                  <p className="text-xs text-gray-500">Kitab & Tafsir</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto group shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href="/galeri">
              <Images className="w-4 h-4" />
              <span>Lihat Galeri Lengkap</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto group border-green-600 text-green-600 hover:bg-green-50"
            asChild
          >
            <Link href="/berita">
              <Newspaper className="w-4 h-4" />
              <span>Berita & Artikel</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto group border-amber-500 text-amber-600 hover:bg-amber-50"
            asChild
          >
            <Link href="/kontak">
              <MapPin className="w-4 h-4" />
              <span>Kunjungi Pesantren</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
