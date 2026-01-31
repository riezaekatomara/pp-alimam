import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch pendaftar with all related data
    const { data: pendaftar, error } = await supabase
      .from("pendaftar")
      .select(
        `
        *,
        tahun_ajaran:tahun_ajaran_id (
          id,
          nama,
          tahun_mulai,
          tahun_selesai,
          biaya_pendaftaran
        ),
        orang_tua:orang_tua (*),
        dokumen:dokumen (*),
        pembayaran:pembayaran (*),
        jadwal_ujian:jadwal_ujian (*),
        nilai_ujian:nilai_ujian (*),
        pengumuman:pengumuman (*),
        rapor:data_rapor (*),
        prestasi:data_prestasi (*),
        kesehatan:data_kesehatan (*),
        asrama:data_asrama (*)
      `
      )
      .eq("id", params.id)
      .single();

    if (error || !pendaftar) {
      console.error("Error fetching pendaftar:", error);
      return NextResponse.json(
        { error: "Pendaftar not found" },
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
  { params }: { params: { id: string } }
) {
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
    const { data, error } = await supabase
      .from("pendaftar")
      .update({
        status_proses,
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
