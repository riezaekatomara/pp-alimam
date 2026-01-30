// src/lib/access-control.ts
export type TabName = 'data-pendaftaran' | 'pembayaran-pendaftaran' | 'kelengkapan-berkas' | 'undangan-seleksi' | 'pengumuman' | 'daftar-ulang' | 'profil';

export type StatusProses = 'draft' | 'awaiting_payment' | 'paid' | 'data_completed' | 'docs_uploaded' | 'docs_verified' | 'scheduled' | 'tested' | 'announced' | 'accepted' | 'rejected' | 'enrolled';

export function canAccessTab(tabName: TabName, statusProses: StatusProses): boolean {
  const accessMap = {
    'data-pendaftaran': ['draft','awaiting_payment','paid','data_completed','docs_uploaded','docs_verified','scheduled','tested','announced','accepted','rejected','enrolled'],
    'pembayaran-pendaftaran': ['draft','awaiting_payment','paid','data_completed','docs_uploaded','docs_verified','scheduled','tested','announced','accepted','rejected','enrolled'],
    'kelengkapan-berkas': ['paid','data_completed','docs_uploaded','docs_verified','scheduled','tested','announced','accepted','rejected','enrolled'],
    'undangan-seleksi': ['docs_verified','scheduled','tested','announced','accepted','rejected','enrolled'],
    'pengumuman': ['tested','announced','accepted','rejected','enrolled'],
    'daftar-ulang': ['accepted','enrolled'],
    'profil': ['draft','awaiting_payment','paid','data_completed','docs_uploaded','docs_verified','scheduled','tested','announced','accepted','rejected','enrolled']
  };
  return accessMap[tabName]?.includes(statusProses) ?? false;
}
