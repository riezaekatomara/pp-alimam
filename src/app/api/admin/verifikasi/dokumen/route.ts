import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// GET: List dokumen yang perlu diverifikasi
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

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const statusParam = searchParams.get("status") || "pending";

    // Fetch dokumen using Admin Client
    let query = supabaseAdmin
      .from("dokumen")
      .select(
        `
        id,
        jenis_dokumen,
        is_verified,
        catatan,
        file_path,
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
      );

    // Filter Logic
    if (statusParam === "pending") {
      query = query.eq("is_verified", false);
    } else if (statusParam === "verified") {
      query = query.eq("is_verified", true);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

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

    const isVerified = status_verifikasi === "verified";

    // Update dokumen
    const { data, error } = await supabaseAdmin
      .from("dokumen")
      .update({
        is_verified: isVerified,
        catatan,
        verified_by: session.id,
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
