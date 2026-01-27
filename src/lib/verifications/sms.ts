// lib/verification/sms.ts
import { normalizePhone } from "./multi-channel";

export async function sendSms(
  to: string,
  otp: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const phone = normalizePhone(to);

    // Gunakan Twilio SMS
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      const message = await client.messages.create({
        body: `Kode verifikasi PPDB Ponpes Al-Imam Al-Islami: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      return { success: true, messageId: message.sid };
    }

    // Gunakan NusaSMS (nanti)
    if (process.env.NUSASMS_API_KEY) {
      const response = await fetch("https://api.nusasms.com/api/v3/sms/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NUSASMS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phone.replace("+", ""),
          message: `Kode verifikasi PPDB Ponpes Al-Imam Al-Islami: ${otp}`,
          from: "PPDB-ALIMAM",
        }),
      });

      const data = await response.json();
      return { success: data.success, messageId: data.message_id };
    }

    // Fallback untuk development
    if (process.env.NODE_ENV === "development") {
      console.log(`📨 [DEV] SMS OTP ${otp} untuk ${phone}`);
      return { success: true, messageId: "dev-sms-" + Date.now() };
    }

    return { success: false, error: "SMS service not configured" };
  } catch (error: any) {
    console.error("SMS send error:", error);
    return { success: false, error: error.message };
  }
}
