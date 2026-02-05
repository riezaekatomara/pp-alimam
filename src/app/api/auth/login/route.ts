import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role client untuk query database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login_type } = body;

    console.log(`\n🔐 LOGIN ATTEMPT: ${login_type}`);

    // ═══════════════════════════════════════════
    // LOGIN PENDAFTAR (NIK + Nomor Pendaftaran)
    // ═══════════════════════════════════════════
    if (login_type === "pendaftar") {
      const { nik, nomor_pendaftaran } = body;

      // Validasi input
      if (!nik || !nomor_pendaftaran) {
        return NextResponse.json(
          { error: "NIK dan Nomor Pendaftaran wajib diisi" },
          { status: 400 },
        );
      }

      // Validasi format NIK
      if (!/^\d{16}$/.test(nik)) {
        return NextResponse.json(
          { error: "NIK harus 16 digit angka" },
          { status: 400 },
        );
      }

      console.log(`   NIK: ${nik}`);
      console.log(`   Nomor: ${nomor_pendaftaran}`);

      // Cari pendaftar di database
      const { data: pendaftar, error: pendaftarError } = await supabase
        .from("pendaftar")
        .select("*")
        .eq("nik", nik)
        .eq("nomor_pendaftaran", nomor_pendaftaran.toUpperCase())
        .single();

      if (pendaftarError || !pendaftar) {
        console.log(`   ❌ Not found`);
        return NextResponse.json(
          {
            error:
              "NIK atau Nomor Pendaftaran tidak ditemukan. Periksa kembali data Anda.",
          },
          { status: 404 },
        );
      }

      console.log(`   ✅ Found: ${pendaftar.nama_lengkap}`);
      console.log(`   Status: ${pendaftar.status_pendaftaran}`);

      // Success - create session & return
      const responseJson = NextResponse.json({
        success: true,
        message: "Login berhasil",
        role: "pendaftar",
        data: {
          id: pendaftar.id,
          nomor_pendaftaran: pendaftar.nomor_pendaftaran,
          nik: pendaftar.nik,
          nama_lengkap: pendaftar.nama_lengkap,
          jenis_kelamin: pendaftar.jenis_kelamin,
          jenjang: pendaftar.jenjang,
          status_pendaftaran: pendaftar.status_pendaftaran,
          tahun_ajaran_id: pendaftar.tahun_ajaran_id,
        },
      });

      // Set custom auth cookie
      responseJson.cookies.set(
        "app_session",
        JSON.stringify({
          role: "pendaftar",
          id: pendaftar.id,
          nik: pendaftar.nik,
          nomor_pendaftaran: pendaftar.nomor_pendaftaran,
          nama_lengkap: pendaftar.nama_lengkap,
        }),
        {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }
      );

      console.log(`   🍪 Session cookie set\n`);
      return responseJson;
    }

    // ═══════════════════════════════════════════
    // LOGIN ADMIN/PENGUJI (Email + Password)
    // ═══════════════════════════════════════════
    else if (login_type === "admin") {
      const { email, password } = body;

      // Validasi input
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email dan Password wajib diisi" },
          { status: 400 },
        );
      }

      console.log(`   Email: ${email}`);

      // Authenticate via Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authData.user) {
        console.log(`   ❌ Auth failed: ${authError?.message}`);
        return NextResponse.json(
          { error: "Email atau Password salah" },
          { status: 401 },
        );
      }

      console.log(`   ✅ Auth success: ${authData.user.id}`);

      // Get profile to check role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError || !profile) {
        console.log(`   ❌ Profile not found`);
        return NextResponse.json(
          { error: "Profil tidak ditemukan" },
          { status: 404 },
        );
      }

      // Check role - Allow all 5 roles + legacy admin
      const allowedRoles = ["admin", "penguji", "admin_super", "admin_berkas", "admin_keuangan"];
      if (!allowedRoles.includes(profile.role)) {
        console.log(`   ❌ Invalid role: ${profile.role}`);
        return NextResponse.json(
          { error: "Akun ini tidak memiliki akses admin/penguji" },
          { status: 403 },
        );
      }

      console.log(`   ✅ Role: ${profile.role}`);
      console.log(`   Name: ${profile.full_name}`);

      // Create session & return
      const responseJson = NextResponse.json({
        success: true,
        message: "Login berhasil",
        role: profile.role,
        data: {
          id: profile.id,
          full_name: profile.full_name,
          phone: profile.phone,
          role: profile.role,
        },
      });

      // Set custom auth cookie
      responseJson.cookies.set(
        "app_session",
        JSON.stringify({
          role: profile.role,
          id: profile.id,
          full_name: profile.full_name,
        }),
        {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }
      );

      console.log(`   🍪 Session cookie set\n`);
      return responseJson;
    }

    // Invalid login_type
    else {
      return NextResponse.json(
        { error: "Tipe login tidak valid" },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error("❌ Login Error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat login" },
      { status: 500 },
    );
  }
}
