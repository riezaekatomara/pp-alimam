import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// GET: Generate signed URL untuk preview dokumen
export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("auth_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan" },
        { status: 401 }
      );
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid" },
        { status: 401 }
      );
    }

    // 2. Ambil parameter
    const { searchParams } = new URL(request.url);
    const jenisDokumen = searchParams.get("jenis");

    if (!jenisDokumen) {
      return NextResponse.json(
        { success: false, error: "Jenis dokumen wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Cari dokumen di database
    const { data: dokumen, error: dokumenError } = await supabaseAdmin
      .from("dokumen")
      .select("file_path, file_type")
      .eq("pendaftar_id", session.pendaftar_id)
      .eq("jenis_dokumen", jenisDokumen)
      .single();

    if (dokumenError || !dokumen) {
      return NextResponse.json(
        { success: false, error: "Dokumen tidak ditemukan" },
        { status: 404 }
      );
    }

    // 4. Generate signed URL (berlaku 1 jam)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
      .storage
      .from("dokumen-pendaftaran")
      .createSignedUrl(dokumen.file_path, 3600); // 1 jam

    if (signedUrlError || !signedUrlData) {
      console.error("Signed URL error:", signedUrlError);
      return NextResponse.json(
        { success: false, error: "Gagal membuat link preview" },
        { status: 500 }
      );
    }

    // 5. Return URL
    return NextResponse.json({
      success: true,
      data: {
        url: signedUrlData.signedUrl,
        file_type: dokumen.file_type,
        expires_in: 3600, // detik
      },
    });
  } catch (error: any) {
    console.error("Preview error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
