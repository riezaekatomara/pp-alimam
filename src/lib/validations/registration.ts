import { z } from "zod";

// ===================================
// REGISTRATION FORM VALIDATION
// ===================================

export const registrationSchema = z.object({
  nik: z
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK harus 16 digit")
    .regex(/^\d{16}$/, "NIK harus berupa 16 digit angka"),

  nama_lengkap: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .regex(/^[a-zA-Z\s'.,-]+$/, "Nama hanya boleh huruf dan karakter khusus"),

  tanggal_lahir: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid (YYYY-MM-DD)")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 10 && age <= 20;
    }, "Usia harus antara 10-20 tahun"),

  no_hp: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit")
    .max(15, "Nomor WhatsApp maksimal 15 digit")
    .regex(
      /^(08|628|\+628)\d{8,12}$/,
      "Format nomor WhatsApp tidak valid (contoh: 081234567890)",
    ),

  jenis_kelamin: z
    .enum(["L", "P"])
    .refine((val) => val !== undefined, "Pilih jenis kelamin (L/P)"),

  jenjang: z
    .enum(["MTs", "IL", "MA"])
    .refine((val) => val !== undefined, "Pilih jenjang pendidikan"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// ===================================
// OTP VERIFICATION VALIDATION
// ===================================

export const otpVerificationSchema = z.object({
  no_hp: z.string().min(1, "Nomor HP wajib diisi"),
  otp_code: z
    .string()
    .length(6, "Kode OTP harus 6 digit")
    .regex(/^\d{6}$/, "Kode OTP harus berupa 6 digit angka"),
});

export type OTPVerificationData = z.infer<typeof otpVerificationSchema>;

// ===================================
// HELPER: Validate NIK with Luhn Algorithm (Optional)
// ===================================

export function validateNIKChecksum(nik: string): boolean {
  // Basic validation: 16 digits
  if (!/^\d{16}$/.test(nik)) return false;

  // Advanced: You can implement Luhn algorithm or other NIK validation
  // For now, just check format
  return true;
}

// ===================================
// HELPER: Normalize Phone Number
// ===================================

export function normalizePhoneNumber(phone: string): string {
  // Remove spaces, dashes, parentheses
  let normalized = phone.replace(/[\s\-\(\)]/g, "");

  // Convert to +62 format
  if (normalized.startsWith("08")) {
    normalized = "+62" + normalized.slice(1);
  } else if (normalized.startsWith("628")) {
    normalized = "+" + normalized;
  } else if (!normalized.startsWith("+62")) {
    normalized = "+62" + normalized;
  }

  return normalized;
}

// ===================================
// HELPER: Validate Age Range
// ===================================

export function validateAge(
  birthDate: string,
  minAge: number,
  maxAge: number,
): boolean {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Adjust age if birthday hasn't occurred this year
  const adjustedAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())
      ? age - 1
      : age;

  return adjustedAge >= minAge && adjustedAge <= maxAge;
}
