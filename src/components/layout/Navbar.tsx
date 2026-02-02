"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Sparkles, Clock, /* Moon, Sun */ } from "lucide-react";
// import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // ✅ NEW: Track active section
  const pathname = usePathname();
  const router = useRouter();
  // const { setTheme, theme } = useTheme(); // ❌ DISABLED: Dark Mode
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // ✅ NEW: Scroll Spy - Detect which section is visible
  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScrollSpy = () => {
      const sections = ["about", "kontak"]; // All scroll sections
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // At top of page (hero section) - no section active
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      // Find which section is currently in viewport
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
    handleScrollSpy(); // Initial check
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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

  // Smooth scroll handler
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    // If on home page, smooth scroll
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
    { href: "/", label: "Beranda", icon: "fa-home", type: "link" as const },
    {
      href: "/tentang",
      label: "Tentang",
      icon: "fa-info-circle",
      type: "link" as const,
    },
    {
      href: "/kegiatan",
      label: "Kegiatan",
      icon: "fa-calendar-check",
      type: "link" as const,
    },
    {
      href: "/fasilitas",
      label: "Fasilitas",
      icon: "fa-building",
      type: "link" as const,
    },
    {
      href: "/agenda",
      label: "Kalender",
      icon: "fa-calendar-alt",
      type: "link" as const,
    },
    {
      href: "/berita",
      label: "Berita",
      icon: "fa-newspaper",
      type: "link" as const,
    },
    {
      href: "/kontak",
      label: "Kontak",
      icon: "fa-phone",
      type: "link" as const,
    },
  ];

  const jenjangLinks = [
    { href: "/program#mts", label: "MTs Al-Imam", icon: "fa-school" },
    { href: "/program#il", label: "I'dad Lughowi", icon: "fa-book-quran" },
    { href: "/program#ma", label: "MA Al-Imam", icon: "fa-university" },
  ];

  // ✅ FIXED: isActive with scroll spy logic
  // ✅ FIXED: isActive with scroll spy logic
  const isActive = (href: string, sectionId?: string) => {
    // Homepage link (Beranda) - active whenever we are on homepage
    // User requested: "any section on homepage... button beranda remains highlighted"
    if (href === "/") {
      return pathname === "/";
    }

    // Scroll links (Tentang, Kontak) - active when that section is in view
    if (href.startsWith("#") && sectionId) {
      return pathname === "/" && activeSection === sectionId;
    }

    // Regular page links
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[var(--color-neutral-50)]/98 backdrop-blur-xl shadow-lg border-b border-[var(--color-cream-200)]"
          : "bg-white/90 backdrop-blur-md shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
            {/* Logo & Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group flex-shrink-0"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md sm:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brown-700), var(--color-brown-900))",
                }}
              >
                <i className="fas fa-mosque text-white text-base sm:text-lg md:text-xl" />
              </div>

              {/* Desktop & Tablet Text */}
              <div className="hidden sm:block">
                <h1 className="text-xs sm:text-sm md:text-base font-bold leading-tight text-[var(--color-text-900)]">
                  Pondok Pesantren
                </h1>
                <h2 className="text-[10px] sm:text-xs md:text-sm font-bold leading-tight text-gradient-brown">
                  Al-Imam Al-Islami
                </h2>
              </div>

              {/* Mobile Compact Text */}
              <div className="block sm:hidden">
                <h1 className="text-xs font-bold leading-tight text-[var(--color-text-900)]">
                  PP Al-Imam
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2.5 font-medium text-sm transition-all duration-300 rounded-lg hover:shadow-md hover:shadow-brown ${isActive(link.href)
                    ? "text-[var(--color-brown-700)] bg-[var(--color-cream-200)] shadow-md shadow-brown font-semibold"
                    : "text-[var(--color-text-600)] hover:text-[var(--color-brown-700)] hover:bg-[var(--color-cream-200)]"
                    }`}
                >
                  <i
                    className={`fas ${link.icon} mr-2 text-xs ${isActive(link.href) ? "text-[var(--color-brown-700)]" : "text-[var(--color-text-500)]"}`}
                  />
                  {link.label}
                </Link>
              ))}

              {/* Jenjang Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm transition-all duration-300 rounded-lg hover:shadow-md hover:shadow-teal ${jenjangLinks.some((j) => isActive(j.href))
                    ? "text-[var(--color-brown-700)] bg-[var(--color-cream-200)] shadow-md shadow-brown font-semibold"
                    : "text-[var(--color-text-600)] hover:text-[var(--color-brown-700)] hover:bg-[var(--color-cream-200)]"
                    }`}
                >
                  <i className="fas fa-graduation-cap mr-2 text-xs text-[var(--color-teal-500)]" />
                  Jenjang
                  <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--color-cream-200)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top scale-95 group-hover:scale-100 overflow-hidden">
                  {jenjangLinks.map((link, idx) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:shadow-inner hover:shadow-teal ${isActive(link.href)
                        ? "bg-gradient-to-r from-[var(--color-cream-200)] to-[var(--color-teal-50)] text-[var(--color-brown-700)]"
                        : "text-[var(--color-text-600)] hover:bg-[var(--color-teal-50)] hover:text-[var(--color-teal-600)]"
                        } ${idx !== jenjangLinks.length - 1 ? "border-b border-[var(--color-cream-200)]" : ""}`}
                    >
                      <i
                        className={`fas ${link.icon} w-4 text-center text-[var(--color-teal-500)]`}
                      />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2.5 font-medium text-sm transition-all duration-300 rounded-lg hover:shadow-md hover:shadow-brown ${isActive(link.href)
                    ? "text-[var(--color-brown-700)] bg-[var(--color-cream-200)] shadow-md shadow-brown font-semibold"
                    : "text-[var(--color-text-600)] hover:text-[var(--color-brown-700)] hover:bg-[var(--color-cream-200)]"
                    }`}
                >
                  <i
                    className={`fas ${link.icon} mr-2 text-xs ${isActive(link.href) ? "text-[var(--color-brown-700)]" : "text-[var(--color-text-500)]"}`}
                  />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold text-white bg-gradient-gold shadow-md hover:shadow-xl shadow-gold transition-all duration-300 hover:-translate-y-1"
              >
                <Sparkles className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                <span className="hidden xl:inline text-[13px]">
                  PPDB 2026/2027
                </span>
                <span className="xl:hidden">PPDB 2026/2027</span>
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold border-2 shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  borderColor: "var(--color-brown-700)",
                  color: "var(--color-brown-700)",
                }}
              >
                <i className="fas fa-lock text-xs" />
                Login
              </Link>

              {/* ❌ REMOVED: Theme Toggle Button (Force Light Mode) */}

            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-[var(--color-text-600)] hover:bg-[var(--color-cream-200)] hover:text-[var(--color-brown-700)] transition-all duration-300 active:scale-95"
              style={{ minHeight: "44px", minWidth: "44px" }}
              aria-label="Toggle menu"
              type="button"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ top: "56px" }}>
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />

          {/* Menu Content */}
          <div className="relative h-full bg-white overflow-y-auto">
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-1">
              {/* Main Links */}
              {navLinks.map((link) => {
                const linkIsActive = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 active:scale-[0.98] ${linkIsActive
                      ? "bg-[var(--color-cream-200)] text-[var(--color-brown-700)] shadow-md"
                      : "text-[var(--color-text-600)] active:bg-[var(--color-cream-100)]"
                      }`}
                    style={{ minHeight: "44px" }}
                  >
                    <i
                      className={`fas ${link.icon} w-5 text-center text-sm sm:text-base ${linkIsActive
                        ? "text-[var(--color-brown-700)]"
                        : "text-[var(--color-teal-500)]"
                        }`}
                    />
                    {link.label}
                  </Link>
                );
              })}

              {/* Jenjang Section */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[var(--color-cream-200)]">
                <p className="px-4 sm:px-5 py-2 text-[10px] sm:text-xs font-semibold text-[var(--color-teal-600)] uppercase tracking-wider">
                  Jenjang Pendidikan
                </p>
                {jenjangLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 py-3 sm:py-3.5 px-5 sm:px-6 ml-3 sm:ml-4 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 active:scale-[0.98] ${isActive(link.href)
                      ? "bg-[var(--color-teal-50)] text-[var(--color-teal-700)]"
                      : "text-[var(--color-text-600)] active:bg-[var(--color-teal-50)]"
                      }`}
                    style={{ minHeight: "44px" }}
                  >
                    <i
                      className={`fas ${link.icon} w-5 text-center text-sm sm:text-base text-[var(--color-teal-500)]`}
                    />
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Contact */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[var(--color-cream-200)]">
                <a
                  href="tel:+622667345601"
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--color-cream-200)] to-[var(--color-teal-50)] active:scale-[0.98] transition-all duration-200"
                  style={{ minHeight: "44px" }}
                >
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md relative"
                    style={{ backgroundColor: "#F0FDF4" }}
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-teal-500)]" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-bold text-[var(--color-text-900)] leading-tight">
                      (0266) 734-5601
                    </p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-text-500)] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                      <span className="truncate">
                        Konsultasi Gratis - Online Sekarang
                      </span>
                    </p>
                  </div>
                </a>
              </div>

              {/* Urgency Banner */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[var(--color-cream-200)]">
                <div className="flex items-start gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[var(--color-gold-50)] to-[var(--color-gold-100)] border border-[var(--color-gold-200)]">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-600)] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[var(--color-text-900)] mb-1 leading-tight">
                      Pendaftaran Ditutup 31 Maret 2026
                    </p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-text-600)] leading-snug">
                      Hanya tersisa{" "}
                      <span className="font-bold text-[var(--color-gold-700)]">
                        50 kuota
                      </span>{" "}
                      untuk tahun ajaran ini
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[var(--color-cream-200)] space-y-2 sm:space-y-3">
                <Link
                  href="/ppdb"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-gold shadow-lg active:scale-[0.98] transition-all duration-200"
                  style={{ minHeight: "44px" }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pelajari PPDB 2026</span>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 shadow-sm active:scale-[0.98] transition-all duration-200"
                  style={{
                    minHeight: "44px",
                    borderColor: "var(--color-brown-700)",
                    color: "var(--color-brown-700)",
                  }}
                >
                  <i className="fas fa-lock text-sm" />
                  <span>Login Santri</span>
                </Link>
              </div>

              {/* Safe Area Spacer */}
              <div style={{ height: "32px" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
