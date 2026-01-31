import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// GET: List pembayaran yang perlu diverifikasi
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

    // Fetch pembayaran
    const { data, error } = await supabase
      .from("pembayaran")
      .select(
        `
        id,
        jumlah,
        metode_pembayaran,
        status_pembayaran,
        catatan,
        bukti_transfer_url,
        tanggal_pembayaran,
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
      .eq("status_pembayaran", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pembayaran:", error);
      return NextResponse.json(
        { error: "Failed to fetch payments" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Error in pembayaran verification API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Verify or reject pembayaran
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
    const { pembayaran_id, status_pembayaran, catatan } = body;

    if (!pembayaran_id || !status_pembayaran) {
      return NextResponse.json(
        { error: "pembayaran_id and status_pembayaran are required" },
        { status: 400 }
      );
    }

    if (!["verified", "rejected"].includes(status_pembayaran)) {
      return NextResponse.json(
        { error: "status_pembayaran must be verified or rejected" },
        { status: 400 }
      );
    }

    // Update pembayaran
    const { data, error } = await supabase
      .from("pembayaran")
      .update({
        status_pembayaran,
        catatan,
        verified_by: user.id,
        verified_at: new Date().toISOString(),
      })
      .eq("id", pembayaran_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating pembayaran:", error);
      return NextResponse.json(
        { error: "Failed to update payment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in pembayaran verification update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
