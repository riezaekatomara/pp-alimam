import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// GET: List pembayaran yang perlu diverifikasi
export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session manual (karena login pake custom cookie)
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

    // Check custom role from cookie
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || "pending";

    // Fetch pembayaran using Admin Client
    // Note: Using correct field names from database schema
    let query = supabaseAdmin
      .from("pembayaran")
      .select(
        `
        id,
        jumlah,
        metode_pembayaran,
        status_pembayaran,
        catatan_verifikasi,
        bukti_transfer_path,
        bukti_transfer_filename,
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

    if (status === "all") {
      // No filter
    } else if (status === "pending") {
      query = query.not("status_pembayaran", "in", '("verified","rejected")');
    } else {
      query = query.eq("status_pembayaran", status);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pembayaran:", error);
      return NextResponse.json(
        { error: "Failed to fetch payments" },
        { status: 500 }
      );
    }

    // Generate signed URLs for bukti_transfer_path and map field names for frontend compatibility
    const dataWithUrls = await Promise.all(
      (data || []).map(async (pembayaran) => {
        let bukti_transfer_url: string | null = null;

        if (pembayaran.bukti_transfer_path) {
          // Generate signed URL for private bucket (expires in 1 hour)
          const { data: signedUrlData } = await supabaseAdmin.storage
            .from("bukti-pembayaran")
            .createSignedUrl(pembayaran.bukti_transfer_path, 3600);

          bukti_transfer_url = signedUrlData?.signedUrl || null;
        }

        return {
          id: pembayaran.id,
          jumlah: pembayaran.jumlah,
          metode_pembayaran: pembayaran.metode_pembayaran,
          status_pembayaran: pembayaran.status_pembayaran,
          catatan: pembayaran.catatan_verifikasi, // Map to frontend expected field
          bukti_transfer_url, // Generated signed URL
          tanggal_pembayaran: pembayaran.created_at, // Use created_at as tanggal_pembayaran
          created_at: pembayaran.created_at,
          updated_at: pembayaran.updated_at,
          pendaftar: pembayaran.pendaftar,
        };
      })
    );

    return NextResponse.json({ data: dataWithUrls });
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
    if (session.role !== "admin") {
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

    // First, get the pembayaran record to get pendaftar_id
    const { data: pembayaranData, error: fetchError } = await supabaseAdmin
      .from("pembayaran")
      .select("pendaftar_id")
      .eq("id", pembayaran_id)
      .single();

    if (fetchError || !pembayaranData) {
      console.error("Error fetching pembayaran:", fetchError);
      return NextResponse.json(
        { error: "Pembayaran not found" },
        { status: 404 }
      );
    }

    // Update pembayaran (use correct field name: catatan_verifikasi)
    const { data, error } = await supabaseAdmin
      .from("pembayaran")
      .update({
        status_pembayaran,
        catatan_verifikasi: catatan, // Map from frontend field to database field
        verified_by: session.id,
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

    // Also update the pendaftar status_pendaftaran based on verification result
    // Database constraint only allows: draft, payment_verification, scheduled, accepted, rejected, verified
    // Using "verified" for approved payments, "rejected" for rejected payments
    const newPendaftarStatus = status_pembayaran === "verified" ? "verified" : "rejected";

    const { error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .update({
        status_pendaftaran: newPendaftarStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pembayaranData.pendaftar_id);

    if (pendaftarError) {
      console.error("Error updating pendaftar status:", pendaftarError);
      // Don't fail the request, pembayaran was already updated
    }

    return NextResponse.json({ success: true, data, pendaftar_status: newPendaftarStatus });
  } catch (error) {
    console.error("Error in pembayaran verification update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
