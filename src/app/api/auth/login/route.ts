import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface LoginRequest {
  nik: string;
  password: string;
}

interface LoginResponse {
  user_id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  role: string;
  jenjang: string;
  status_pendaftaran: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();

    // ============================================
    // 1️⃣ VALIDATE INPUT
    // ============================================
    if (!body.nik || !body.password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Data tidak lengkap",
          error: "NIK dan password wajib diisi",
        },
        { status: 400 }
      );
    }

    if (!/^\d{16}$/.test(body.nik)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "NIK tidak valid",
          error: "NIK harus 16 digit angka",
        },
        { status: 400 }
      );
    }

    // ============================================
    // 2️⃣ INITIALIZE SUPABASE CLIENT
    // ============================================
    const supabase = await createServerSupabaseClient();

    // ============================================
    // 3️⃣ FORMAT EMAIL (MUST MATCH REGISTER!)
    // ============================================
    const email = `${body.nik}@pendaftar.local`;

    // ============================================
    // 4️⃣ ATTEMPT LOGIN
    // ============================================
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password: body.password,
      });

    if (authError || !authData.user) {
      console.error("Login error:", authError);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Login gagal",
          error:
            "NIK atau password salah. Pastikan NIK dan password Anda benar.",
        },
        { status: 401 }
      );
    }

    const userId = authData.user.id;

    // ============================================
    // 5️⃣ GET USER PROFILE (QUERY 1 - SEPARATE!)
    // ============================================
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, full_name, phone")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Profile error:", profileError);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Data pengguna tidak ditemukan",
          error: "Terjadi kesalahan saat mengambil data profil.",
        },
        { status: 500 }
      );
    }

    // ============================================
    // 6️⃣ GET PENDAFTAR DATA (QUERY 2 - SEPARATE!)
    // ============================================
    const { data: pendaftar, error: pendaftarError } = await supabase
      .from("pendaftar")
      .select(
        "id, nomor_pendaftaran, nama_lengkap, jenis_kelamin, jenjang, status_pendaftaran"
      )
      .eq("user_id", userId)
      .single();

    if (pendaftarError || !pendaftar) {
      console.error("Pendaftar error:", pendaftarError);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Data pendaftar tidak ditemukan",
          error: "Akun Anda belum memiliki data pendaftaran. Hubungi admin.",
        },
        { status: 404 }
      );
    }

    // ============================================
    // 7️⃣ SUCCESS RESPONSE
    // ============================================
    return NextResponse.json<ApiResponse<LoginResponse>>(
      {
        success: true,
        message: "Login berhasil!",
        data: {
          user_id: userId,
          nomor_pendaftaran: pendaftar.nomor_pendaftaran,
          nama_lengkap: pendaftar.nama_lengkap,
          role: profile.role,
          jenjang: pendaftar.jenjang,
          status_pendaftaran: pendaftar.status_pendaftaran,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Terjadi kesalahan",
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
