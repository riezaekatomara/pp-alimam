// src/app/api/pendaftar/status/route.ts
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

    // Query database
    const { data, error } = await supabaseAdmin
      .from("pendaftar")
      .select("id, nomor_pendaftaran, status_proses")
      .eq("id", pendaftarId)
      .single();

    if (error) {
      console.error("Error fetching pendaftar status:", error);
      return NextResponse.json(
        { error: "Failed to fetch status" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      id: data.id,
      nomor_pendaftaran: data.nomor_pendaftaran,
      status_proses: data.status_proses || "draft",
    });
  } catch (error) {
    console.error("Error in status API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
