import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user role from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    let query = supabase
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
        status_proses,
        created_at,
        tahun_ajaran:tahun_ajaran_id (
          nama
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
