// app/api/verifikasi/pending/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

export async function GET() {
  try {
    // Ambil OTP yang menunggu untuk dikirim (terutama WhatsApp manual)
    const { data: pendingOTP, error } = await supabase
      .from("otp_verifications")
      .select("*")
      .is("verified_at", null)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    // Filter untuk WhatsApp manual yang belum dikirim
    const whatsappPending = pendingOTP?.filter(
      (otp) => otp.otp_channel === "whatsapp" && !otp.sent_at,
    ) || [];

    return NextResponse.json({
      success: true,
      pending: whatsappPending,
      count: whatsappPending.length,
      message: `${whatsappPending.length} OTP menunggu untuk dikirim manual`,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
