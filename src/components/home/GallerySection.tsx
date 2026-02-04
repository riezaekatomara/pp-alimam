"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  BookMarked,
  Target,
  School,
  Sun,
  Book,
  Moon,
  Images,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const GALLERY_ITEMS = [
  {
    image: "/images/santri-pembelajaran-kitab.png",
    title: "Pembelajaran Kitab",
    description: "Kajian kitab kuning dengan metode bandongan dan sorogan",
    icon: BookOpen,
  },
  {
    image: "/images/tahfidz.JPG",
    title: "Program Tahfidz",
    description: "Menghafal 30 juz dengan sistem setoran harian",
    icon: BookMarked,
  },
  {
    image: "/images/ekstra-atau-ekskul.jpg",
    title: "Ekstrakurikuler",
    description: "Pramuka, bela diri, dan seni Islami",
    icon: Target,
  },
  {
    image: "/images/masjid.png",
    title: "Fasilitas Pesantren",
    description: "Masjid, asrama nyaman, dan perpustakaan",
    icon: School,
  },
] as const;

const DAILY_ACTIVITIES = [
  {
    icon: Sun,
    time: "Pagi",
    activity: "Tahfidz & Muroja'ah",
    color: "gold",
  },
  {
    icon: Book,
    time: "Siang",
    activity: "Pembelajaran Formal",
    color: "brown",
  },
  {
    icon: Target,
    time: "Sore",
    activity: "Ekstrakurikuler",
    color: "teal",
  },
  {
    icon: Moon,
    time: "Malam",
    activity: "Kajian Islam",
    color: "brown",
  },
] as const;

function GalleryCard({
  image,
  title,
  description,
  icon: Icon,
}: (typeof GALLERY_ITEMS)[number]) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-brown-600)] rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{title}</h3>
            <p className="text-white/80 text-xs">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({
  icon: Icon,
  time,
  activity,
  color,
}: (typeof DAILY_ACTIVITIES)[number]) {
  const colorClasses = {
    gold: {
      bg: "bg-[var(--color-gold-100)]",
      icon: "text-[var(--color-gold-600)]",
    },
    brown: {
      bg: "bg-[var(--color-brown-100)]",
      icon: "text-[var(--color-brown-600)]",
    },
    teal: {
      bg: "bg-[var(--color-teal-100)]",
      icon: "text-[var(--color-teal-600)]",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white hover:shadow-md transition-all duration-300">
      <div
        className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}
      >
        <Icon className={`w-6 h-6 ${colors.icon}`} />
      </div>
      <span className="text-sm font-bold text-[var(--color-brown-700)] mb-1">
        {time}
      </span>
      <span className="text-xs text-[var(--color-text-600)]">{activity}</span>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section
      id="gallery-preview"
      className="py-16 md:py-20 bg-[var(--color-cream-50)]"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-teal inline-flex mb-4">
            <Images className="w-4 h-4" />
            <span>Galeri</span>
          </div>
          <h2 className="section-title mb-3">
            Keseharian <span className="text-gradient-gold">Santri</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Aktivitas harian santri yang penuh ibadah dan ilmu dalam lingkungan
            pesantren yang kondusif
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryCard key={idx} {...item} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button
            className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white"
            asChild
          >
            <Link href="/kegiatan" className="inline-flex items-center gap-2">
              <span>Lihat Semua Kegiatan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-[var(--color-teal-600)] text-[var(--color-teal-700)] hover:bg-[var(--color-teal-50)]"
            asChild
          >
            <Link href="/fasilitas" className="inline-flex items-center gap-2">
              <span>Lihat Fasilitas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Daily Activities */}
        <div className="card-modern p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[var(--color-text-900)] mb-2">
              Jadwal Harian Santri
            </h3>
            <p className="text-sm text-[var(--color-text-600)]">
              24 jam produktif dalam ketaatan dan menuntut ilmu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DAILY_ACTIVITIES.map((activity, idx) => (
              <ActivityCard key={idx} {...activity} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
