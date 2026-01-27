// File: /src/lib/notifications/multi-channel.ts
// Multi-channel OTP delivery system

import { sendWhatsAppOTP } from "./whatsapp"; // Twilio WhatsApp
import { sendSMSOTP } from "./sms"; // Twilio SMS

// Type definitions
export type OTPChannel = "whatsapp" | "sms";

export interface SendOTPRequest {
  channel: OTPChannel;
  identifier: string;
  otp: string;
  nama: string;
  data?: {
    phone?: string;
    email?: string;
    telegram_username?: string;
  };
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  channel: OTPChannel;
  messageId?: string;
  retryChannels?: OTPChannel[];
}
// UPDATE: Change fallback order - WhatsApp first, then SMS
const fallbackOrder: OTPChannel[] = ["whatsapp", "sms"];

// UPDATE sendOTP function:
export async function sendOTP(
  request: SendOTPRequest,
): Promise<SendOTPResponse> {
  const { channel, identifier, otp, nama, data } = request;

  // WhatsApp: Hanya untuk SMS fallback saja dalam sistem ini
  // Karena WhatsApp manual via Admin menggunakan WhatsApp Business App
  if (channel === "whatsapp") {
    // Jangan kirim via Twilio, karena WhatsApp di mode manual
    return {
      success: true,
      message: `OTP siap untuk dikirim manual admin via WhatsApp Business`,
      channel: "whatsapp",
      messageId: `manual_${Date.now()}`,
    };
  }

  // Priority: SMS via Twilio Trial
  if (channel === "sms") {
    try {
      const result = await sendSMSOTP(identifier, otp, nama);

      if (result.success) {
        return {
          success: true,
          message: `OTP berhasil dikirim via SMS`,
          channel: "sms",
          messageId: result.messageId,
        };
      }
    } catch (error) {
      console.error("❌ SMS failed:", error);
    }

    return {
      success: false,
      message: "Gagal mengirim OTP via SMS",
      channel: "sms",
    };
  }

  return {
    success: false,
    message: `Channel ${channel} tidak didukung`,
    channel: channel as OTPChannel,
  };
}

// UPDATE: Remove telegram/email validation
export function validateIdentifier(
  channel: OTPChannel,
  identifier: string,
): boolean {
  switch (channel) {
    case "whatsapp":
    case "sms":
      // Indonesian phone number validation
      const phoneRegex = /^(08|628|\+628)\d{8,12}$/;
      return phoneRegex.test(identifier.replace(/[\s\-\(\)]/g, ""));
    default:
      return false;
  }
}
