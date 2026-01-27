import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// Daftar semua jenis dokumen
const JENIS_DOKUMEN = [
  { key: "foto_santri", label: "Foto Calon Santri", required: true },
  { key: "ktp_ortu", label: "KTP Orang Tua", required: true },
  { key: "kartu_keluarga", label: "Kartu Keluarga", required: true },
  { key: "akta_kelahiran", label: "Akta Kelahiran", required: true },
  { key: "rapor_sem1", label: "Rapor Semester 1", required: true },
  { key: "rapor_sem2", label: "Rapor Semester 2", required: true },
  { key: "surat_kesanggupan", label: "Surat Kesanggupan", required: true },
  { key: "surat_kesehatan", label: "Surat Kesehatan", required: false },
  { key: "hasil_hbsag", label: "Hasil Tes HBsAg", required: false },
];

export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("auth_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan" },
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

    // 2. Ambil semua dokumen pendaftar
    const { data: dokumenList, error } = await supabaseAdmin
      .from("dokumen")
      .select("*")
      .eq("pendaftar_id", session.pendaftar_id);

    if (error) {
      console.error("Error fetching dokumen:", error);
      return NextResponse.json(
        { success: false, error: "Gagal mengambil data dokumen" },
        { status: 500 }
      );
    }

    // 3. Mapping status untuk setiap jenis dokumen
    const dokumenStatus = JENIS_DOKUMEN.map((jenis) => {
      const dokumen = dokumenList?.find((d) => d.jenis_dokumen === jenis.key);

      let status: "pending" | "uploaded" | "verified" | "rejected" = "pending";
      if (dokumen) {
        if (dokumen.is_verified) {
          status = "verified";
        } else if (dokumen.catatan && !dokumen.is_verified) {
          status = "rejected";
        } else {
          status = "uploaded";
        }
      }

      return {
        key: jenis.key,
        label: jenis.label,
        required: jenis.required,
        status,
        file_name: dokumen?.file_name || null,
        file_path: dokumen?.file_path || null,
        file_size: dokumen?.file_size || null,
        file_type: dokumen?.file_type || null,
        is_verified: dokumen?.is_verified || false,
        catatan: dokumen?.catatan || null,
        uploaded_at: dokumen?.created_at || null,
        verified_at: dokumen?.verified_at || null,
      };
    });

    // 4. Hitung progress
    const totalRequired = JENIS_DOKUMEN.filter((d) => d.required).length;
    const uploadedRequired = dokumenStatus.filter(
      (d) => d.required && d.status !== "pending"
    ).length;
    const verifiedCount = dokumenStatus.filter(
      (d) => d.status === "verified"
    ).length;

    // 5. Return data
    return NextResponse.json({
      success: true,
      data: {
        dokumen: dokumenStatus,
        summary: {
          total: JENIS_DOKUMEN.length,
          uploaded: dokumenList?.length || 0,
          verified: verifiedCount,
          pending: JENIS_DOKUMEN.length - (dokumenList?.length || 0),
          progress: {
            required: {
              total: totalRequired,
              uploaded: uploadedRequired,
              percentage: Math.round((uploadedRequired / totalRequired) * 100),
            },
            all: {
              total: JENIS_DOKUMEN.length,
              uploaded: dokumenList?.length || 0,
              percentage: Math.round(((dokumenList?.length || 0) / JENIS_DOKUMEN.length) * 100),
            },
          },
        },
      },
    });
  } catch (error: any) {
    console.error("Error in dokumen status API:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
