"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  User,
  ClipboardList,
  CreditCard,
  FileCheck,
  Calendar,
  Trophy,
  CheckCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Lock,
} from "lucide-react";
import Link from "next/link";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";
import {
  canAccessTab,
  type StatusProses,
  type TabName,
} from "@/lib/access-control";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusProses, setStatusProses] = useState<StatusProses>("draft");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");

  // Fetch user status dari database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        if (data.pendaftar_id) {
          // Fetch user status dari database
          const res = await fetch(
            `/api/pendaftar/status?pendaftar_id=${data.pendaftar_id}`,
          );
          const userData = await res.json();
          setStatusProses((userData.status_proses || "draft") as StatusProses);
          setNomorPendaftaran(userData.nomor_pendaftaran || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Default ke draft jika error
        setStatusProses("draft");
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    {
      name: "Data Pribadi",
      href: "/dashboard/pendaftar",
      tabName: "data-pribadi" as TabName,
      icon: User,
      active: pathname === "/dashboard/pendaftar",
    },
    {
      name: "Pembayaran Pendaftaran",
      href: "/dashboard/pendaftar/pembayaran-pendaftaran",
      tabName: "pembayaran-pendaftaran" as TabName,
      icon: CreditCard,
      active: pathname === "/dashboard/pendaftar/pembayaran-pendaftaran",
    },
    {
      name: "Kelengkapan Berkas",
      href: "/dashboard/pendaftar/kelengkapan-berkas",
      tabName: "kelengkapan-berkas" as TabName,
      icon: FileCheck,
      active: pathname === "/dashboard/pendaftar/kelengkapan-berkas",
    },
    {
      name: "Jadwal Ujian",
      href: "/dashboard/pendaftar/jadwal-ujian",
      tabName: "jadwal-ujian" as TabName,
      icon: Calendar,
      active: pathname === "/dashboard/pendaftar/jadwal-ujian",
    },
    {
      name: "Hasil Ujian",
      href: "/dashboard/pendaftar/hasil-ujian",
      tabName: "hasil-ujian" as TabName,
      icon: Trophy,
      active: pathname === "/dashboard/pendaftar/hasil-ujian",
    },
    {
      name: "Pengumuman",
      href: "/dashboard/pendaftar/pengumuman",
      tabName: "pengumuman" as TabName,
      icon: CheckCircle,
      active: pathname === "/dashboard/pendaftar/pengumuman",
    },
    {
      name: "Daftar Ulang",
      href: "/dashboard/pendaftar/daftar-ulang",
      tabName: "daftar-ulang" as TabName,
      icon: Settings,
      active: pathname === "/dashboard/pendaftar/daftar-ulang",
    },
  ];

  // Function untuk cek apakah tab bisa diakses
  const isTabAccessible = (tabName: TabName) => {
    return canAccessTab(tabName, statusProses);
  };

  // NavLink component dengan conditional rendering
  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    const isAccessible = isTabAccessible(item.tabName);

    if (!isAccessible) {
      return (
        <div
          title={`Akses akan terbuka di status: ${statusProses}`}
          className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-stone-400 opacity-50 cursor-not-allowed bg-stone-100"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.name}
          <Lock className="w-4 h-4 ml-auto" />
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
          item.active
            ? "bg-teal-500 text-white shadow-lg"
            : "text-stone-700 hover:bg-teal-100 hover:text-teal-700"
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        {item.name}
      </Link>
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <>
      <IdleTimeoutTracker />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b-2 border-teal-200 shadow-lg sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-teal-100 text-teal-700"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-stone-900">Dashboard</h1>
              <p className="text-xs text-stone-600">Pendaftar</p>
            </div>
            <Link
              href="/"
              className="p-2 rounded-lg bg-amber-100 text-amber-700"
            >
              <Home className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen">
            <div className="flex flex-col h-full bg-white border-r-2 border-teal-200 overflow-y-auto">
              {/* Logo & Brand */}
              <div className="flex items-center justify-center mb-8 px-6 pt-8">
                <div className="bg-teal-600 text-white p-3 rounded-2xl">
                  <User className="w-8 h-8" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-black text-stone-900">
                    Dashboard
                  </h2>
                  <p className="text-sm text-stone-600">Pendaftar</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="flex-shrink-0 border-t border-stone-200 p-4">
                <div className="bg-teal-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-stone-600 mb-1">
                    Nomor Pendaftaran
                  </p>
                  <p className="font-bold text-teal-700 text-sm">MTI20260006</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 flex w-64">
                <div className="flex flex-col flex-grow pt-8 bg-white shadow-xl">
                  <div className="flex items-center justify-center mb-8 px-6">
                    <div className="bg-teal-600 text-white p-3 rounded-2xl">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-black text-stone-900">
                        Dashboard
                      </h2>
                      <p className="text-sm text-stone-600">Pendaftar</p>
                    </div>
                  </div>
                  <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                      const isAccessible = isTabAccessible(item.tabName);

                      if (!isAccessible) {
                        return (
                          <div
                            key={item.name}
                            title={`Akses akan terbuka di status: ${statusProses}`}
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-stone-400 opacity-50 cursor-not-allowed bg-stone-100"
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                            <Lock className="w-4 h-4 ml-auto" />
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl ${
                            item.active
                              ? "bg-teal-500 text-white"
                              : "text-stone-700 hover:bg-teal-100"
                          }`}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="border-t border-stone-200 p-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 lg:pl-64">
            {/* Desktop Header */}
            <header className="hidden lg:block bg-white border-b-2 border-teal-200 shadow-lg">
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-stone-900">
                      Dashboard Pendaftar
                    </h1>
                    <p className="text-sm text-stone-600">
                      Ponpes Al-Imam Al-Islami Sukabumi
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-stone-600">Halo,</p>
                      <p className="font-bold text-teal-700">MTI20260006</p>
                    </div>
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all"
                    >
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
