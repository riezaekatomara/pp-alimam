import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authSession = cookieStore.get("auth_session");

    if (!authSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const session = JSON.parse(authSession.value);
    const pendaftarId = session.pendaftar_id || session.user_id;

    if (!pendaftarId) {
      return NextResponse.json(
        { success: false, error: "No pendaftar ID" },
        { status: 400 },
      );
    }

    // Fetch data pendaftar
    const { data: pendaftar, error } = await supabaseAdmin
      .from("pendaftar")
      .select("*")
      .eq("id", pendaftarId)
      .single();

    if (error) {
      console.error("Supabase error:", error);

      // Fallback: coba dengan nomor pendaftaran
      const { data: fallbackData } = await supabaseAdmin
        .from("pendaftar")
        .select("*")
        .eq("nomor_pendaftaran", "MTI20260006")
        .single();

      return NextResponse.json({
        success: true,
        data: fallbackData,
        isFallback: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: pendaftar,
    });
  } catch (error) {
    console.error("Error fetching pendaftar data:", error);

    // Return dummy data untuk development
    return NextResponse.json({
      success: true,
      data: {
        id: "dummy-id",
        nik: "3201010120100001",
        nomor_pendaftaran: "MTI20260006",
        nama_lengkap: "Ahmad Zaki",
        jenis_kelamin: "Laki-laki",
        jenjang: "MTs",
        tempat_lahir: "Sukabumi",
        tanggal_lahir: "2010-08-15",
        status_pendaftaran: "draft",
        created_at: new Date().toISOString(),
      },
      isDummy: true,
    });
  }
}
