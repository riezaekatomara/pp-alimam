"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/widgets/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/widgets/ScrollToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Tentukan apakah perlu tampilkan navbar dan footer
  const hideNavbarFooter =
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/daftar");

  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      {/* ✅ NAVBAR - Hanya tampil di halaman utama (tidak di login/dashboard) */}
      {!hideNavbarFooter && <Navbar />}

      {/* ✅ MAIN CONTENT - Page content dengan conditional offset */}
      <main className={hideNavbarFooter ? "flex-1" : "flex-1 pt-20 md:pt-24"}>
        {/* pt-20 md:pt-24 only for navbar offset on main pages */}
        {children}
      </main>

      {/* ✅ FOOTER - Hanya tampil di halaman utama (tidak di login/dashboard) */}
      {!hideNavbarFooter && <Footer />}

      {/* ✅ FLOATING WIDGETS - Always visible on public pages */}
      {!hideNavbarFooter && (
        <>
          <FloatingWhatsApp />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}
