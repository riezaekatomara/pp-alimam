// TypeScript types untuk database

export type JenisKelamin = "L" | "P";
export type Jenjang = "MTs" | "IL" | "MA"; // UPDATED: Tambah IL (I'dad Lughowi)
export type Role = "pendaftar" | "admin" | "penguji";

export interface RegisterFormData {
  nik: string;
  nama_lengkap: string;
  no_hp: string;
  jenis_kelamin: JenisKelamin;
  jenjang: Jenjang;
  password: string;
  password_confirm?: string;
}

export interface RegisterResponse {
  user_id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  no_hp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Pendaftar {
  id: string;
  user_id: string;
  tahun_ajaran_id: string;
  nomor_pendaftaran: string;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: JenisKelamin;
  jenjang: Jenjang;
  nisn?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  golongan_darah?: string;
  anak_ke?: number;
  jumlah_saudara?: number;
  hobi?: string;
  cita_cita?: string;
  alamat?: string;
  rt?: string;
  rw?: string;
  kelurahan?: string;
  kecamatan?: string;
  kabupaten?: string;
  provinsi?: string;
  kode_pos?: string;
  no_hp?: string;
  email?: string;
  asal_sekolah?: string;
  alamat_sekolah?: string;
  npsn?: string;
  tahun_lulus?: number;
  sumber_informasi?: string;
  jumlah_hafalan?: string;
  status_pendaftaran: string;
  created_at: string;
  updated_at: string;
}
