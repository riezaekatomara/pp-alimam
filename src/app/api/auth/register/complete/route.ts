import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateNomorPendaftaran } from "@/lib/utils/nomor-pendaftaran";
import { sendRegistrationSuccess } from "@/lib/whatsapp/twilio";

// Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp_id } = body;

    if (!otp_id) {
      return NextResponse.json(
        { success: false, error: "OTP ID tidak valid" },
        { status: 400 },
      );
    }

    // Get verified OTP record
    const { data: otpRecord, error: otpError } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("id", otp_id)
      .single();

    if (otpError || !otpRecord || !otpRecord.verified_at) {
      return NextResponse.json(
        { success: false, error: "OTP belum diverifikasi" },
        { status: 400 },
      );
    }

    // Parse registration data
    const registrationData = JSON.parse(otpRecord.registration_data);
    const {
      nik,
      nama_lengkap,
      tanggal_lahir,
      no_hp,
      jenis_kelamin,
      jenjang,
      email,
      telegram_username,
    } = registrationData;

    // Check if NIK already registered
    const { data: existing } = await supabase
      .from("pendaftar")
      .select("nomor_pendaftaran")
      .eq("nik", nik)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `NIK sudah terdaftar dengan nomor ${existing.nomor_pendaftaran}`,
        },
        { status: 409 },
      );
    }

    // Get active tahun ajaran
    const { data: tahunAjaran } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("is_active", true)
      .single();

    if (!tahunAjaran) {
      return NextResponse.json(
        { success: false, error: "Tahun ajaran aktif tidak ditemukan" },
        { status: 500 },
      );
    }

    // Generate nomor pendaftaran (gender-based prefix)
    const nomorPendaftaran = await generateNomorPendaftaran(
      jenjang,
      jenis_kelamin,
    );

    // Insert to database (NO PASSWORD!)
    const { data: newPendaftar, error: insertError } = await supabase
      .from("pendaftar")
      .insert({
        nomor_pendaftaran: nomorPendaftaran,
        tahun_ajaran_id: tahunAjaran.id,
        nik: nik,
        nama_lengkap: nama_lengkap,
        tanggal_lahir: tanggal_lahir,
        jenis_kelamin: jenis_kelamin,
        jenjang: jenjang,
        no_hp: no_hp,
        email: email || null,
        telegram_username: telegram_username || null,
        is_verified_otp: true, // GANTI: dari is_verified_whatsapp
        verification_channel: otpRecord.otp_channel || "sms", // Tambah kolom ini
        status_pendaftaran: "registered",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Gagal menyimpan data pendaftaran" },
        { status: 500 },
      );
    }

    // Send registration success notification via selected channel
    try {
      const channel = otpRecord.otp_channel || "sms";
      const identifier = no_hp; // Fokus ke no_hp untuk semua channel (WhatsApp & SMS)

      if (identifier) {
        const result = await sendRegistrationSuccess(
          identifier,
          nama_lengkap,
          nomorPendaftaran,
          nik,
        );

        if (!result.success) {
          // Log error but don't fail registration
          console.error(`${channel} notification failed:`, result.error);

          // Try fallback to SMS if primary channel fails
          if (channel !== "sms") {
            const smsResult = await sendRegistrationSuccess(
              no_hp,
              nama_lengkap,
              nomorPendaftaran,
              nik,
            );
            if (!smsResult.success) {
              console.error("Fallback SMS also failed:", smsResult.error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Registration notification error:", error);
      // Continue anyway - registration successful
    }

    // Delete OTP record (cleanup)
    await supabase.from("otp_verifications").delete().eq("id", otp_id);

    // Return success with credentials (NO PASSWORD!)
    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil",
      data: {
        nomor_pendaftaran: nomorPendaftaran,
        nik: nik, // Include NIK in response
        nama_lengkap: nama_lengkap,
        jenjang: jenjang,
        jenis_kelamin: jenis_kelamin,
      },
    });
  } catch (error) {
    console.error("Complete registration error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
