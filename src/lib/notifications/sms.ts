// File: /src/lib/notifications/sms.ts
// SMS OTP delivery via Twilio (Trial) or Nusasms

import twilio from "twilio";

export async function sendSMSOTP(
  phone: string,
  otp: string,
  nama: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Priority 1: Try Twilio (sudah ada trial account)
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      try {
        const client = twilio(twilioAccountSid, twilioAuthToken);

        // Normalize phone untuk Indonesia
        let normalizedPhone = phone.replace(/\D/g, "");
        if (normalizedPhone.startsWith("0")) {
          normalizedPhone = "62" + normalizedPhone.slice(1);
        } else if (!normalizedPhone.startsWith("62")) {
          normalizedPhone = "62" + normalizedPhone;
        }

        const message = `Kode OTP PPDB AL-IMAM: ${otp}\nUntuk: ${nama}\nBerlaku 5 menit. JANGAN bagikan!`;

        const result = await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: `+${normalizedPhone}`,
        });

        console.log(`✅ SMS OTP sent via Twilio to ${phone}: ${result.sid}`);
        return {
          success: true,
          messageId: result.sid,
        };
      } catch (twilioError: any) {
        console.error("❌ Twilio SMS error:", twilioError.message);
        // Continue to fallback mode
      }
    }

    // Fallback: Simulation mode (simpan ke database untuk admin)
    console.log("📱 [SIMULATION] SMS akan dikirim ke:", phone);
    console.log(`🔐 Kode OTP: ${otp} untuk ${nama}`);

    // Simpan ke database untuk admin
    try {
      await fetch("/api/admin/pending-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          otp,
          nama,
          error: "SMS service not fully configured",
          mode: "simulation",
          timestamp: new Date().toISOString(),
        }),
      });
      console.log("⚠️ SMS dalam mode simulasi, data disimpan untuk admin");
    } catch (dbError) {
      console.error("Gagal simpan ke database:", dbError);
    }

    return {
      success: true,
      messageId: `sim_${Date.now()}`,
    };
  } catch (error: any) {
    console.error("❌ SMS OTP error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim SMS OTP",
    };
  }
}
