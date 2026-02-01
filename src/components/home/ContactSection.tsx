"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Pelabuhan Ratu II KM 18, Kp. Pupunjul, Desa Cikembar",
    detail: "Kec. Cikembar, Kab. Sukabumi, Jawa Barat 43157",
    color: "brown",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "+62 857-2225-3236",
    detail: "Senin - Sabtu, 08:00 - 16:00 WIB",
    color: "teal",
  },
  {
    icon: Mail,
    title: "Email",
    content: "alimamalislami@gmail.com",
    detail: "Respons dalam 1x24 jam",
    color: "gold",
  },
] as const;

function ContactCard({
  icon: Icon,
  title,
  content,
  detail,
  color,
}: (typeof CONTACT_INFO)[number]) {
  const colorClasses = {
    brown: "bg-[var(--color-brown-100)] text-[var(--color-brown-600)]",
    teal: "bg-[var(--color-teal-100)] text-[var(--color-teal-600)]",
    gold: "bg-[var(--color-gold-100)] text-[var(--color-gold-600)]",
  };

  return (
    <div className="card-modern p-6 text-center h-full flex flex-col items-center">
      <div
        className={`w-14 h-14 ${colorClasses[color]} rounded-2xl flex items-center justify-center mb-4`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-[var(--color-text-900)] mb-2">{title}</h3>
      <p className="text-sm font-semibold text-[var(--color-brown-700)] mb-1">
        {content}
      </p>
      <p className="text-xs text-[var(--color-text-500)] mt-auto">{detail}</p>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section
      id="kontak"
      className="py-16 md:py-20 bg-[var(--color-cream-50)]"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-outline inline-flex mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </div>
          <h2 className="section-title mb-3">
            Punya <span className="text-gradient-gold">Pertanyaan?</span>
          </h2>
          <p className="section-subtitle mx-auto mb-6">
            Tim kami siap membantu menjawab semua pertanyaan seputar pendaftaran
            dan program pesantren
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {CONTACT_INFO.map((item, idx) => (
            <ContactCard key={idx} {...item} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-[var(--color-brown-700)] hover:bg-[var(--color-brown-800)] text-white px-8">
            <Link href="/kontak" className="flex items-center gap-2">
              <span>Lihat Kontak Lengkap & Peta</span>
              <MapPin className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
