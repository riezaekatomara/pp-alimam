import { createClient } from "@/lib/supabase/client";

// Tipe data hasil upload
export type UploadResult = {
  success: boolean; // true = berhasil, false = gagal
  path?: string; // lokasi file di storage
  url?: string; // link untuk akses file
  error?: string; // pesan error (jika gagal)
};

/**
 * FUNGSI: Upload Dokumen Pendaftaran
 *
 * Contoh penggunaan:
 * const result = await uploadDokumen(
 *   fileYangDipilih,
 *   'abc-123-def',
 *   'B250001',
 *   'foto'
 * );
 */
export async function uploadDokumen(
  file: File, // File yang mau diupload
  userId: string, // ID user (dari auth)
  nomorPendaftaran: string, // B250001
  jenisDokumen: string, // foto, rapor, kk, dll
): Promise<UploadResult> {
  // 1. Connect ke Supabase
  const supabase = createClient();

  // 2. VALIDASI: Cek ukuran file
  const maxSize = 1 * 1024 * 1024; // 1MB dalam bytes
  if (file.size > maxSize) {
    return {
      success: false,
      error: "File terlalu besar! Maksimal 1MB",
    };
  }

  // 3. VALIDASI: Cek tipe file
  const allowedTypes = [
    "image/jpeg", // .jpg
    "image/png", // .png
    "application/pdf", // .pdf
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: "Format file tidak didukung! Gunakan JPG, PNG, atau PDF",
    };
  }

  // 4. Buat nama file yang unik
  const fileExtension = file.name.split(".").pop(); // jpg, pdf, dll
  const fileName = `${nomorPendaftaran}_${jenisDokumen}.${fileExtension}`;

  // 5. Buat path lengkap
  // Contoh: abc-123-def/foto/B250001_foto.jpg
  const filePath = `${userId}/${jenisDokumen}/${fileName}`;

  // 6. Upload ke Supabase Storage
  const { data, error } = await supabase.storage
    .from("dokumen-pendaftaran") // Nama bucket
    .upload(filePath, file, {
      cacheControl: "3600", // Cache 1 jam
      upsert: true, // Timpa file lama jika ada
    });

  // 7. Cek apakah upload berhasil
  if (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: `Gagal upload: ${error.message}`,
    };
  }

  // 8. Ambil URL publik file
  const { data: urlData } = supabase.storage
    .from("dokumen-pendaftaran")
    .getPublicUrl(filePath);

  // 9. Return hasil sukses
  return {
    success: true,
    path: data.path,
    url: urlData.publicUrl,
  };
}

/**
 * FUNGSI: Upload Bukti Pembayaran
 *
 * Mirip dengan uploadDokumen, tapi:
 * - Pakai bucket 'bukti-pembayaran'
 * - Max size 2MB (lebih besar)
 * - Lebih strict validasi format
 */
export async function uploadBuktiPembayaran(
  file: File,
  userId: string,
  nomorPendaftaran: string,
  jenisPembayaran: "pendaftaran" | "daftar-ulang",
): Promise<UploadResult> {
  const supabase = createClient();

  // Validasi ukuran (2MB untuk bukti bayar)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: "File terlalu besar! Maksimal 2MB",
    };
  }

  // Validasi format (hanya foto & PDF)
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: "Format tidak didukung! Gunakan foto (JPG/PNG) atau PDF",
    };
  }

  // Buat nama file
  const fileExtension = file.name.split(".").pop();
  const fileName = `${nomorPendaftaran}_bukti_${jenisPembayaran}.${fileExtension}`;

  // Path: user-id/pendaftaran/B250001_bukti_pendaftaran.jpg
  const filePath = `${userId}/${jenisPembayaran}/${fileName}`;

  // Upload
  const { data, error } = await supabase.storage
    .from("bukti-pembayaran")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return {
      success: false,
      error: `Gagal upload: ${error.message}`,
    };
  }

  // Bukti pembayaran PRIVATE, jadi tidak ada publicUrl
  // URL hanya bisa diakses pakai signed URL (nanti di download.ts)

  return {
    success: true,
    path: data.path,
  };
}
