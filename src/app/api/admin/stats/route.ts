import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    // 1. Validasi session manual (karena login pake custom cookie)
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Check custom role from cookie
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch pendaftar data with status
    const { data: pendaftarData, error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .select("id, status_pendaftaran");

    if (pendaftarError) {
      console.error("Error fetching pendaftar:", pendaftarError);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    // Fetch pembayaran data
    const { data: pembayaranData, error: pembayaranError } = await supabaseAdmin
      .from("pembayaran")
      .select("pendaftar_id, status_pembayaran");

    if (pembayaranError) {
      console.error("Error fetching pembayaran:", pembayaranError);
    }

    // Calculate pendaftar status counts
    const total_pendaftar = pendaftarData?.length || 0;
    const statusCounts: Record<string, number> = {};
    (pendaftarData || []).forEach((item) => {
      const status = item.status_pendaftaran;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    // Calculate pembayaran status counts
    const pembayaranCounts: Record<string, number> = {};
    const pendaftarWithPayment = new Set<string>();
    (pembayaranData || []).forEach((item) => {
      const status = item.status_pembayaran;
      pembayaranCounts[status] = (pembayaranCounts[status] || 0) + 1;
      pendaftarWithPayment.add(item.pendaftar_id);
    });

    // Calculate pendaftar without any payment record
    const pendaftarWithoutPayment = (pendaftarData || []).filter(
      (p) => !pendaftarWithPayment.has(p.id)
    ).length;

    // Comprehensive stats mapping
    // NOTE: Database constraint only allows these status_pendaftaran values:
    // draft, payment_verification, verified, rejected, scheduled, accepted
    const stats = {
      // Total
      total_pendaftar,

      // === PEMBAYARAN ===
      // Belum Bayar: draft status (belum upload bukti)
      belum_bayar: statusCounts.draft || 0,

      // Menunggu Verifikasi Pembayaran: payment_verification status
      menunggu_verifikasi_pembayaran: statusCounts.payment_verification || 0,

      // Sudah Bayar: verified status and beyond (payment approved)
      sudah_bayar:
        (statusCounts.verified || 0) +
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),

      // Pembayaran Ditolak: rejected status
      pembayaran_ditolak: statusCounts.rejected || 0,

      // === DATA LENGKAP ===
      // Belum Isi Data Lengkap: verified status (payment approved, data belum lengkap)
      // For now, using "verified" as the status for payment approved but data not complete
      belum_isi_data: statusCounts.verified || 0,

      // Sudah Isi Data Lengkap: scheduled or accepted (already past data entry)
      sudah_isi_data:
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),

      // === DOKUMEN ===
      // Note: Current DB constraint doesn't have docs_* statuses
      // Using scheduled as "documents verified" for now
      belum_upload_dokumen: 0, // No specific status for this yet
      menunggu_verifikasi_dokumen: 0, // No specific status for this yet
      dokumen_terverifikasi:
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),
      dokumen_ditolak: 0, // No specific status for this yet

      // === UJIAN & WAWANCARA ===
      // Terjadwal Ujian: scheduled status
      terjadwal_ujian: statusCounts.scheduled || 0,

      // Belum Ujian: scheduled but not accepted yet
      belum_ujian: statusCounts.scheduled || 0,

      // Sudah Ujian: accepted (exam completed and passed)
      sudah_ujian: statusCounts.accepted || 0,

      // Hasil Ujian: accepted
      hasil_ujian: statusCounts.accepted || 0,

      // === PENERIMAAN ===
      // Diterima: accepted status
      diterima: statusCounts.accepted || 0,

      // Belum Daftar Ulang: accepted but not enrolled (using accepted for now)
      belum_daftar_ulang: statusCounts.accepted || 0,

      // Sudah Daftar Ulang: enrolled (not in current constraint)
      sudah_daftar_ulang: 0,

      // === LEGACY (for backward compatibility) ===
      pending_verification: 0,
      verified: statusCounts.verified || 0,
      rejected: statusCounts.rejected || 0,
      pending_payment:
        (statusCounts.draft || 0) + (statusCounts.payment_verification || 0),
      paid: statusCounts.verified || 0,
      scheduled_exams: statusCounts.scheduled || 0,
      announced: 0,
      accepted: statusCounts.accepted || 0,
      enrolled: 0,

      // Raw counts for debugging
      _raw_status_counts: statusCounts,
      _raw_pembayaran_counts: pembayaranCounts,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error in admin stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
