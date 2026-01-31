"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Calendar,
  LogOut,
  Menu,
  X,
  Home,
  Shield,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";

export default function PengujiDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pengujiName, setPengujiName] = useState("Penguji");

  useEffect(() => {
    const fetchPengujiData = async () => {
      try {
        setLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to get session");

        const sessionData = await sessionRes.json();
        if (sessionData.user?.user_metadata?.nama) {
          setPengujiName(sessionData.user.user_metadata.nama);
        }
      } catch (error) {
        console.error("Error fetching penguji data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPengujiData();
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard/penguji",
      icon: LayoutDashboard,
      active: pathname === "/dashboard/penguji",
    },
    {
      name: "Jadwal Ujian Saya",
      href: "/dashboard/penguji/jadwal",
      icon: Calendar,
      active: pathname === "/dashboard/penguji/jadwal",
    },
    {
      name: "Input Nilai",
      href: "/dashboard/penguji/input-nilai",
      icon: ClipboardCheck,
      active: pathname === "/dashboard/penguji/input-nilai",
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-stone-800 mb-2">
            Memuat Dashboard Penguji
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <IdleTimeoutTracker />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b-2 border-violet-200 shadow-lg sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="text-center">
              <h1 className="text-lg font-bold text-stone-900">
                Dashboard Penguji
              </h1>
              <p className="text-xs text-stone-600">{pengujiName}</p>
            </div>

            <Link
              href="/"
              className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
            >
              <Home className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen">
            <div className="flex flex-col h-full bg-white border-r-2 border-violet-200 overflow-y-auto shadow-xl">
              {/* Logo & Brand */}
              <div className="flex items-center justify-center mb-8 px-6 pt-8">
                <div className="bg-gradient-to-br from-violet-600 to-purple-600 text-white p-3 rounded-2xl shadow-lg">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-black text-stone-900">
                    Dashboard
                  </h2>
                  <p className="text-sm text-stone-600">Penguji</p>
                </div>
              </div>

              {/* Penguji Info */}
              <div className="px-4 mb-6">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold">
                      {pengujiName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-stone-600">Logged in as</p>
                      <p className="font-bold text-violet-700 text-sm">
                        {pengujiName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all relative ${
                      item.active
                        ? "bg-violet-600 text-white shadow-lg"
                        : "text-stone-700 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}

                    {item.active && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-300 rounded-b-xl" />
                    )}

                    {!item.active && (
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-5 h-5 border-2 border-violet-300 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="flex-shrink-0 border-t border-stone-200 p-4">
                <div className="text-xs text-stone-500 mb-3 text-center">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Penguji Dashboard v1.0
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-md hover:shadow-lg"
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
                    <div className="bg-gradient-to-br from-violet-600 to-purple-600 text-white p-3 rounded-2xl">
                      <Shield className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-black text-stone-900">
                        Dashboard
                      </h2>
                      <p className="text-sm text-stone-600">Penguji</p>
                    </div>
                  </div>

                  <div className="px-4 mb-6">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4">
                      <p className="text-xs text-stone-600">Penguji</p>
                      <p className="font-bold text-violet-700 text-sm">
                        {pengujiName}
                      </p>
                    </div>
                  </div>

                  <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl ${
                          item.active
                            ? "bg-violet-600 text-white"
                            : "text-stone-700 hover:bg-violet-100"
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-stone-200 p-4">
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        handleLogout();
                      }}
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
            <header className="hidden lg:block bg-white border-b-2 border-violet-200 shadow-lg">
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-stone-900">
                      Dashboard Penguji
                    </h1>
                    <p className="text-sm text-stone-600">
                      Sistem Penilaian PPDB Al-Imam Al-Islami Sukabumi
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-4 py-2 rounded-xl border border-violet-100">
                      <p className="text-xs text-stone-600">Penguji:</p>
                      <p className="font-bold text-violet-700">{pengujiName}</p>
                    </div>

                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
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
