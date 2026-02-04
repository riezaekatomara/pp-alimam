"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  Facebook,
  Shield,
  ExternalLink,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  School
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const programLinks = [
    { href: "/program#mts", label: "MTs Al-Imam", desc: "Setara SMP + Tahfidz" },
    { href: "/program#il", label: "I'dad Lughowi", desc: "Setara SMA + Tahfidz (4 Tahun)" },
  ];

  const socialLinks = [
    { href: "https://youtube.com/@alimamalislami", icon: Youtube, color: "text-red-500" },
    { href: "https://instagram.com/alimamalislami", icon: Instagram, color: "text-pink-600" },
    { href: "https://facebook.com/alimamalislami", icon: Facebook, color: "text-blue-600" },
  ];

  return (
    <footer className="bg-surface-50 border-t border-surface-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brown-800 rounded-xl flex items-center justify-center text-white shadow-lg">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brown-900 leading-tight">Pondok Pesantren</h3>
                <h3 className="font-black text-lg text-brown-700 leading-tight">Al-Imam Al-Islami</h3>
              </div>
            </div>
            <p className="text-ink-500 text-sm leading-relaxed">
              Mencetak kader ulama dan pemimpin umat yang berakhlak mulia, hafal Al-Qur'an, dan berwawasan luas.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className={`w-10 h-10 rounded-full bg-white border border-surface-200 flex items-center justify-center hover:scale-110 transition-transform shadow-sm ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-brown-900 mb-6">Program Pendidikan</h4>
            <ul className="space-y-4">
              {programLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group block">
                    <span className="font-bold text-ink-700 group-hover:text-brown-700 transition-colors block">{link.label}</span>
                    <span className="text-xs text-ink-400">{link.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-brown-900 mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brown-500 shrink-0 mt-0.5" />
                <span className="text-sm text-ink-600">Jl. Pelabuhan Ratu II KM 18, Cikembar, Sukabumi</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <a href="tel:+6285722253236" className="text-sm text-ink-600 hover:text-teal-600">+62 857-2225-3236</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <a href="mailto:alimamalislami@gmail.com" className="text-sm text-ink-600 hover:text-gold-600">alimamalislami@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-1">
            <div className="bg-brown-900 rounded-2xl p-6 text-center text-white shadow-clay-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2 text-white">Pendaftaran Santri Baru</h4>
                <p className="text-brown-200 text-xs mb-6">10 Februari - 30 Mei 2026. Kuota terbatas: 32/jenjang.</p>
                <Link href="/daftar" className="block w-full py-3 bg-white text-brown-900 font-bold rounded-xl hover:bg-surface-100 transition-colors">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-surface-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-400 font-medium">© {currentYear} PP Al-Imam Al-Islami. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-ink-400 font-bold">
            <Link href="/privacy" className="hover:text-brown-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brown-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
