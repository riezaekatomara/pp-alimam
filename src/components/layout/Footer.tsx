import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, ChevronRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Beranda" },
    { href: "/visi-misi", label: "Visi & Misi" },
    { href: "/galeri", label: "Galeri Kegiatan" },
    { href: "/ppdb", label: "PPDB 2026/2027" },
  ];

  const programLinks = [
    { href: "/mts", label: "MTs Al-Imam", icon: "fa-school" },
    { href: "/ma", label: "MA Al-Imam", icon: "fa-university" },
    { href: "/tahfidz", label: "Program Tahfidz", icon: "fa-book-quran" },
    {
      href: "/muhadharoh",
      label: "Muhadharoh & Bahasa",
      icon: "fa-microphone",
    },
  ];

  const socialLinks = [
    { href: "#", label: "YouTube", icon: "fa-youtube" },
    { href: "#", label: "Instagram", icon: "fa-instagram" },
    { href: "#", label: "Facebook", icon: "fa-facebook" },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                <i className="fas fa-mosque text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Pondok Pesantren
                </h3>
                <p className="text-emerald-300 text-sm font-bold">
                  Al-Imam Al-Islami
                </p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Mencetak generasi khairu ummah yang berpedoman pada Al-Qur'an dan
              As-Sunnah sesuai pemahaman as-salaf ash-shalih. Berkomitmen
              membentuk santri yang berakhlak mulia, berilmu syar'i, dan
              bermanfaat bagi umat.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-green-100 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program & Jenjang */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              Program & Jenjang
            </h4>
            <ul className="space-y-2 text-green-100 text-sm">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-2 group"
                  >
                    <i
                      className={`fas ${link.icon} text-xs text-emerald-400 group-hover:scale-110 transition-transform`}
                    ></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-green-100 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-300" />
                <span className="break-words">
                  Jl. Pelabuhan Ratu II KM 18, Kp. Pupunjul, Desa Cikembar, Kec.
                  Cikembar, Kab. Sukabumi, Jawa Barat 43157
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-300" />
                <div>
                  <a
                    href="tel:+6285722253236"
                    className="hover:text-emerald-300 transition-colors block"
                  >
                    +62 857-2225-3236
                  </a>
                  <p className="text-xs text-green-200">(Telepon & WhatsApp)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-300" />
                <a
                  href="mailto:alimamalislami@gmail.com"
                  className="break-all hover:text-emerald-300 transition-colors"
                >
                  alimamalislami@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <a
                  href="https://www.alimamalislami.sch.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-white transition-colors text-xs flex items-center gap-1 group"
                >
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Kunjungi Situs Resmi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-emerald-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left text-emerald-200 text-sm">
              <p>
                © {currentYear} Pondok Pesantren Al-Imam Al-Islami. Semua Hak
                Dilindungi.
              </p>
              <p className="text-xs mt-1">
                Meneladani Al-Qur'an dan As-Sunnah sesuai pemahaman salafus
                shalih.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-emerald-200 hover:text-white transition-colors hover:scale-110 transform"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab ${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
