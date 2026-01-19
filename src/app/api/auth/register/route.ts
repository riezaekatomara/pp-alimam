import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/server";

interface FormData {
  nik: string;
  nama_lengkap: string;
  no_hp: string;
  jenis_kelamin: string;
  jenjang: string;
  password: string;
  password_confirm: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    // ============================================
    // 1️⃣ VALIDASI INPUT (sama seperti sebelumnya)
    // ============================================
    const errors: Record<string, string> = {};

    if (!body.nik) {
      errors.nik = "NIK wajib diisi";
    } else if (!/^\d{16}$/.test(body.nik)) {
      errors.nik = "NIK harus 16 digit angka";
    }

    if (!body.nama_lengkap) {
      errors.nama_lengkap = "Nama lengkap wajib diisi";
    } else if (body.nama_lengkap.length < 3) {
      errors.nama_lengkap = "Nama minimal 3 karakter";
    }

    if (!body.no_hp) {
      errors.no_hp = "Nomor HP wajib diisi";
    } else if (
      !/^(08|628|\+628)\d{8,12}$/.test(body.no_hp.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.no_hp = "Format nomor HP tidak valid (contoh: 081234567890)";
    }

    if (!body.jenis_kelamin || !["L", "P"].includes(body.jenis_kelamin)) {
      errors.jenis_kelamin = "Pilih jenis kelamin yang valid";
    }

    if (!body.jenjang || !["MTs", "IL", "MA"].includes(body.jenjang)) {
      errors.jenjang = "Pilih jenjang pendidikan yang valid";
    }

    if (!body.password) {
      errors.password = "Password wajib diisi";
    } else if (body.password.length < 8) {
      errors.password = "Password minimal 8 karakter";
    }

    if (!body.password_confirm) {
      errors.password_confirm = "Konfirmasi password wajib diisi";
    } else if (body.password !== body.password_confirm) {
      errors.password_confirm = "Password tidak cocok";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: errors, message: "Validasi gagal" },
        { status: 400 }
      );
    }

    // ============================================
    // 2️⃣ CEK DUPLIKAT NIK & NO HP
    // ============================================
    const { data: existingPendaftar, error: checkError } = await supabaseAdmin
      .from("pendaftar")
      .select("nik, no_hp")
      .or(`nik.eq.${body.nik},no_hp.eq.${body.no_hp}`)
      .limit(1)
      .single();

    if (existingPendaftar) {
      if (existingPendaftar.nik === body.nik) {
        return NextResponse.json(
          {
            error: { nik: "NIK sudah terdaftar" },
            message: "NIK sudah digunakan",
          },
          { status: 400 }
        );
      }
      if (existingPendaftar.no_hp === body.no_hp) {
        return NextResponse.json(
          {
            error: { no_hp: "Nomor HP sudah terdaftar" },
            message: "Nomor HP sudah digunakan",
          },
          { status: 400 }
        );
      }
    }

    // ============================================
    // 3️⃣ HASH PASSWORD
    // ============================================
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // ============================================
    // 4️⃣ DAFTAR KE SUPABASE AUTH
    // ============================================
    // Email dummy: [NIK]@pendaftar.local (karena kita pakai NIK sebagai username)
    const email = `${body.nik}@pendaftar.local`;

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: body.password,
        email_confirm: true, // Auto-confirm email (karena pakai dummy email)
        user_metadata: {
          nama_lengkap: body.nama_lengkap,
          no_hp: body.no_hp,
        },
      });

    if (authError || !authData.user) {
      console.error("Auth error:", authError);

      // Cek apakah email sudah terdaftar
      if (authError?.message?.includes("already registered")) {
        return NextResponse.json(
          {
            error: { nik: "NIK sudah terdaftar" },
            message: "Akun dengan NIK ini sudah ada",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          message: "Gagal membuat akun. Silakan coba lagi.",
          error: authError?.message,
        },
        { status: 500 }
      );
    }

    // ============================================
    // 5️⃣ GET TAHUN AJARAN AKTIF
    // ============================================
    const { data: tahunAjaran, error: tahunError } = await supabaseAdmin
      .from("tahun_ajaran")
      .select("id")
      .eq("is_active", true)
      .single();

    if (tahunError || !tahunAjaran) {
      console.error("Tahun ajaran error:", tahunError);

      // Rollback: hapus user yang baru dibuat
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        {
          message:
            "Tahun ajaran belum dibuka. Silakan hubungi admin pesantren.",
        },
        { status: 400 }
      );
    }

    // ============================================
    // 6️⃣ INSERT KE TABLE PENDAFTAR
    // ============================================
    const { data: pendaftarData, error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .insert({
        user_id: authData.user.id,
        tahun_ajaran_id: tahunAjaran.id,
        nik: body.nik,
        nama_lengkap: body.nama_lengkap,
        no_hp: body.no_hp,
        jenis_kelamin: body.jenis_kelamin,
        jenjang: body.jenjang,
        status_pendaftaran: "draft", // Status awal
        // nomor_pendaftaran akan di-generate otomatis oleh trigger
      })
      .select("nomor_pendaftaran, nik, nama_lengkap")
      .single();

    if (pendaftarError || !pendaftarData) {
      console.error("Pendaftar error:", pendaftarError);

      // Rollback: hapus user yang baru dibuat
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        {
          message: "Gagal menyimpan data pendaftaran. Silakan coba lagi.",
          error: pendaftarError?.message,
        },
        { status: 500 }
      );
    }

    // ============================================
    // 7️⃣ SUKSES! 🎉
    // ============================================
    return NextResponse.json(
      {
        message: "Pendaftaran berhasil!",
        data: {
          nomor_pendaftaran: pendaftarData.nomor_pendaftaran,
          nik: pendaftarData.nik,
          nama_lengkap: pendaftarData.nama_lengkap,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
