// app/api/register/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "@/lib/notifications/multi-channel";
import type { OTPChannel } from "@/lib/notifications/multi-channel";
import { normalizePhoneNumber } from "@/lib/validations/registration";
import { createClient } from "@supabase/supabase-js";

// Helper functions
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOTP(otp: string): string {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(otp).digest("hex");
}

const normalizePhone = normalizePhoneNumber;

// Rate limiter store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function updateRateLimit(phone: string): void {
  const now = Date.now();
  const limit = rateLimitStore.get(phone);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(phone, { count: 1, resetTime: now + 60 * 60 * 1000 });
  } else {
    limit.count++;
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      telegram_username,
      no_hp,
      otp_channel = "whatsapp",
      nik,
      nama_lengkap,
      jenis_kelamin,
      jenjang,
      tanggal_lahir,
    } = await request.json();

    // ============================================
    // VALIDASI INPUT
    // ============================================
    const validChannels: OTPChannel[] = ["whatsapp", "sms"];
    if (!otp_channel || !validChannels.includes(otp_channel as OTPChannel)) {
      return NextResponse.json(
        {
          success: false,
          error: "Channel tidak valid. Pilih: whatsapp atau sms",
        },
        { status: 400 },
      );
    }

    // Validasi nomor HP untuk WhatsApp/SMS
    if (!no_hp) {
      return NextResponse.json(
        { success: false, error: "Nomor HP diperlukan" },
        { status: 400 },
      );
    }

    // ============================================
    // GENERATE OTP
    // ============================================
    const otp = generateOTP();
    const hashedOTP = hashOTP(otp);
    const normalizedPhone = normalizePhone(no_hp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

    // ============================================
    // HANDLE BY CHANNEL
    // ============================================
    let otpResult: any;

    if (otp_channel === "whatsapp") {
      // WhatsApp: MANUAL - Simpan di database untuk admin kirim
      console.log(`📱 [MANUAL WA] OTP disimpan untuk admin kirim ke ${normalizedPhone}`);
      otpResult = {
        success: true,
        message: "OTP siap untuk dikirim admin via WhatsApp Business",
        channel: "whatsapp",
        messageId: `manual_${Date.now()}`,
      };
    } else if (otp_channel === "sms") {
      // SMS: OTOMATIS via Twilio Trial
      console.log(`📧 [SMS TWILIO] Mengirim OTP ke ${normalizedPhone}`);
      otpResult = await sendOTP({
        channel: "sms",
        identifier: normalizedPhone,
        otp,
        nama: nama_lengkap,
      });
    } else {
      // Fallback jika channel tidak cocok
      otpResult = {
        success: false,
        message: `Channel ${otp_channel} tidak didukung`,
        channel: otp_channel,
      };
    }

    if (!otpResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: otpResult.message || "Gagal memproses OTP",
        },
        { status: 500 },
      );
    }

    // ============================================
    // SIMPAN OTP KE SUPABASE
    // ============================================
    const { data: otpRecord, error: otpError } = await supabase
      .from("otp_verifications")
      .insert({
        phone: normalizedPhone,
        otp_hash: hashedOTP,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
        otp_channel: otp_channel,
        created_at: new Date().toISOString(),
        registration_data: JSON.stringify({
          nik,
          nama_lengkap,
          tanggal_lahir,
          no_hp: normalizedPhone,
          jenis_kelamin,
          jenjang,
          email,
        }),
      })
      .select()
      .single();

    if (otpError) {
      console.error("Error storing OTP:", otpError);
      return NextResponse.json(
        { success: false, error: "Gagal menyimpan OTP" },
        { status: 500 },
      );
    }

    // Update rate limit
    updateRateLimit(normalizedPhone);

    // ============================================
    // RESPONSE SUCCESS
    // ============================================
    const response: any = {
      success: true,
      message: otpResult.message,
      channel: otp_channel,
      identifier: normalizedPhone,
      expires_in: 300, // 5 menit dalam detik
    };

    // Jika WhatsApp manual, berikan template untuk admin
    if (otp_channel === "whatsapp") {
      response.mode = "manual";
      response.adminNote = "Admin perlu kirim OTP ini via WhatsApp Business App";
      response.otpForAdmin = otp; // Hanya untuk admin/development
      response.whatsappTemplate = `Assalamu'alaikum ${nama_lengkap},

Kode verifikasi PPDB Ponpes Al-Imam Al-Islami Anda:

🔐 *${otp}*

⏰ Berlaku 5 menit
👤 Nama: ${nama_lengkap}
📋 Jenjang: ${jenjang}

⚠️ PENTING:
• Jangan berikan kode ini kepada siapapun
• Gunakan kode ini untuk verifikasi di website PPDB

Wassalamu'alaikum wr wb`;
    }

    // Debug info hanya di development
    if (process.env.NODE_ENV === "development") {
      response.debugOtp = otp;
      response.phone = normalizedPhone;
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("❌ Error in send-otp API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal server",
      },
      { status: 500 },
    );
  }
}
