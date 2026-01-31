"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  User,
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
  Loader2,
  Download,
  Upload,
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
  const [loading, setLoading] = useState(true);

  // Helper functions
  const formatStatusForDisplay = (status: StatusProses): string => {
    return status
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const calculateProgressToUnlock = (tabName: TabName, currentStatus: StatusProses): number => {
    const statusOrder: StatusProses[] = [
      'draft', 'awaiting_payment', 'paid', 'data_completed',
      'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
      'announced', 'accepted', 'enrolled'
    ];
    
    const tabRequirements: Partial<Record<TabName, StatusProses>> = {
      'kelengkapan-berkas': 'paid',
      'undangan-seleksi': 'docs_verified',
      'pengumuman': 'announced',
      'daftar-ulang': 'accepted'
    };
    
    const requiredStatus = tabRequirements[tabName];
    if (!requiredStatus) return 0;
    
    const currentIndex = statusOrder.indexOf(currentStatus);
    const requiredIndex = statusOrder.indexOf(requiredStatus);
    
    if (currentIndex < 0 || requiredIndex < 0) return 0;
    if (currentIndex >= requiredIndex) return 100;
    
    return Math.round(((currentIndex + 1) / (requiredIndex + 1)) * 100);
  };

  // Fetch user status dari database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // 1. Get session
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to get session");
        
        const sessionData = await sessionRes.json();
        if (!sessionData.pendaftar_id) {
          console.warn("No pendaftar_id in session");
          setLoading(false);
          return;
        }

        // 2. Get user status - coba endpoint utama
        const statusRes = await fetch(
          `/api/pendaftar/status?pendaftar_id=${sessionData.pendaftar_id}`,
        );
        
        if (!statusRes.ok) {
          // Fallback: coba endpoint alternatif
          console.warn("Primary status endpoint failed, trying fallback...");
          const fallbackRes = await fetch("/api/pendaftar/current-status");
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            setStatusProses(fallbackData.status_proses || "draft");
            setNomorPendaftaran(fallbackData.nomor_pendaftaran || "MTI20260006");
            setLoading(false);
            return;
          }
          throw new Error("All status endpoints failed");
        }
        
        const userData = await statusRes.json();
        setStatusProses((userData.status_proses || "draft") as StatusProses);
        setNomorPendaftaran(userData.nomor_pendaftaran || "MTI20260006");
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Default values for development
        setStatusProses("draft");
        setNomorPendaftaran("MTI20260006");
      } finally {
        setLoading(false);
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
    name: "Status Pembayaran",
    href: "/dashboard/pendaftar/status-pembayaran",
    tabName: "status-pembayaran" as TabName,
    icon: CreditCard, // atau icon lain
    active: pathname === "/dashboard/pendaftar/status-pembayaran",
  },
  {
    name: "Kelengkapan Berkas",
    href: "/dashboard/pendaftar/kelengkapan-berkas",
    tabName: "kelengkapan-berkas" as TabName,
    icon: FileCheck,
    active: pathname === "/dashboard/pendaftar/kelengkapan-berkas",
  },
  {
    name: "Upload Berkas",
    href: "/dashboard/pendaftar/upload-berkas",
    tabName: "upload-berkas" as TabName,
    icon: Upload, // perlu import Upload dari lucide
    active: pathname === "/dashboard/pendaftar/upload-berkas",
  },
  {
    name: "Download Berkas",
    href: "/dashboard/pendaftar/download-berkas",
    tabName: "download-berkas" as TabName,
    icon: Download, // perlu import Download
    active: pathname === "/dashboard/pendaftar/download-berkas",
  },
  {
    name: "Undangan Seleksi",
    href: "/dashboard/pendaftar/undangan-seleksi",
    tabName: "undangan-seleksi" as TabName, // ⬅️ INI YANG PERUBAHAN
    icon: Calendar,
    active: pathname === "/dashboard/pendaftar/undangan-seleksi",
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
  {
    name: "Profil",
    href: "/dashboard/pendaftar/profil",
    tabName: "profil" as TabName,
    icon: User, // atau UserCircle
    active: pathname === "/dashboard/pendaftar/profil",
  },
];

  // Function untuk cek apakah tab bisa diakses
  const isTabAccessible = (tabName: TabName) => {
    return canAccessTab(tabName, statusProses);
  };

  // NavLink component dengan conditional rendering
  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    const isAccessible = isTabAccessible(item.tabName);
    const progressToUnlock = calculateProgressToUnlock(item.tabName, statusProses);

    if (!isAccessible) {
      return (
        <div
          title={`Selesaikan tahap sebelumnya untuk membuka akses. Progress: ${progressToUnlock}%`}
          className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-stone-400 cursor-not-allowed bg-stone-50 relative overflow-hidden"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.name}
          <Lock className="w-4 h-4 ml-auto" />
          
          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200">
            <div 
              className="h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${progressToUnlock}%` }}
            />
          </div>
          
          {/* Progress text (hover only) */}
          <div className="absolute inset-0 bg-stone-800 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-bold">
              {progressToUnlock}% Menuju Unlock
            </span>
          </div>
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all relative ${
          item.active
            ? "bg-teal-500 text-white shadow-lg"
            : "text-stone-700 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md"
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        {item.name}
        
        {/* Active indicator */}
        {item.active && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-300 rounded-b-xl" />
        )}
        
        {/* Hover arrow */}
        {!item.active && (
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 border-2 border-teal-300 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
            </div>
          </div>
        )}
      </Link>
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-stone-800 mb-2">Memuat Dashboard</h2>
          <p className="text-stone-600">Mengambil data status pendaftaran Anda...</p>
          <div className="mt-6 w-64 h-2 bg-stone-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-teal-500 rounded-full animate-pulse" style={{ width: "70%" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <IdleTimeoutTracker />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b-2 border-teal-200 shadow-lg sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-stone-900">Dashboard</h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  statusProses === 'draft' ? 'bg-amber-500' :
                  statusProses === 'paid' ? 'bg-blue-500' :
                  statusProses === 'accepted' ? 'bg-green-500' :
                  'bg-teal-500'
                }`} />
                <p className="text-xs text-stone-600">
                  Status: {formatStatusForDisplay(statusProses)}
                </p>
              </div>
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
            <div className="flex flex-col h-full bg-white border-r-2 border-teal-200 overflow-y-auto shadow-xl">
              {/* Logo & Brand */}
              <div className="flex items-center justify-center mb-8 px-6 pt-8">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3 rounded-2xl shadow-lg">
                  <User className="w-8 h-8" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-black text-stone-900">
                    Dashboard
                  </h2>
                  <p className="text-sm text-stone-600">Pendaftar</p>
                </div>
              </div>

              {/* Status Info */}
              <div className="px-4 mb-6">
                <div className="bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-4 border border-teal-100">
                  <p className="text-xs text-stone-600 mb-1">Nomor Pendaftaran</p>
                  <p className="font-bold text-teal-700 text-sm">{nomorPendaftaran}</p>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-600">Progress</span>
                      <span className="font-bold text-teal-700">
                        {(() => {
                          const statusOrder: StatusProses[] = [
                            'draft', 'awaiting_payment', 'paid', 'data_completed',
                            'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
                            'announced', 'accepted', 'enrolled'
                          ];
                          const currentIndex = statusOrder.indexOf(statusProses);
                          return currentIndex >= 0 ? 
                            `${Math.round(((currentIndex + 1) / statusOrder.length) * 100)}%` : 
                            "0%";
                        })()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500"
                        style={{
                          width: (() => {
                            const statusOrder: StatusProses[] = [
                              'draft', 'awaiting_payment', 'paid', 'data_completed',
                              'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
                              'announced', 'accepted', 'enrolled'
                            ];
                            const currentIndex = statusOrder.indexOf(statusProses);
                            return currentIndex >= 0 ? 
                              `${((currentIndex + 1) / statusOrder.length) * 100}%` : 
                              "0%";
                          })()
                        }}
                      />
                    </div>
                    <p className="text-xs text-stone-500 mt-2 text-center">
                      {formatStatusForDisplay(statusProses)}
                    </p>
                  </div>
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
                <div className="text-xs text-stone-500 mb-3 text-center">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Tab terkunci akan terbuka sesuai progress
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
                  {/* Mobile Sidebar Header */}
                  <div className="flex items-center justify-center mb-8 px-6">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3 rounded-2xl">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-black text-stone-900">
                        Dashboard
                      </h2>
                      <p className="text-sm text-stone-600">Pendaftar</p>
                    </div>
                  </div>
                  
                  {/* Mobile Status Info */}
                  <div className="px-4 mb-6">
                    <div className="bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-4">
                      <p className="text-xs text-stone-600">Nomor Pendaftaran</p>
                      <p className="font-bold text-teal-700 text-sm">{nomorPendaftaran}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        Status: {formatStatusForDisplay(statusProses)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                      const isAccessible = isTabAccessible(item.tabName);
                      const progressToUnlock = calculateProgressToUnlock(item.tabName, statusProses);

                      if (!isAccessible) {
                        return (
                          <div
                            key={item.name}
                            title={`Progress: ${progressToUnlock}%`}
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-stone-400 opacity-50 cursor-not-allowed bg-stone-100 relative"
                            onClick={() => setSidebarOpen(false)}
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
                  
                  {/* Mobile Logout */}
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
                    {/* Status Badge */}
                    <div className="bg-gradient-to-r from-teal-50 to-amber-50 px-4 py-2 rounded-xl border border-teal-100">
                      <p className="text-xs text-stone-600">Status saat ini:</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          statusProses === 'draft' ? 'bg-amber-500' :
                          statusProses === 'paid' ? 'bg-blue-500' :
                          statusProses === 'accepted' ? 'bg-green-500' :
                          'bg-teal-500'
                        }`} />
                        <p className="font-bold text-teal-700">
                          {formatStatusForDisplay(statusProses)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-stone-600">Nomor Pendaftaran</p>
                      <p className="font-bold text-teal-700">{nomorPendaftaran}</p>
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