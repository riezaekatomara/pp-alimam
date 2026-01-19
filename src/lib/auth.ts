// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUTH HELPER - UPDATED V3.0 (Simple & Aman) 🛡️
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Path: src/lib/auth.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { createBrowserClient } from "@supabase/ssr";

// ===================================
// 🔌 SUPABASE CLIENT
// ===================================
export const getSupabaseClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// ===================================
// 📧 EMAIL HELPER (STANDARDIZED)
// ===================================
export const generateAuthEmail = (nik: string): string => {
  return `${nik}@pendaftar.local`;
};

// ===================================
// ✅ VALIDATION HELPERS
// ===================================

export const validateNIK = (
  nik: string
): { valid: boolean; message: string } => {
  const cleanNIK = nik.replace(/\s/g, "");

  if (cleanNIK.length === 0) {
    return { valid: false, message: "NIK tidak boleh kosong" };
  }

  if (cleanNIK.length !== 16) {
    return { valid: false, message: "NIK harus 16 digit" };
  }

  if (!/^\d+$/.test(cleanNIK)) {
    return { valid: false, message: "NIK hanya boleh angka" };
  }

  return { valid: true, message: "" };
};

export const validateNoHP = (
  no_hp: string
): { valid: boolean; message: string } => {
  const cleanHP = no_hp.replace(/[\s\-\(\)]/g, "");

  if (cleanHP.length === 0) {
    return { valid: false, message: "Nomor HP tidak boleh kosong" };
  }

  if (!/^(08|628|\+628)/.test(cleanHP)) {
    return {
      valid: false,
      message: "Nomor HP harus diawali 08, 628, atau +628",
    };
  }

  const digitOnly = cleanHP.replace(/\+/g, "");
  if (digitOnly.length < 10 || digitOnly.length > 15) {
    return { valid: false, message: "Nomor HP harus 10-15 digit" };
  }

  return { valid: true, message: "" };
};

export const normalizeNoHP = (no_hp: string): string => {
  const cleanHP = no_hp.replace(/[\s\-\(\)]/g, "");

  if (cleanHP.startsWith("08")) {
    return "6" + cleanHP;
  }

  if (cleanHP.startsWith("+628")) {
    return cleanHP.substring(1);
  }

  return cleanHP;
};

export const validatePassword = (
  password: string
): { valid: boolean; message: string } => {
  if (password.length === 0) {
    return { valid: false, message: "Password tidak boleh kosong" };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password minimal 8 karakter" };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password harus mengandung minimal 1 angka",
    };
  }

  return { valid: true, message: "" };
};

export const validateNama = (
  nama: string
): { valid: boolean; message: string } => {
  if (nama.trim().length === 0) {
    return { valid: false, message: "Nama tidak boleh kosong" };
  }

  if (nama.trim().length < 3) {
    return { valid: false, message: "Nama minimal 3 karakter" };
  }

  if (/\d/.test(nama)) {
    return { valid: false, message: "Nama tidak boleh mengandung angka" };
  }

  return { valid: true, message: "" };
};

// ===================================
// 👤 SESSION HELPERS
// ===================================

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  try {
    const supabase = getSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};

/**
 * Get current session
 */
export const getCurrentSession = async () => {
  try {
    const supabase = getSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
};

/**
 * Get current user profile with pendaftar data
 */
export const getCurrentProfile = async () => {
  try {
    const supabase = getSupabaseClient();
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        pendaftar:pendaftar(*)
      `
      )
      .eq("id", user.id)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Terjadi kesalahan" };
  }
};

// ===================================
// 🆕 NEW: SESSION INFO HELPERS
// ===================================

/**
 * Get session remaining time in seconds
 */
export const getSessionRemainingTime = async (): Promise<number> => {
  try {
    const session = await getCurrentSession();

    if (!session || !session.expires_at) {
      return 0;
    }

    const expiresAt = new Date(session.expires_at).getTime();
    const now = Date.now();
    const remainingMs = expiresAt - now;

    return Math.max(0, Math.floor(remainingMs / 1000)); // Convert ke detik
  } catch (error) {
    return 0;
  }
};

/**
 * Get session remaining time in days
 */
export const getSessionRemainingDays = async (): Promise<number> => {
  try {
    const remainingSeconds = await getSessionRemainingTime();
    const remainingDays = Math.floor(remainingSeconds / (24 * 60 * 60));
    return Math.max(0, remainingDays);
  } catch (error) {
    return 0;
  }
};

/**
 * Check if session will expire soon (< 1 day)
 */
export const isSessionExpiringSoon = async (): Promise<boolean> => {
  try {
    const remainingDays = await getSessionRemainingDays();
    return remainingDays < 1;
  } catch (error) {
    return false;
  }
};

/**
 * Format session expiry time
 * Returns: "Sisa 5 hari" atau "Sisa 2 jam" atau "Sisa 30 menit"
 */
export const formatSessionExpiry = async (): Promise<string> => {
  try {
    const remainingSeconds = await getSessionRemainingTime();

    if (remainingSeconds <= 0) {
      return "Session expired";
    }

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);

    if (days > 0) {
      return `Sisa ${days} hari`;
    } else if (hours > 0) {
      return `Sisa ${hours} jam`;
    } else if (minutes > 0) {
      return `Sisa ${minutes} menit`;
    } else {
      return "Akan logout dalam 1 menit";
    }
  } catch (error) {
    return "Unknown";
  }
};

// ===================================
// 🎨 FORMAT HELPERS
// ===================================

export const formatNIKDisplay = (nik: string): string => {
  const clean = nik.replace(/\s/g, "");
  return clean.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
};

export const formatNoHPDisplay = (no_hp: string): string => {
  const clean = no_hp.replace(/[\s\-\(\)]/g, "");

  let displayHP = clean;
  if (clean.startsWith("628")) {
    displayHP = "0" + clean.substring(2);
  } else if (clean.startsWith("+628")) {
    displayHP = "0" + clean.substring(3);
  }

  return displayHP.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
