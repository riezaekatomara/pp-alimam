"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  FileCheck,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  XCircle,
  FileX,
  Upload,
  ClipboardCheck,
  GraduationCap,
  Trophy,
  BookOpen,
  UserPlus,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  total_pendaftar: number;
  // Pembayaran
  belum_bayar: number;
  menunggu_verifikasi_pembayaran: number;
  sudah_bayar: number;
  pembayaran_ditolak: number;
  // Data Lengkap
  belum_isi_data: number;
  sudah_isi_data: number;
  // Dokumen
  belum_upload_dokumen: number;
  menunggu_verifikasi_dokumen: number;
  dokumen_terverifikasi: number;
  dokumen_ditolak: number;
  // Ujian
  terjadwal_ujian: number;
  belum_ujian: number;
  sudah_ujian: number;
  hasil_ujian: number;
  // Penerimaan
  diterima: number;
  belum_daftar_ulang: number;
  sudah_daftar_ulang: number;
}

interface StatCard {
  title: string;
  value: number;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  textColor: string;
  borderColor: string;
  link: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total_pendaftar: 0,
    belum_bayar: 0,
    menunggu_verifikasi_pembayaran: 0,
    sudah_bayar: 0,
    pembayaran_ditolak: 0,
    belum_isi_data: 0,
    sudah_isi_data: 0,
    belum_upload_dokumen: 0,
    menunggu_verifikasi_dokumen: 0,
    dokumen_terverifikasi: 0,
    dokumen_ditolak: 0,
    terjadwal_ujian: 0,
    belum_ujian: 0,
    sudah_ujian: 0,
    hasil_ujian: 0,
    diterima: 0,
    belum_daftar_ulang: 0,
    sudah_daftar_ulang: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat statistik dashboard...</p>
        </div>
      </div>
    );
  }

  // Card untuk Total Pendaftar
  const totalCard: StatCard = {
    title: "Total Pendaftar",
    value: stats.total_pendaftar,
    icon: Users,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    link: "/dashboard/admin/pendaftar",
  };

  // Cards untuk Pembayaran
  const pembayaranCards: StatCard[] = [
    {
      title: "Belum Bayar",
      value: stats.belum_bayar,
      icon: AlertCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      link: "/dashboard/admin/pendaftar?filter=belum_bayar",
    },
    {
      title: "Menunggu Verifikasi Pembayaran",
      value: stats.menunggu_verifikasi_pembayaran,
      icon: Clock,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      textColor: "text-amber-600",
      borderColor: "border-amber-200",
      link: "/dashboard/admin/verifikasi-pembayaran",
    },
    {
      title: "Sudah Bayar",
      value: stats.sudah_bayar,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      link: "/dashboard/admin/pendaftar?filter=sudah_bayar",
    },
    {
      title: "Pembayaran Ditolak",
      value: stats.pembayaran_ditolak,
      icon: XCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      textColor: "text-red-600",
      borderColor: "border-red-200",
      link: "/dashboard/admin/pendaftar?filter=pembayaran_ditolak",
    },
  ];

  // Cards untuk Data Lengkap
  const dataLengkapCards: StatCard[] = [
    {
      title: "Belum Isi Data Lengkap",
      value: stats.belum_isi_data,
      icon: FileText,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      textColor: "text-pink-600",
      borderColor: "border-pink-200",
      link: "/dashboard/admin/pendaftar?filter=belum_isi_data",
    },
    {
      title: "Sudah Isi Data Lengkap",
      value: stats.sudah_isi_data,
      icon: ClipboardCheck,
      bgColor: "bg-lime-100",
      iconColor: "text-lime-600",
      textColor: "text-lime-600",
      borderColor: "border-lime-200",
      link: "/dashboard/admin/pendaftar?filter=sudah_isi_data",
    },
  ];

  // Cards untuk Dokumen
  const dokumenCards: StatCard[] = [
    {
      title: "Belum Upload Dokumen",
      value: stats.belum_upload_dokumen,
      icon: Upload,
      bgColor: "bg-slate-100",
      iconColor: "text-slate-600",
      textColor: "text-slate-600",
      borderColor: "border-slate-200",
      link: "/dashboard/admin/pendaftar?filter=belum_upload_dokumen",
    },
    {
      title: "Menunggu Verifikasi Dokumen",
      value: stats.menunggu_verifikasi_dokumen,
      icon: FileCheck,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      link: "/dashboard/admin/verifikasi-dokumen",
    },
    {
      title: "Dokumen Terverifikasi",
      value: stats.dokumen_terverifikasi,
      icon: ClipboardCheck,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      link: "/dashboard/admin/pendaftar?filter=dokumen_terverifikasi",
    },
    {
      title: "Dokumen Ditolak",
      value: stats.dokumen_ditolak,
      icon: FileX,
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600",
      textColor: "text-rose-600",
      borderColor: "border-rose-200",
      link: "/dashboard/admin/pendaftar?filter=dokumen_ditolak",
    },
  ];

  // Cards untuk Ujian & Wawancara
  const ujianCards: StatCard[] = [
    {
      title: "Terjadwal Ujian & Wawancara",
      value: stats.terjadwal_ujian,
      icon: Calendar,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      link: "/dashboard/admin/pendaftar?filter=terjadwal_ujian",
    },
    {
      title: "Belum Ujian & Wawancara",
      value: stats.belum_ujian,
      icon: Clock,
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
      textColor: "text-violet-600",
      borderColor: "border-violet-200",
      link: "/dashboard/admin/pendaftar?filter=belum_ujian",
    },
    {
      title: "Sudah Ujian & Wawancara",
      value: stats.sudah_ujian,
      icon: BookOpen,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      link: "/dashboard/admin/pendaftar?filter=sudah_ujian",
    },
    {
      title: "Hasil Ujian & Wawancara",
      value: stats.hasil_ujian,
      icon: Trophy,
      bgColor: "bg-fuchsia-100",
      iconColor: "text-fuchsia-600",
      textColor: "text-fuchsia-600",
      borderColor: "border-fuchsia-200",
      link: "/dashboard/admin/pendaftar?filter=hasil_ujian",
    },
  ];

  // Cards untuk Penerimaan
  const penerimaanCards: StatCard[] = [
    {
      title: "Pendaftar Diterima",
      value: stats.diterima,
      icon: UserCheck,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      textColor: "text-teal-600",
      borderColor: "border-teal-200",
      link: "/dashboard/admin/pendaftar?filter=diterima",
    },
    {
      title: "Belum Daftar Ulang",
      value: stats.belum_daftar_ulang,
      icon: UserX,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      textColor: "text-cyan-600",
      borderColor: "border-cyan-200",
      link: "/dashboard/admin/pendaftar?filter=belum_daftar_ulang",
    },
    {
      title: "Sudah Daftar Ulang",
      value: stats.sudah_daftar_ulang,
      icon: GraduationCap,
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      textColor: "text-sky-600",
      borderColor: "border-sky-200",
      link: "/dashboard/admin/pendaftar?filter=sudah_daftar_ulang",
    },
  ];

  const StatCardComponent = ({ card }: { card: StatCard }) => (
    <Link
      href={card.link}
      className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 ${card.borderColor} hover:border-blue-400 overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 ${card.bgColor} rounded-lg`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-blue-600 text-xs font-bold">Lihat →</span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-1 line-clamp-2">{card.title}</p>
        <p className={`text-2xl font-black ${card.textColor}`}>
          {card.value.toLocaleString("id-ID")}
        </p>
      </div>
      <div className={`h-1 ${card.bgColor}`} />
    </Link>
  );

  const SectionTitle = ({
    icon: Icon,
    title,
    color,
  }: {
    icon: React.ElementType;
    title: string;
    color: string;
  }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 ${color} rounded-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-bold text-stone-800">{title}</h3>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900">
              Dashboard Overview
            </h2>
            <p className="text-stone-600">
              Statistik dan ringkasan sistem PPDB Al-Imam
            </p>
          </div>
        </div>
      </div>

      {/* Total Pendaftar - Full Width */}
      <Link
        href={totalCard.link}
        className="group block bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Pendaftar</p>
              <p className="text-4xl font-black text-white">
                {stats.total_pendaftar.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-bold">Lihat Semua →</span>
          </div>
        </div>
      </Link>

      {/* Section: Pembayaran */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100">
        <SectionTitle
          icon={CreditCard}
          title="Status Pembayaran"
          color="bg-orange-500"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pembayaranCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Section: Data Lengkap */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100">
        <SectionTitle
          icon={FileText}
          title="Status Pengisian Data Lengkap"
          color="bg-pink-500"
        />
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {dataLengkapCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Section: Dokumen */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-100">
        <SectionTitle
          icon={FileCheck}
          title="Status Dokumen"
          color="bg-yellow-500"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dokumenCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Section: Ujian & Wawancara */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
        <SectionTitle
          icon={Calendar}
          title="Status Ujian & Wawancara"
          color="bg-purple-500"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ujianCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Section: Penerimaan & Daftar Ulang */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100">
        <SectionTitle
          icon={GraduationCap}
          title="Status Penerimaan & Daftar Ulang"
          color="bg-teal-500"
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {penerimaanCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/admin/pendaftar"
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-bold text-blue-900">Daftar Pendaftar</p>
              <p className="text-xs text-blue-600">Kelola semua pendaftar</p>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/verifikasi-pembayaran"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
          >
            <CreditCard className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-green-900">Verifikasi Pembayaran</p>
              <p className="text-xs text-green-600">
                {stats.menunggu_verifikasi_pembayaran} menunggu
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/verifikasi-dokumen"
            className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200"
          >
            <FileCheck className="w-6 h-6 text-amber-600" />
            <div>
              <p className="font-bold text-amber-900">Verifikasi Dokumen</p>
              <p className="text-xs text-amber-600">
                {stats.menunggu_verifikasi_dokumen} menunggu
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/jadwal-ujian"
            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200"
          >
            <Calendar className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-bold text-purple-900">Jadwal Ujian</p>
              <p className="text-xs text-purple-600">Atur jadwal seleksi</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
