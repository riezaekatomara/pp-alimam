import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export async function POST() {
  try {
    const supabase = await createClient();

    // Check admin authorization
    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if 2026/2027 already exists
    const { data: existing } = await supabase
      .from("tahun_ajaran")
      .select("id, nama, is_active")
      .eq("tahun_mulai", 2026)
      .eq("tahun_selesai", 2027)
      .single();

    if (existing) {
      // Force update price to 200000
      await supabase
        .from("tahun_ajaran")
        .update({ biaya_pendaftaran: 200000 })
        .eq("id", existing.id);

      // If exists but not active, activate it
      if (!existing.is_active) {
        // Deactivate all others first
        await supabase
          .from("tahun_ajaran")
          .update({ is_active: false })
          .eq("is_active", true);

        // Activate 2026/2027
        const { error: updateError } = await supabase
          .from("tahun_ajaran")
          .update({ is_active: true })
          .eq("id", existing.id);

        if (updateError) {
          throw updateError;
        }

        return NextResponse.json({
          success: true,
          message: "Tahun Ajaran 2026/2027 diaktifkan & harga diupdate ke 200.000",
          data: { ...existing, is_active: true, biaya_pendaftaran: 200000 },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Tahun Ajaran 2026/2027 harga diupdate ke 200.000",
        data: { ...existing, biaya_pendaftaran: 200000 },
      });
    }

    // Deactivate all existing tahun ajaran
    await supabase
      .from("tahun_ajaran")
      .update({ is_active: false })
      .eq("is_active", true);

    // Create 2026/2027 tahun ajaran
    const { data, error } = await supabase
      .from("tahun_ajaran")
      .insert({
        tahun_mulai: 2026,
        tahun_selesai: 2027,
        nama: "2026/2027",
        is_active: true,
        tanggal_buka_pendaftaran: "2026-01-01",
        tanggal_tutup_pendaftaran: "2026-07-31",
        biaya_pendaftaran: 200000,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating tahun ajaran:", error);
      return NextResponse.json(
        { error: "Failed to create tahun ajaran: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tahun Ajaran 2026/2027 berhasil dibuat dan diaktifkan",
      data,
    });
  } catch (error) {
    console.error("Seed tahun ajaran error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET method to check current status
export async function GET() {
  try {
    const supabase = await createClient();

    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("tahun_ajaran")
      .select("*")
      .order("tahun_mulai", { ascending: false });

    if (error) {
      throw error;
    }

    const active = data?.find((ta) => ta.is_active);
    const has2026 = data?.find((ta) => ta.tahun_mulai === 2026 && ta.tahun_selesai === 2027);

    return NextResponse.json({
      all: data,
      active,
      has2026_2027: !!has2026,
    });
  } catch (error) {
    console.error("Get tahun ajaran error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
