export type StatusProses =
  | 'draft'
  | 'awaiting_payment'
  | 'paid'
  | 'data_completed'
  | 'docs_uploaded'
  | 'docs_verified'
  | 'scheduled'
  | 'tested'
  | 'announced'
  | 'accepted'
  | 'rejected'
  | 'enrolled';

const ALL_STATUSES: StatusProses[] = [
  'draft',
  'awaiting_payment',
  'paid',
  'data_completed',
  'docs_uploaded',
  'docs_verified',
  'scheduled',
  'tested',
  'announced',
  'accepted',
  'rejected',
  'enrolled'
];

export type TabName =
  | 'data-pribadi'              // folder: page.tsx (root)
  | 'pembayaran-pendaftaran'    // ✅ match
  | 'kelengkapan-berkas'        // ✅ match
  | 'upload-berkas'             // ✅ ada folder
  | 'undangan-seleksi'          // ⬅️ ganti jadwal-ujian ke ini
  | 'pengumuman'                // ✅ match
  | 'daftar-ulang'              // ✅ match
  | 'profil'                    // ⬅️ tambah
  | 'status-pembayaran'         // ⬅️ tambah
  | 'download-berkas';          // ⬅️ tambah

export function canAccessTab(tabName: TabName, statusProses: StatusProses): boolean {
  const accessMap: Record<TabName, StatusProses[]> = {
    'data-pribadi': ALL_STATUSES,
    'pembayaran-pendaftaran': ALL_STATUSES,
    'kelengkapan-berkas': ['paid', 'data_completed', 'docs_uploaded', 'docs_verified', 'scheduled', 'tested', 'announced', 'accepted', 'rejected', 'enrolled'],
    'upload-berkas': ['paid', 'data_completed', 'docs_uploaded', 'docs_verified', 'scheduled', 'tested', 'announced', 'accepted', 'rejected', 'enrolled'],
    'undangan-seleksi': ['docs_verified', 'scheduled', 'tested', 'announced', 'accepted', 'rejected', 'enrolled'],
    'pengumuman': ['announced', 'accepted', 'rejected', 'enrolled'],
    'daftar-ulang': ['accepted', 'enrolled'],
    'profil': ALL_STATUSES,
    'status-pembayaran': ALL_STATUSES,
    'download-berkas': ['docs_uploaded', 'docs_verified', 'scheduled', 'tested', 'announced', 'accepted', 'rejected', 'enrolled']
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