"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Beranda", icon: "fa-home" },
    { href: "/tentang", label: "Tentang Kami", icon: "fa-info-circle" },
    { href: "/program", label: "Program", icon: "fa-book-open" },
    { href: "/fasilitas", label: "Fasilitas", icon: "fa-building" },
    { href: "/galeri", label: "Galeri", icon: "fa-images" },
    { href: "/berita", label: "Berita", icon: "fa-newspaper" },
  ];

  const jenjangLinks = [
    { href: "/mts", label: "MTs Al-Imam", icon: "fa-school" },
    { href: "/ma", label: "MA Al-Imam", icon: "fa-university" },
    { href: "/tahfidz", label: "Program Tahfidz", icon: "fa-kaaba" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
              <i className="fas fa-mosque text-white text-xl md:text-2xl"></i>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                Pondok Pesantren
              </h1>
              <h2 className="text-sm md:text-base font-bold text-green-600 leading-tight">
                Al-Imam Al-Islami
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-sm xl:text-base transition-colors duration-300 pb-1 ${
                  isActive(link.href)
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                <i className={`fas ${link.icon} mr-1.5 text-xs`}></i>
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Dropdown Jenjang */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 font-medium text-sm xl:text-base transition-colors duration-300 pb-1">
                <i className="fas fa-graduation-cap mr-1 text-xs"></i>
                Jenjang
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {jenjangLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
                      idx === 0
                        ? "rounded-t-xl"
                        : idx === jenjangLinks.length - 1
                        ? "rounded-b-xl"
                        : "border-b border-gray-100"
                    }`}
                  >
                    <i
                      className={`fas ${link.icon} text-green-600 w-4 text-center`}
                    ></i>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button
              variant="accent"
              size="sm"
              className="shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/daftar">
                <i className="fas fa-file-signature mr-2"></i>
                Daftar
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
              asChild
            >
              <Link href="/login">
                <i className="fas fa-lock mr-2"></i>
                Login
              </Link>
            </Button>

            {/* Quick Contact */}
            <a
              href="tel:02667345601"
              className="hidden xl:flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors text-sm group"
            >
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-xs">(0266) 734-5601</p>
                <p className="text-xs text-gray-500">Hubungi Kami</p>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className={`fas ${link.icon} text-gray-500 w-4`}></i>
                {link.label}
              </Link>
            ))}

            {/* Mobile Jenjang */}
            <div className="pl-4 border-l-2 border-gray-100 ml-4 mt-2">
              <p className="text-xs text-gray-500 font-medium mb-2">
                Jenjang Pendidikan
              </p>
              {jenjangLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 text-sm transition-colors"
                >
                  <i
                    className={`fas ${link.icon} text-gray-400 text-xs w-4`}
                  ></i>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Contact */}
            <div className="pt-3 border-t border-gray-200 mt-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <a
                    href="tel:02667345601"
                    className="font-semibold text-green-700 text-sm"
                  >
                    (0266) 734-5601
                  </a>
                  <p className="text-xs text-gray-600">Hubungi Kami</p>
                </div>
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-gray-200 mt-3 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-green-600 text-green-600"
                asChild
              >
                <Link href="/login">
                  <i className="fas fa-lock mr-2"></i>
                  Login
                </Link>
              </Button>
              <Button variant="accent" size="sm" className="w-full" asChild>
                <Link href="/daftar">
                  <i className="fas fa-file-signature mr-2"></i>
                  Daftar Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
