import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Hash OTP for comparison
function hashOTP(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

// Normalize phone number
function normalizePhone(phone: string): string {
  let normalized = phone.replace(/[\s\-\(\)]/g, "");

  if (normalized.startsWith("08")) {
    normalized = "+62" + normalized.slice(1);
  } else if (normalized.startsWith("628")) {
    normalized = "+" + normalized;
  } else if (!normalized.startsWith("+62")) {
    normalized = "+62" + normalized;
  }

  return normalized;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { no_hp, otp_code } = body;

    // Validation
    if (!no_hp || !otp_code) {
      return NextResponse.json(
        { success: false, error: "Nomor HP dan kode OTP wajib diisi" },
        { status: 400 },
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp_code)) {
      return NextResponse.json(
        { success: false, error: "Kode OTP harus 6 digit angka" },
        { status: 400 },
      );
    }

    const normalizedPhone = normalizePhone(no_hp);
    const hashedOTP = hashOTP(otp_code);

    // Get OTP record from database
    const { data: otpRecord, error: fetchError } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("phone", normalizedPhone)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return NextResponse.json(
        {
          success: false,
          error: "Kode OTP tidak ditemukan. Silakan kirim ulang.",
        },
        { status: 404 },
      );
    }

    // Check if OTP is expired
    const now = new Date();
    const expiresAt = new Date(otpRecord.expires_at);
    if (now > expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: "Kode OTP sudah kadaluarsa. Silakan kirim ulang.",
        },
        { status: 410 },
      );
    }

    // Check attempts (max 3)
    if (otpRecord.attempts >= 3) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Terlalu banyak percobaan gagal. Silakan kirim ulang kode OTP.",
        },
        { status: 429 },
      );
    }

    // Verify OTP
    if (otpRecord.otp_hash !== hashedOTP) {
      // Increment attempts
      await supabase
        .from("otp_verifications")
        .update({ attempts: otpRecord.attempts + 1 })
        .eq("id", otpRecord.id);

      const remainingAttempts = 3 - (otpRecord.attempts + 1);
      return NextResponse.json(
        {
          success: false,
          error: `Kode OTP salah. Sisa percobaan: ${remainingAttempts}`,
        },
        { status: 400 },
      );
    }

    // OTP is valid! Parse registration data
    const registrationData = JSON.parse(otpRecord.registration_data);

    // Mark OTP as verified
    await supabase
      .from("otp_verifications")
      .update({ verified_at: new Date().toISOString() })
      .eq("id", otpRecord.id);

    // Return success with registration data
    return NextResponse.json({
      success: true,
      message: "Verifikasi berhasil",
      data: registrationData,
      otp_id: otpRecord.id, // For cleanup later
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
