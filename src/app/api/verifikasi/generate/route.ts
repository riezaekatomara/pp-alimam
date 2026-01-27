// app/api/verifikasi/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone, nama, channel = "whatsapp" } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone required" },
        { status: 400 },
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

    // Simpan ke database
    const { data, error } = await supabase
      .from("otp_verifications")
      .insert({
        phone,
        otp_hash: otp, // Dalam production, hash ini
        expires_at: expiresAt.toISOString(),
        otp_channel: channel,
        created_at: new Date().toISOString(),
        registration_data: JSON.stringify({ phone, nama }),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      otp,
      channel,
      phone,
      nama,
      expiresAt,
      message: "OTP generated and saved successfully",
      whatsappTemplate: `Assalamu'alaikum ${nama},

Kode verifikasi PPDB Ponpes Al-Imam Al-Islami Anda:

🔐 *${otp}*

⏰ Berlaku 5 menit

⚠️ PENTING:
• Jangan berikan kode ini kepada siapapun
• Gunakan kode ini untuk verifikasi di website

Wassalamu'alaikum wr wb`,
    });
  } catch (error: any) {
    console.error("Generate OTP error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
