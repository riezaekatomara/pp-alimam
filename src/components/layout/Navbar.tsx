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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Beranda", icon: "fa-home" },
    { href: "/tentang", label: "Tentang", icon: "fa-info-circle" },
    { href: "/kegiatan", label: "Kegiatan", icon: "fa-calendar-check" },
    { href: "/fasilitas", label: "Fasilitas", icon: "fa-building" },
    { href: "/galeri", label: "Galeri", icon: "fa-images" },
    { href: "/berita", label: "Berita", icon: "fa-newspaper" },
    { href: "/kontak", label: "Kontak", icon: "fa-phone" },
  ];

  const jenjangLinks = [
    {
      label: "JENJANG PENDIDIKAN",
      items: [
        { href: "/mts", label: "MTs Al-Imam", icon: "fa-school" },
        { href: "/ma", label: "MA Al-Imam", icon: "fa-university" },
        { href: "/tahfidz", label: "Program Tahfidz", icon: "fa-book-quran" },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo & Brand - UPDATED: Richer brown */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
              style={{
                background:
                  "linear-gradient(to bottom right, #6B4423, #4A2C19)",
              }}
            >
              <i className="fas fa-mosque text-white text-xl md:text-2xl"></i>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                Pondok Pesantren
              </h1>
              <h2
                className="text-sm md:text-base font-bold leading-tight"
                style={{ color: "#6B4423" }}
              >
                Al-Imam Al-Islami
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation - UPDATED: Richer browns */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-sm xl:text-base transition-colors duration-300 pb-1 ${
                  isActive(link.href) ? "font-semibold" : "text-gray-700"
                }`}
                style={isActive(link.href) ? { color: "#6B4423" } : {}}
                onMouseEnter={(e) =>
                  !isActive(link.href) &&
                  (e.currentTarget.style.color = "#8B5A3C")
                }
                onMouseLeave={(e) =>
                  !isActive(link.href) &&
                  (e.currentTarget.style.color = "#374151")
                }
              >
                <i className={`fas ${link.icon} mr-1.5 text-xs`}></i>
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "#6B4423" }}
                  ></span>
                )}
              </Link>
            ))}

            {/* Dropdown Jenjang - UPDATED */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-gray-700 font-medium text-sm xl:text-base transition-colors duration-300 pb-1 hover:text-[#8B5A3C]">
                <i className="fas fa-graduation-cap mr-1 text-xs"></i>
                Jenjang
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {jenjangLinks[0].items.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-gray-700 transition-colors ${
                      idx === 0
                        ? "rounded-t-xl"
                        : idx === jenjangLinks[0].items.length - 1
                        ? "rounded-b-xl"
                        : "border-b border-gray-100"
                    }`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FDF6EC";
                      e.currentTarget.style.color = "#6B4423";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#374151";
                    }}
                  >
                    <i
                      className={`fas ${link.icon} w-4 text-center`}
                      style={{ color: "#8B5A3C" }}
                    ></i>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Rest of nav links - UPDATED */}
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-sm xl:text-base transition-colors duration-300 pb-1 ${
                  isActive(link.href) ? "font-semibold" : "text-gray-700"
                }`}
                style={isActive(link.href) ? { color: "#6B4423" } : {}}
                onMouseEnter={(e) =>
                  !isActive(link.href) &&
                  (e.currentTarget.style.color = "#8B5A3C")
                }
                onMouseLeave={(e) =>
                  !isActive(link.href) &&
                  (e.currentTarget.style.color = "#374151")
                }
              >
                <i className={`fas ${link.icon} mr-1.5 text-xs`}></i>
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "#6B4423" }}
                  ></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons - UPDATED: Rich gold gradient */}
          <div className="hidden lg:flex items-center gap-3">
            {/* PPDB Button - RICH GOLD */}
            <Button
              variant="accent"
              size="sm"
              className="shadow-lg hover:shadow-xl animate-pulse text-white font-semibold"
              style={{
                background: "linear-gradient(to right, #DAA520, #B8860B)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #B8860B, #9A7309)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #DAA520, #B8860B)";
              }}
              asChild
            >
              <Link href="/daftar">
                <i className="fas fa-file-signature mr-2"></i>
                PPDB 2026
              </Link>
            </Button>

            {/* Login Button - BROWN OUTLINE */}
            <Button
              variant="outline"
              size="sm"
              className="font-semibold"
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
                <i className="fas fa-lock mr-2"></i>
                Login
              </Link>
            </Button>

            {/* Quick Contact - UPDATED */}
            <a
              href="tel:+6285722253236"
              className="hidden xl:flex items-center gap-2 text-gray-700 transition-colors text-sm group"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#8B5A3C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#374151";
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "#F5E6D3" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EDD5B8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5E6D3";
                }}
              >
                <Phone className="w-4 h-4" style={{ color: "#6B4423" }} />
              </div>
              <div>
                <p className="font-semibold text-xs">+62 857-2225-3236</p>
                <p className="text-xs text-gray-500">Hubungi Kami</p>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button - UPDATED */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#8B5A3C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#374151";
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - UPDATED */}
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
                    ? "font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={
                  isActive(link.href)
                    ? {
                        backgroundColor: "#FDF6EC",
                        color: "#6B4423",
                      }
                    : {}
                }
              >
                <i className={`fas ${link.icon} text-gray-500 w-4`}></i>
                {link.label}
              </Link>
            ))}

            {/* Mobile Jenjang - UPDATED */}
            <div
              className="pl-4 ml-4 mt-2"
              style={{ borderLeft: "2px solid #F5E6D3" }}
            >
              <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">
                Jenjang Pendidikan
              </p>
              {jenjangLinks[0].items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 text-sm transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FDF6EC";
                    e.currentTarget.style.color = "#6B4423";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#374151";
                  }}
                >
                  <i
                    className={`fas ${link.icon} text-xs w-4`}
                    style={{ color: "#8B5A3C" }}
                  ></i>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Contact - UPDATED */}
            <div className="pt-3 border-t border-gray-200 mt-3">
              <div
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "#FDF6EC" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F5E6D3" }}
                >
                  <Phone className="w-5 h-5" style={{ color: "#6B4423" }} />
                </div>
                <div>
                  <a
                    href="tel:+6285722253236"
                    className="font-semibold text-sm"
                    style={{ color: "#6B4423" }}
                  >
                    +62 857-2225-3236
                  </a>
                  <p className="text-xs text-gray-600">WhatsApp & Telepon</p>
                </div>
              </div>
            </div>

            {/* Mobile Auth Buttons - UPDATED */}
            <div className="pt-3 border-t border-gray-200 mt-3 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full font-semibold"
                style={{
                  borderColor: "#6B4423",
                  color: "#6B4423",
                }}
                asChild
              >
                <Link href="/login">
                  <i className="fas fa-lock mr-2"></i>
                  Login Santri
                </Link>
              </Button>
              <Button
                variant="accent"
                size="sm"
                className="w-full text-white font-semibold"
                style={{
                  background: "linear-gradient(to right, #DAA520, #B8860B)",
                }}
                asChild
              >
                <Link href="/daftar">
                  <i className="fas fa-file-signature mr-2"></i>
                  PPDB 2026/2027
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
