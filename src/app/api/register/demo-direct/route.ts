import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nik,
      nama_lengkap,
      tanggal_lahir,
      no_hp,
      jenis_kelamin,
      jenjang,
      nomor_pendaftaran,
    } = body;

    // Validasi input
    if (
      !nik ||
      !nama_lengkap ||
      !tanggal_lahir ||
      !no_hp ||
      !jenis_kelamin ||
      !jenjang ||
      !nomor_pendaftaran
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    console.log(`\n🎭 MODE DEMO - Direct Registration (Bypass OTP)`);
    console.log(`════════════════════════════════════════════════`);
    console.log(`Nama: ${nama_lengkap}`);
    console.log(`NIK: ${nik}`);
    console.log(`Nomor: ${nomor_pendaftaran}`);
    console.log(`════════════════════════════════════════════════\n`);

    // 1. Get tahun ajaran aktif
    const { data: tahunAjaranData, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("is_active", true)
      .single();

    if (tahunAjaranError || !tahunAjaranData) {
      return NextResponse.json(
        { error: "Tahun ajaran aktif tidak ditemukan. Hubungi admin." },
        { status: 404 },
      );
    }

    const tahun_ajaran_id = tahunAjaranData.id;

    // 2. Cek apakah NIK sudah terdaftar di tahun ajaran ini
    const { data: existingPendaftar } = await supabase
      .from("pendaftar")
      .select("nomor_pendaftaran")
      .eq("nik", nik)
      .eq("tahun_ajaran_id", tahun_ajaran_id)
      .single();

    if (existingPendaftar) {
      return NextResponse.json(
        {
          error: "NIK sudah terdaftar di tahun ajaran ini",
          nomor_pendaftaran: existingPendaftar.nomor_pendaftaran,
        },
        { status: 409 },
      );
    }

    // 3. Insert pendaftar langsung (user_id NULL untuk demo)
    const { data: pendaftarData, error: pendaftarError } = await supabase
      .from("pendaftar")
      .insert({
        user_id: null, // NULL untuk mode demo
        tahun_ajaran_id,
        nomor_pendaftaran,
        nik,
        nama_lengkap,
        tanggal_lahir,
        no_hp,
        jenis_kelamin,
        jenjang,
        status_pendaftaran: "draft", // Status draft untuk mode demo
      })
      .select()
      .single();

    if (pendaftarError) {
      console.error("❌ Error creating pendaftar:", pendaftarError);

      return NextResponse.json(
        { error: "Gagal menyimpan data pendaftar: " + pendaftarError.message },
        { status: 500 },
      );
    }

    console.log(`✅ Pendaftaran sukses!`);
    console.log(`   ID: ${pendaftarData.id}`);
    console.log(`   Nomor: ${nomor_pendaftaran}`);
    console.log(`   Status: ${pendaftarData.status_pendaftaran}`);
    console.log(`   user_id: NULL (demo mode)\n`);

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil (Mode Demo)",
      data: {
        id: pendaftarData.id,
        nomor_pendaftaran,
        nama_lengkap,
        nik,
        jenjang,
        jenis_kelamin,
        status_pendaftaran: pendaftarData.status_pendaftaran,
      },
    });
  } catch (error: any) {
    console.error("❌ Demo Registration Error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat mendaftar" },
      { status: 500 },
    );
  }
}
