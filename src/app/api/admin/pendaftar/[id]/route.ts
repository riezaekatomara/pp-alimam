import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    // 1. Validasi session manual (match list route logic)
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
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch pendaftar with all related data using supabaseAdmin (bypass RLS)
    const { data: pendaftar, error } = await supabaseAdmin
      .from("pendaftar")
      .select(
        `
        *,
        tahun_ajaran (
          id,
          nama,
          tahun_mulai,
          tahun_selesai,
          biaya_pendaftaran
        ),
        orang_tua (*),
        dokumen (*),
        pembayaran (*),
        jadwal_ujian (*),
        nilai_ujian (*),
        pengumuman (*),
        data_rapor (*),
        data_prestasi (*),
        data_kesehatan (*),
        data_asrama (*)
      `
      )
      .eq("id", params.id)
      .single();

    console.log("Fetching pendaftar with ID:", params.id);

    if (error || !pendaftar) {
      console.error("Supabase Error fetching pendaftar:", error);
      return NextResponse.json(
        { error: "Pendaftar not found", details: error },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: pendaftar });
  } catch (error) {
    console.error("Error in admin pendaftar detail API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update pendaftar status
export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
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

    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { status_proses } = body;

    if (!status_proses) {
      return NextResponse.json(
        { error: "status_proses is required" },
        { status: 400 }
      );
    }

    // Update pendaftar status
    const { data, error } = await supabaseAdmin
      .from("pendaftar")
      .update({
        status_pendaftaran: status_proses, // Fixed: status_proses -> status_pendaftaran to match DB
        updated_at: new Date().toISOString()
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating pendaftar:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error in admin pendaftar update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
