"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <div className="relative min-h-screen flex flex-col">
      {/* ✅ NAVBAR - Hanya tampil di halaman utama (tidak di login/dashboard) */}
      {!hideNavbarFooter && <Navbar />}

      {/* ✅ MAIN CONTENT - Page content dengan conditional offset */}
      <main className={hideNavbarFooter ? "flex-1" : "flex-1 pt-16 md:pt-20"}>
        {/* pt-16 md:pt-20 hanya untuk offset navbar di halaman utama */}
        {children}
      </main>

      {/* ✅ FOOTER - Hanya tampil di halaman utama (tidak di login/dashboard) */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}
