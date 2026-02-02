// Status yang valid sesuai database constraint:
// draft, payment_verification, verified, rejected, scheduled, accepted
export type StatusProses =
  | 'draft'
  | 'payment_verification'
  | 'verified'        // Pembayaran terverifikasi (Lunas)
  | 'rejected'        // Pembayaran ditolak
  | 'scheduled'       // Terjadwal ujian
  | 'accepted'        // Diterima
  // Legacy statuses (untuk backward compatibility)
  | 'awaiting_payment'
  | 'paid'
  | 'data_completed'
  | 'docs_uploaded'
  | 'docs_verified'
  | 'tested'
  | 'announced'
  | 'enrolled';

const ALL_STATUSES: StatusProses[] = [
  'draft',
  'payment_verification',
  'verified',
  'rejected',
  'scheduled',
  'accepted',
  // Legacy
  'awaiting_payment',
  'paid',
  'data_completed',
  'docs_uploaded',
  'docs_verified',
  'tested',
  'announced',
  'enrolled'
];

export type TabName =
  | 'data-pribadi'              // folder: page.tsx (root)
  | 'pembayaran-pendaftaran'    // ✅ match
  | 'kelengkapan-berkas'        // ✅ match - Isian data lengkap
  | 'upload-berkas'             // ✅ ada folder
  | 'undangan-seleksi'          // ⬅️ ganti jadwal-ujian ke ini
  | 'pengumuman'                // ✅ match
  | 'daftar-ulang'              // ✅ match
  | 'profil'                    // ⬅️ tambah
  | 'status-pembayaran'         // ⬅️ tambah
  | 'download-berkas';          // ⬅️ tambah

export function canAccessTab(tabName: TabName, statusProses: StatusProses): boolean {
  // Tab yang unlock setelah pembayaran verified:
  // - kelengkapan-berkas (Isi Data Lengkap)
  // - upload-berkas
  // - download-berkas
  const accessMap: Record<TabName, StatusProses[]> = {
    'data-pribadi': ALL_STATUSES,
    'pembayaran-pendaftaran': ALL_STATUSES,
    'status-pembayaran': ALL_STATUSES,
    'profil': ALL_STATUSES,
    // Unlock setelah pembayaran verified (Lunas)
    'kelengkapan-berkas': ['verified', 'scheduled', 'accepted', 'paid', 'data_completed', 'docs_uploaded', 'docs_verified', 'tested', 'announced', 'enrolled'],
    'upload-berkas': ['verified', 'scheduled', 'accepted', 'paid', 'data_completed', 'docs_uploaded', 'docs_verified', 'tested', 'announced', 'enrolled'],
    'download-berkas': ['verified', 'scheduled', 'accepted', 'docs_uploaded', 'docs_verified', 'tested', 'announced', 'enrolled'],
    // Unlock setelah tahapan lebih lanjut
    'undangan-seleksi': ['scheduled', 'accepted', 'docs_verified', 'tested', 'announced', 'enrolled'],
    'pengumuman': ['accepted', 'announced', 'enrolled'],
    'daftar-ulang': ['accepted', 'enrolled'],
  };

  return accessMap[tabName]?.includes(statusProses) ?? false;
}

import { SupabaseClient } from "@supabase/supabase-js";

export async function isAdmin(supabase: SupabaseClient): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // TODO: Implement strict role checking via database or custom claims
    // For now, we assume any authenticated user accessing this has been verified by middleware
    return !!user;
  } catch (error) {
    return false;
  }
}
