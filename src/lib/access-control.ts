// src/lib/access-control.ts

export type TabName = 
  | 'data-pribadi'
  | 'pembayaran-pendaftaran'
  | 'kelengkapan-berkas'
  | 'jadwal-ujian'
  | 'hasil-ujian'
  | 'pengumuman'
  | 'daftar-ulang'
  | 'profil';

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

export function canAccessTab(tabName: TabName, statusProses: StatusProses): boolean {
  const accessMap: Record<TabName, StatusProses[]> = {
    'data-pribadi': [
      'draft', 'awaiting_payment', 'paid', 'data_completed',
      'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
      'announced', 'accepted', 'rejected', 'enrolled'
    ],
    'pembayaran-pendaftaran': [
      'draft', 'awaiting_payment', 'paid', 'data_completed',
      'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
      'announced', 'accepted', 'rejected', 'enrolled'
    ],
    'kelengkapan-berkas': [
      'paid', 'data_completed', 'docs_uploaded', 'docs_verified',
      'scheduled', 'tested', 'announced', 'accepted', 'rejected', 'enrolled'
    ],
    'jadwal-ujian': [
      'docs_verified', 'scheduled', 'tested', 'announced',
      'accepted', 'rejected', 'enrolled'
    ],
    'hasil-ujian': [
      'tested', 'announced', 'accepted', 'rejected', 'enrolled'
    ],
    'pengumuman': [
      'announced', 'accepted', 'rejected', 'enrolled'
    ],
    'daftar-ulang': [
      'accepted', 'enrolled'
    ],
    'profil': [
      'draft', 'awaiting_payment', 'paid', 'data_completed',
      'docs_uploaded', 'docs_verified', 'scheduled', 'tested',
      'announced', 'accepted', 'rejected', 'enrolled'
    ]
  };

  return accessMap[tabName]?.includes(statusProses) ?? false;
}

// Helper functions untuk UI
export function getStatusDisplayName(status: StatusProses): string {
  const displayNames: Record<StatusProses, string> = {
    'draft': 'Draft / Belum Bayar',
    'awaiting_payment': 'Menunggu Pembayaran',
    'paid': 'Pembayaran Diterima',
    'data_completed': 'Data Lengkap',
    'docs_uploaded': 'Berkas Diupload',
    'docs_verified': 'Berkas Diverifikasi',
    'scheduled': 'Terjadwal Ujian',
    'tested': 'Sudah Ujian',
    'announced': 'Pengumuman Keluar',
    'accepted': 'Diterima',
    'rejected': 'Ditolak',
    'enrolled': 'Terdaftar'
  };
  
  return displayNames[status] || status;
}

export function getStatusColor(status: StatusProses): string {
  const colors: Record<StatusProses, string> = {
    'draft': 'text-amber-700 bg-amber-100',
    'awaiting_payment': 'text-blue-700 bg-blue-100',
    'paid': 'text-green-700 bg-green-100',
    'data_completed': 'text-teal-700 bg-teal-100',
    'docs_uploaded': 'text-indigo-700 bg-indigo-100',
    'docs_verified': 'text-purple-700 bg-purple-100',
    'scheduled': 'text-pink-700 bg-pink-100',
    'tested': 'text-rose-700 bg-rose-100',
    'announced': 'text-cyan-700 bg-cyan-100',
    'accepted': 'text-emerald-700 bg-emerald-100',
    'rejected': 'text-red-700 bg-red-100',
    'enrolled': 'text-lime-700 bg-lime-100'
  };
  
  return colors[status] || 'text-gray-700 bg-gray-100';
}

export function getNextRequiredStatus(currentStatus: StatusProses): StatusProses | null {
  const flow: StatusProses[] = [
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
    'enrolled'
  ];
  
  const currentIndex = flow.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex >= flow.length - 1) {
    return null;
  }
  
  return flow[currentIndex + 1];
}

export function getProgressPercentage(currentStatus: StatusProses): number {
  const flow: StatusProses[] = [
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
    'enrolled'
  ];
  
  const currentIndex = flow.indexOf(currentStatus);
  if (currentIndex === -1) return 0;
  
  return Math.round(((currentIndex + 1) / flow.length) * 100);
}