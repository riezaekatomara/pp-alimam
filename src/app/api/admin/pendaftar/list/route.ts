import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session manual
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

    // Check custom role
    const allowedRoles = ["admin", "admin_super", "admin_berkas", "admin_keuangan", "penguji"];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use Admin Client to bypass RLS
    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const jenjang = searchParams.get("jenjang") || "";
    const tahunAjaran = searchParams.get("tahun_ajaran") || "";
    const provinsi = searchParams.get("provinsi") || "";
    const kabupaten = searchParams.get("kabupaten") || "";
    const kecamatan = searchParams.get("kecamatan") || "";
    const kelurahan = searchParams.get("kelurahan") || "";

    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from("pendaftar")
      .select(
        `
        id,
        nomor_pendaftaran,
        nik,
        nama_lengkap,
        jenis_kelamin,
        jenjang,
        tanggal_lahir,
        no_hp,
        email,
        status_pendaftaran,
        created_at,
        tahun_ajaran:tahun_ajaran_id (
          nama
        ),
        pembayaran (
          status_pembayaran
        ),
        dokumen (
          jenis_dokumen,
          is_verified
        ),
        nilai_ujian (
          nilai_total
        )
      `,
        { count: "exact" }
      );

    // Apply filters
    if (search) {
      query = query.or(
        `nama_lengkap.ilike.%${search}%,nik.ilike.%${search}%,nomor_pendaftaran.ilike.%${search}%`
      );
    }

    // Handle filter categories from dashboard
    if (status) {
      // Map dashboard filter categories to actual status values
      // NOTE: Database constraint only allows: draft, payment_verification, verified, rejected, scheduled, accepted
      const filterMapping: Record<string, string[]> = {
        // Pembayaran
        belum_bayar: ["draft"],
        menunggu_verifikasi_pembayaran: ["payment_verification"],
        sudah_bayar: ["verified", "scheduled", "accepted"],
        pembayaran_ditolak: ["rejected"],
        // Data Lengkap
        belum_isi_data: ["verified"],  // payment approved but data not complete
        sudah_isi_data: ["scheduled", "accepted"],  // data completed, moved to next stage
        // Dokumen (using existing valid statuses)
        belum_upload_dokumen: ["verified"],
        menunggu_verifikasi_dokumen: [],  // Not in current constraint
        dokumen_terverifikasi: ["scheduled", "accepted"],
        dokumen_ditolak: [],  // Not in current constraint
        // Ujian
        terjadwal_ujian: ["scheduled"],
        belum_ujian: ["scheduled"],
        sudah_ujian: ["accepted"],
        hasil_ujian: ["accepted"],
        // Penerimaan
        diterima: ["accepted"],
        belum_daftar_ulang: ["accepted"],
        sudah_daftar_ulang: [],  // Not in current constraint
      };

      const statusValues = filterMapping[status];
      if (statusValues && statusValues.length > 0) {
        // Use IN filter for multiple status values
        query = query.in("status_pendaftaran", statusValues);
      } else {
        // Single status value (legacy support)
        query = query.eq("status_pendaftaran", status);
      }
    }

    if (jenjang) {
      query = query.eq("jenjang", jenjang);
    }

    if (tahunAjaran) {
      query = query.eq("tahun_ajaran_id", tahunAjaran);
    }

    if (provinsi) {
      query = query.eq("provinsi", provinsi);
    }

    if (kabupaten) {
      query = query.eq("kabupaten", kabupaten);
    }

    if (kecamatan) {
      query = query.eq("kecamatan", kecamatan);
    }

    if (kelurahan) {
      query = query.eq("kelurahan", kelurahan);
    }

    // Apply pagination and sorting
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching pendaftar:", error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in admin pendaftar list API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
