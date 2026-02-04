"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Sparkles, Clock, School } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScrollSpy = () => {
      const sections = ["about", "kontak"];
      const scrollPosition = window.scrollY + 100;

      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Beranda", icon: "fa-home" },
    { href: "/tentang", label: "Tentang", icon: "fa-info-circle" },
    { href: "/program", label: "Program", icon: "fa-graduation-cap" },
    { href: "/fasilitas", label: "Fasilitas", icon: "fa-building" },
    { href: "/agenda", label: "Kalender", icon: "fa-calendar-alt" },
    { href: "/kontak", label: "Kontak", icon: "fa-phone" },
  ];

  const jenjangLinks = [
    { href: "/program#mts", label: "MTs Al-Imam", icon: "fa-school" },
    { href: "/program#il", label: "I'dad Lughowi", icon: "fa-book-open" },
    { href: "/program#ma", label: "MA Al-Imam", icon: "fa-university" },
  ];

  const isActive = (href: string, sectionId?: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("#") && sectionId) {
      return pathname === "/" && activeSection === sectionId;
    }
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-clay-sm border-b border-surface-200"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="relative">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 bg-brown-800 text-white"
                >
                  <School className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                {/* Badge Kerjasama */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-gold-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <span className="text-[8px] md:text-[9px] font-black text-white">3</span>
                </div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xs font-bold leading-tight text-brown-900 uppercase tracking-wider">
                  Pondok Pesantren
                </h1>
                <h2 className="text-sm md:text-base font-black leading-tight text-brown-700 font-display">
                  Al-Imam Al-Islami
                </h2>
                <p className="text-[9px] md:text-[10px] text-gold-700 font-semibold leading-tight mt-0.5 hidden md:block">
                  Bekerja sama dengan Universitas Islam di 3 Benua
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${isActive(link.href)
                    ? "bg-brown-100 text-brown-800"
                    : "text-ink-600 hover:text-brown-700 hover:bg-surface-100"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Jenjang Dropdown */}
              <div className="relative group ml-1">
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 font-bold text-sm transition-all duration-300 rounded-full hover:bg-surface-100 text-ink-600`}
                >
                  Jenjang
                  <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-clay-lg border border-surface-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right scale-95 group-hover:scale-100 z-50">
                  {jenjangLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 rounded-xl hover:bg-surface-50 text-sm font-bold text-ink-600 hover:text-brown-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full font-bold text-sm text-brown-700 hover:bg-brown-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/ppdb"
                className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Daftar PPDB
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-ink-600 hover:bg-surface-100 rounded-xl"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-20 bg-surface-50/98 backdrop-blur-sm">
          <div className="p-4 space-y-2 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full p-4 rounded-xl text-base font-bold transition-all ${isActive(link.href)
                  ? "bg-brown-100 text-brown-800"
                  : "bg-white text-ink-600 border border-surface-200"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-surface-200 mt-4 space-y-3">
              <p className="px-2 text-xs font-bold text-ink-400 uppercase tracking-widest">Akses Cepat</p>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full p-4 rounded-xl border border-brown-200 text-brown-700 font-bold bg-white"
              >
                Login Santri
              </Link>
              <Link
                href="/ppdb"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full p-4 rounded-xl bg-gold-500 text-white font-bold shadow-lg shadow-gold-500/20"
              >
                Daftar Santri Baru
              </Link>
            </div>

            {/* Urgent Info */}
            <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">Pendaftaran Segera Ditutup</p>
                <p className="text-xs text-orange-600">Sisa kuota: <span className="font-bold">23 Kursi</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
