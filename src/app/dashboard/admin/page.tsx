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
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  total_pendaftar: number;
  pending_verification: number;
  verified: number;
  rejected: number;
  pending_payment: number;
  paid: number;
  scheduled_exams: number;
  announced: number;
  accepted: number;
  enrolled: number;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total_pendaftar: 0,
    pending_verification: 0,
    verified: 0,
    rejected: 0,
    pending_payment: 0,
    paid: 0,
    scheduled_exams: 0,
    announced: 0,
    accepted: 0,
    enrolled: 0,
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

  const statCards = [
    {
      title: "Total Pendaftar",
      value: stats.total_pendaftar,
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/dashboard/admin/pendaftar",
    },
    {
      title: "Menunggu Verifikasi",
      value: stats.pending_verification,
      icon: Clock,
      color: "amber",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      link: "/dashboard/admin/verifikasi-dokumen",
    },
    {
      title: "Terverifikasi",
      value: stats.verified,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      link: "/dashboard/admin/pendaftar?filter=verified",
    },
    {
      title: "Ditolak",
      value: stats.rejected,
      icon: UserX,
      color: "red",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      link: "/dashboard/admin/pendaftar?filter=rejected",
    },
    {
      title: "Belum Bayar",
      value: stats.pending_payment,
      icon: AlertCircle,
      color: "orange",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/dashboard/admin/pendaftar?filter=pending_payment",
    },
    {
      title: "Sudah Bayar",
      value: stats.paid,
      icon: CreditCard,
      color: "emerald",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/dashboard/admin/verifikasi-pembayaran",
    },
    {
      title: "Jadwal Ujian",
      value: stats.scheduled_exams,
      icon: Calendar,
      color: "purple",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      link: "/dashboard/admin/jadwal-ujian",
    },
    {
      title: "Diterima",
      value: stats.accepted,
      icon: UserCheck,
      color: "teal",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      link: "/dashboard/admin/pendaftar?filter=accepted",
    },
  ];

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-stone-100 hover:border-blue-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.bgColor} rounded-lg`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-blue-600 text-sm font-bold">Lihat →</div>
                </div>
              </div>
              <div>
                <p className="text-sm text-stone-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-black text-${card.color}-600`}>
                  {card.value.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className={`h-1 bg-${card.color}-500`} />
          </Link>
        ))}
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
            href="/dashboard/admin/verifikasi-dokumen"
            className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200"
          >
            <FileCheck className="w-6 h-6 text-amber-600" />
            <div>
              <p className="font-bold text-amber-900">Verifikasi Dokumen</p>
              <p className="text-xs text-amber-600">
                {stats.pending_verification} menunggu
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/verifikasi-pembayaran"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
          >
            <CreditCard className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-green-900">Verifikasi Pembayaran</p>
              <p className="text-xs text-green-600">Cek bukti pembayaran</p>
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

      {/* Recent Activity (Placeholder) */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">
          Aktivitas Terbaru
        </h3>
        <div className="text-center py-8 text-stone-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-stone-400" />
          <p>Fitur aktivitas terbaru akan segera hadir</p>
        </div>
      </div>
    </div>
  );
}
