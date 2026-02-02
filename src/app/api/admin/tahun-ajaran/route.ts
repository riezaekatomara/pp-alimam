import { NextRequest, NextResponse } from "next/server";
import { createClient, supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export async function GET() {
  try {
    // Use supabaseAdmin for reading tahun ajaran list (non-sensitive data)
    const { data, error } = await supabaseAdmin
      .from("tahun_ajaran")
      .select("id, nama, tahun_mulai, tahun_selesai, is_active")
      .order("tahun_mulai", { ascending: false });

    if (error) {
      console.error("Error fetching tahun ajaran:", error);
      return NextResponse.json(
        { error: "Failed to fetch tahun ajaran" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Tahun ajaran API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check admin authorization
    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      tahun_mulai,
      tahun_selesai,
      nama,
      is_active = false,
      tanggal_buka_pendaftaran,
      tanggal_tutup_pendaftaran,
      biaya_pendaftaran = 250000,
    } = body;

    // Validate required fields
    if (!tahun_mulai || !tahun_selesai || !nama || !tanggal_buka_pendaftaran || !tanggal_tutup_pendaftaran) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if tahun ajaran already exists
    const { data: existing } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("tahun_mulai", tahun_mulai)
      .eq("tahun_selesai", tahun_selesai)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Tahun ajaran already exists", data: existing },
        { status: 409 }
      );
    }

    // If setting as active, deactivate others first
    if (is_active) {
      await supabase
        .from("tahun_ajaran")
        .update({ is_active: false })
        .eq("is_active", true);
    }

    // Create new tahun ajaran
    const { data, error } = await supabase
      .from("tahun_ajaran")
      .insert({
        tahun_mulai,
        tahun_selesai,
        nama,
        is_active,
        tanggal_buka_pendaftaran,
        tanggal_tutup_pendaftaran,
        biaya_pendaftaran,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating tahun ajaran:", error);
      return NextResponse.json(
        { error: "Failed to create tahun ajaran" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Tahun ajaran POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
