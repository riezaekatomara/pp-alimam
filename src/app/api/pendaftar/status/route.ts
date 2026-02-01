/**
 * GET /api/pendaftar/status
 * Mengambil status pendaftaran untuk layout dashboard
 * Query: pendaftar_id (dari session)
 */
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pendaftarId = searchParams.get("pendaftar_id");

    if (!pendaftarId) {
      return NextResponse.json(
        { error: "pendaftar_id is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("pendaftar")
      .select("id, nomor_pendaftaran, status_pendaftaran")
      .eq("id", pendaftarId)
      .single();

    if (error) {
      console.error("Error fetching pendaftar status:", error);
      return NextResponse.json(
        { error: "Failed to fetch status" },
        { status: 500 },
      );
    }

    // status_proses = status_pendaftaran (kompatibel dengan access-control)
    return NextResponse.json({
      id: data.id,
      nomor_pendaftaran: data.nomor_pendaftaran,
      status_proses: data.status_pendaftaran || "draft",
    });
  } catch (error) {
    console.error("Error in status API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
