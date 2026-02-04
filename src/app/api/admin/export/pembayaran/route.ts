import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    // Validate session
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

    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query params
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "all"; // all, lunas, pending
    const format = url.searchParams.get("format") || "csv";

    // Fetch data
    let query = supabaseAdmin
      .from("pendaftar")
      .select(`
        id,
        nomor_pendaftaran,
        nama_lengkap,
        nik,
        jenis_kelamin,
        jenjang,
        no_hp,
        email,
        provinsi,
        kabupaten,
        status_pendaftaran,
        created_at,
        pembayaran (
          id,
          jumlah,
          metode_pembayaran,
          status_pembayaran,
          created_at,
          verified_at
        )
      `)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    // Process data
    const processedData = (data || []).map((p: any) => {
      const pembayaran = p.pembayaran?.[0];
      return {
        nomor_pendaftaran: p.nomor_pendaftaran,
        nama_lengkap: p.nama_lengkap,
        nik: p.nik,
        jenis_kelamin: p.jenis_kelamin,
        jenjang: p.jenjang,
        no_hp: p.no_hp || "",
        email: p.email || "",
        provinsi: p.provinsi || "",
        kabupaten: p.kabupaten || "",
        status_pendaftaran: p.status_pendaftaran,
        tanggal_daftar: new Date(p.created_at).toLocaleDateString("id-ID"),
        jumlah_pembayaran: pembayaran?.jumlah || 0,
        metode_pembayaran: pembayaran?.metode_pembayaran || "",
        status_pembayaran: pembayaran?.status_pembayaran || "belum_bayar",
        tanggal_pembayaran: pembayaran?.created_at
          ? new Date(pembayaran.created_at).toLocaleDateString("id-ID")
          : "",
        tanggal_verifikasi: pembayaran?.verified_at
          ? new Date(pembayaran.verified_at).toLocaleDateString("id-ID")
          : "",
      };
    });

    // Filter by type
    let filteredData = processedData;
    if (type === "lunas") {
      filteredData = processedData.filter((p: any) => p.status_pembayaran === "verified");
    } else if (type === "pending") {
      filteredData = processedData.filter(
        (p: any) => p.status_pembayaran === "pending" || p.status_pembayaran === "belum_bayar"
      );
    }

    // Generate CSV
    const headers = [
      "No. Pendaftaran",
      "Nama Lengkap",
      "NIK",
      "Jenis Kelamin",
      "Jenjang",
      "No. HP",
      "Email",
      "Provinsi",
      "Kabupaten",
      "Status Pendaftaran",
      "Tanggal Daftar",
      "Jumlah Pembayaran",
      "Metode Pembayaran",
      "Status Pembayaran",
      "Tanggal Pembayaran",
      "Tanggal Verifikasi",
    ];

    const rows = filteredData.map((item: any) => [
      item.nomor_pendaftaran,
      item.nama_lengkap,
      item.nik,
      item.jenis_kelamin,
      item.jenjang,
      item.no_hp,
      item.email,
      item.provinsi,
      item.kabupaten,
      item.status_pendaftaran,
      item.tanggal_daftar,
      item.jumlah_pembayaran,
      item.metode_pembayaran,
      item.status_pembayaran,
      item.tanggal_pembayaran,
      item.tanggal_verifikasi,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row: any[]) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Add BOM for Excel UTF-8 compatibility
    const bom = "\uFEFF";
    const csvWithBom = bom + csvContent;

    // Return as downloadable file
    const filename = `pembayaran_ppdb_${type}_${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
