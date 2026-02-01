import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/pembayaran/status
 * Mengambil status pembayaran terbaru untuk pendaftar yang sedang login
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session (pendaftar pakai app_session cookie)
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid" },
        { status: 401 }
      );
    }

    if (session.role !== "pendaftar") {
      return NextResponse.json(
        { success: false, error: "Akses tidak diizinkan" },
        { status: 403 }
      );
    }

    // pendaftar_id = session.id (untuk role pendaftar, id adalah pendaftar.id)
    const pendaftarId = session.id;

    // 2. Ambil data pendaftar beserta tahun ajaran
    const { data: pendaftar, error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .select(`
        id,
        nomor_pendaftaran,
        nama_lengkap,
        tahun_ajaran_id,
        status_pendaftaran,
        tahun_ajaran:tahun_ajaran_id (
          id,
          nama,
          biaya_pendaftaran,
          tanggal_tutup_pendaftaran
        )
      `)
      .eq("id", pendaftarId)
      .single();

    if (pendaftarError || !pendaftar) {
      console.error("Error fetching pendaftar:", pendaftarError);
      return NextResponse.json(
        { success: false, error: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // 3. Ambil data pembayaran terbaru (jika ada)
    const { data: pembayaran, error: pembayaranError } = await supabaseAdmin
      .from("pembayaran")
      .select("*")
      .eq("pendaftar_id", pendaftarId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pembayaranError) {
      console.error("Error fetching pembayaran:", pembayaranError);
      // Tidak error jika belum ada pembayaran
    }

    // 4. Hitung deadline pembayaran
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tahunAjaranData = pendaftar.tahun_ajaran as any;
    const tahunAjaran = {
      id: tahunAjaranData?.id || "",
      nama: tahunAjaranData?.nama || "",
      biaya_pendaftaran: Number(tahunAjaranData?.biaya_pendaftaran || 0),
      tanggal_tutup_pendaftaran: tahunAjaranData?.tanggal_tutup_pendaftaran || "",
    };

    const deadline = new Date(tahunAjaran.tanggal_tutup_pendaftaran);
    const now = new Date();
    const isExpired = now > deadline;

    // 5. Tentukan status pembayaran
    let paymentStatus: "unpaid" | "pending" | "verified" | "rejected" | "expired" = "unpaid";

    if (pembayaran) {
      if (pembayaran.status_pembayaran === "verified") {
        paymentStatus = "verified";
      } else if (pembayaran.status_pembayaran === "rejected") {
        paymentStatus = "rejected";
      } else if (pembayaran.status_pembayaran === "pending") {
        paymentStatus = "pending";
      }
    }

    if (paymentStatus === "unpaid" && isExpired) {
      paymentStatus = "expired";
    }

    // 6. Return response
    return NextResponse.json({
      success: true,
      data: {
        pendaftar: {
          id: pendaftar.id,
          nomor_pendaftaran: pendaftar.nomor_pendaftaran,
          nama_lengkap: pendaftar.nama_lengkap,
          status_pendaftaran: pendaftar.status_pendaftaran,
        },
        tahun_ajaran: {
          id: tahunAjaran.id,
          nama: tahunAjaran.nama,
          biaya_pendaftaran: Number(tahunAjaran.biaya_pendaftaran),
          tanggal_tutup_pendaftaran: tahunAjaran.tanggal_tutup_pendaftaran,
        },
        pembayaran: pembayaran ? {
          id: pembayaran.id,
          metode_pembayaran: pembayaran.metode_pembayaran,
          jumlah: Number(pembayaran.jumlah),
          status_pembayaran: pembayaran.status_pembayaran,
          bukti_transfer_path: pembayaran.bukti_transfer_path,
          bukti_transfer_filename: pembayaran.bukti_transfer_filename,
          midtrans_order_id: pembayaran.midtrans_order_id,
          midtrans_payment_type: pembayaran.midtrans_payment_type,
          verified_at: pembayaran.verified_at,
          catatan_verifikasi: pembayaran.catatan_verifikasi,
          created_at: pembayaran.created_at,
          updated_at: pembayaran.updated_at,
        } : null,
        status: paymentStatus,
        deadline: tahunAjaran.tanggal_tutup_pendaftaran,
        is_deadline_passed: isExpired,
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/pembayaran/status:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengambil status pembayaran" },
      { status: 500 }
    );
  }
}
