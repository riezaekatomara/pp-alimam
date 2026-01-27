// lib/verification/whatsapp.ts
import { normalizePhone } from "./multi-channel";

export async function sendWhatsAppMessage(
  to: string,
  otp: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const phone = normalizePhone(to);

    // Jika menggunakan Twilio WhatsApp Sandbox
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      const message = await client.messages.create({
        body: `Kode verifikasi PPDB Ponpes Al-Imam Al-Islami: ${otp}`,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${phone}`,
      });

      return { success: true, messageId: message.sid };
    }

    // Jika menggunakan Wablas (nanti)
    if (process.env.WABLAS_API_KEY) {
      // Implementasi Wablas
      const response = await fetch("https://api.wablas.com/api/send-message", {
        method: "POST",
        headers: {
          Authorization: process.env.WABLAS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              phone: phone.replace("+", ""),
              message: `Kode verifikasi PPDB Ponpes Al-Imam Al-Islami: ${otp}`,
            },
          ],
        }),
      });

      const data = await response.json();
      return { success: data.status === "success", messageId: data.message_id };
    }

    // Fallback untuk development
    if (process.env.NODE_ENV === "development") {
      console.log(`📱 [DEV] WhatsApp OTP ${otp} untuk ${phone}`);
      return { success: true, messageId: "dev-" + Date.now() };
    }

    return { success: false, error: "WhatsApp service not configured" };
  } catch (error: any) {
    console.error("WhatsApp send error:", error);
    return { success: false, error: error.message };
  }
}
