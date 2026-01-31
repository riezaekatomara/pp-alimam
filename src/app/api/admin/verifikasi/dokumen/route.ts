import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// GET: List dokumen yang perlu diverifikasi
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
    const status = searchParams.get("status") || "pending";

    // Fetch dokumen
    const { data, error } = await supabase
      .from("dokumen")
      .select(
        `
        id,
        jenis_dokumen,
        status_verifikasi,
        catatan,
        file_url,
        created_at,
        updated_at,
        pendaftar:pendaftar_id (
          id,
          nomor_pendaftaran,
          nama_lengkap,
          jenjang,
          no_hp
        )
      `
      )
      .eq("status_verifikasi", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dokumen:", error);
      return NextResponse.json(
        { error: "Failed to fetch documents" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Error in dokumen verification API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Verify or reject dokumen
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { dokumen_id, status_verifikasi, catatan } = body;

    if (!dokumen_id || !status_verifikasi) {
      return NextResponse.json(
        { error: "dokumen_id and status_verifikasi are required" },
        { status: 400 }
      );
    }

    if (!["verified", "rejected"].includes(status_verifikasi)) {
      return NextResponse.json(
        { error: "status_verifikasi must be verified or rejected" },
        { status: 400 }
      );
    }

    // Update dokumen
    const { data, error } = await supabase
      .from("dokumen")
      .update({
        status_verifikasi,
        catatan,
        verified_by: user.id,
        verified_at: new Date().toISOString(),
      })
      .eq("id", dokumen_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating dokumen:", error);
      return NextResponse.json(
        { error: "Failed to update document" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in dokumen verification update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
