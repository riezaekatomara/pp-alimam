// app/api/verifikasi/mark-sent/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

export async function POST(request: NextRequest) {
  try {
    const { otp_id, phone } = await request.json();

    if (!otp_id && !phone) {
      return NextResponse.json(
        { success: false, error: "OTP ID atau phone diperlukan" },
        { status: 400 },
      );
    }

    // Update OTP status ke 'sent'
    const { data, error } = await supabase
      .from("otp_verifications")
      .update({
        sent_at: new Date().toISOString(),
        status: "sent",
      })
      .eq(otp_id ? "id" : "phone", otp_id || phone)
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
      message: "OTP sudah ditandai sebagai terkirim",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
