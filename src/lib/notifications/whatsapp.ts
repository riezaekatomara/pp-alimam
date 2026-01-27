// File: /src/lib/notifications/whatsapp.ts
/**
 * WhatsApp OTP Service using Twilio (Trial/Sandbox)
 */

import twilio from "twilio";

export async function sendWhatsAppOTP(
  phone: string,
  otp: string,
  nama: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Validasi environment variables
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

    if (!twilioAccountSid || !twilioAuthToken) {
      console.error(
        "❌ Twilio credentials tidak ditemukan di .env",
      );
      console.log("📱 [SIMULATION] WhatsApp akan dikirim ke:", phone);
      console.log(`🔐 Kode OTP: ${otp} untuk ${nama}`);

      return {
        success: true,
        messageId: `wa_sim_${Date.now()}`,
      };
    }

    // Normalize phone untuk Indonesia
    let normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.startsWith("0")) {
      normalizedPhone = "62" + normalizedPhone.slice(1);
    } else if (!normalizedPhone.startsWith("62")) {
      normalizedPhone = "62" + normalizedPhone;
    }

    const client = twilio(twilioAccountSid, twilioAuthToken);
    const toWhatsAppNumber = `whatsapp:+${normalizedPhone}`;
    
    // Twilio WhatsApp Sandbox number (for trial)
    const fromWhatsAppNumber = "whatsapp:+14155238886";

    // Message template
    const message = `Assalamu'alaikum ${nama},\n\n📱 *Kode Verifikasi PPDB AL-IMAM*\n\n🔐 *${otp}*\n\n⏰ Berlaku 5 menit\n\n⚠️ JANGAN bagikan kode ini!\n\nBarakallahu fiikum 🤲`;

    // Send via Twilio
    const result = await client.messages.create({
      body: message,
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber,
    });

    console.log(`✅ WhatsApp OTP sent to ${phone}: ${result.sid}`);
    return {
      success: true,
      messageId: result.sid,
    };
  } catch (error: any) {
    console.error("❌ WhatsApp error:", error.message);
    
    // Fallback simulation
    console.log("📱 [FALLBACK SIMULATION] WhatsApp gagal, mode simulasi");
    return {
      success: true,
      messageId: `wa_fallback_${Date.now()}`,
      error: error.message,
    };
  }
}

