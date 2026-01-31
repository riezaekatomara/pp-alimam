import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check admin authorization
    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const jenjang = searchParams.get("jenjang") || "";
    const tahunAjaran = searchParams.get("tahun_ajaran") || "";
    const provinsi = searchParams.get("provinsi") || "";
    const kabupaten = searchParams.get("kabupaten") || "";
    const kecamatan = searchParams.get("kecamatan") || "";
    const kelurahan = searchParams.get("kelurahan") || "";

    // Build query - fetch ALL records (no pagination for export)
    let query = supabase
      .from("pendaftar")
      .select(
        `
        id,
        nomor_pendaftaran,
        nik,
        nama_lengkap,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        jenjang,
        asal_sekolah,
        alamat,
        kelurahan,
        kecamatan,
        kota_kabupaten,
        provinsi,
        kode_pos,
        no_hp,
        email,
        status_proses,
        created_at,
        tahun_ajaran:tahun_ajaran_id (nama)
      `
      )
      .order("created_at", { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(
        `nama_lengkap.ilike.%${search}%,nik.ilike.%${search}%,nomor_pendaftaran.ilike.%${search}%`
      );
    }
    if (status) {
      query = query.eq("status_proses", status);
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

    const { data: pendaftarData, error } = await query;

    if (error) {
      console.error("Error fetching for export:", error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    // Convert to CSV
    const headers = [
      "Nomor Pendaftaran",
      "NIK",
      "Nama Lengkap",
      "Jenis Kelamin",
      "Tempat Lahir",
      "Tanggal Lahir",
      "Jenjang",
      "Asal Sekolah",
      "Alamat",
      "Kelurahan",
      "Kecamatan",
      "Kota/Kabupaten",
      "Provinsi",
      "Kode Pos",
      "No HP",
      "Email",
      "Status",
      "Tahun Ajaran",
      "Tanggal Daftar",
    ];

    const csvRows = [headers.join(",")];

    for (const item of pendaftarData || []) {
      const row = [
        item.nomor_pendaftaran || "",
        item.nik || "",
        `"${(item.nama_lengkap || "").replace(/"/g, '""')}"`,
        item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
        `"${(item.tempat_lahir || "").replace(/"/g, '""')}"`,
        item.tanggal_lahir || "",
        item.jenjang || "",
        `"${(item.asal_sekolah || "").replace(/"/g, '""')}"`,
        `"${(item.alamat || "").replace(/"/g, '""')}"`,
        `"${(item.kelurahan || "").replace(/"/g, '""')}"`,
        `"${(item.kecamatan || "").replace(/"/g, '""')}"`,
        `"${(item.kota_kabupaten || "").replace(/"/g, '""')}"`,
        `"${(item.provinsi || "").replace(/"/g, '""')}"`,
        item.kode_pos || "",
        item.no_hp || "",
        item.email || "",
        item.status_proses || "",
        item.tahun_ajaran?.nama || "",
        item.created_at
          ? new Date(item.created_at).toLocaleDateString("id-ID")
          : "",
      ];
      csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\n");

    // Return as downloadable CSV file
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="pendaftar-${new Date()
          .toISOString()
          .split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
