import { createClient } from "@/lib/supabase/client";

/**
 * FUNGSI: Download File dari Storage
 *
 * Contoh penggunaan:
 * const blob = await downloadFile(
 *   'dokumen-pendaftaran',
 *   'abc-123/foto/B250001_foto.jpg'
 * );
 */
export async function downloadFile(
  bucket: string, // Nama bucket
  path: string, // Path file
): Promise<Blob | null> {
  const supabase = createClient();

  // Download file sebagai Blob (binary data)
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error) {
    console.error("Download error:", error);
    return null;
  }

  return data; // Return Blob
}

/**
 * FUNGSI: Trigger Download ke Komputer User
 *
 * Contoh penggunaan:
 * const blob = await downloadFile(...);
 * if (blob) {
 *   triggerDownload(blob, 'rapor_semester_1.pdf');
 * }
 */
export function triggerDownload(blob: Blob, filename: string) {
  // 1. Buat URL sementara dari Blob
  const url = URL.createObjectURL(blob);

  // 2. Buat element  (link) secara virtual
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // Nama file saat di-download

  // 3. Trigger klik otomatis
  document.body.appendChild(a); // Tambahkan ke DOM
  a.click(); // Klik otomatis
  document.body.removeChild(a); // Hapus dari DOM

  // 4. Bersihkan URL sementara
  URL.revokeObjectURL(url);
}

/**
 * FUNGSI: Get Public URL (untuk dokumen publik)
 *
 * Contoh penggunaan:
 * const url = getPublicUrl(
 *   'dokumen-pendaftaran',
 *   'abc-123/foto/B250001_foto.jpg'
 * );
 * // url bisa langsung dipake di
 */
export function getPublicUrl(bucket: string, path: string): string {
  const supabase = createClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}

/**
 * FUNGSI: Get Signed URL (untuk dokumen private)
 *
 * Dipakai untuk bukti-pembayaran (private bucket)
 *
 * Contoh penggunaan:
 * const url = await getSignedUrl(
 *   'bukti-pembayaran',
 *   'abc-123/pendaftaran/B250001_bukti.jpg',
 *   60 * 5 // Expired dalam 5 menit
 * );
 */
export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 60, // detik (default 60 detik = 1 menit)
): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error("Signed URL error:", error);
    return null;
  }

  return data.signedUrl;
}

/**
 * FUNGSI: Hapus File
 *
 * Contoh penggunaan:
 * const success = await deleteFile(
 *   'dokumen-pendaftaran',
 *   'abc-123/foto/B250001_foto.jpg'
 * );
 */
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase.storage.from(bucket).remove([path]); // Terima array of paths

  if (error) {
    console.error("Delete error:", error);
    return false;
  }

  return true; // Berhasil dihapus
}
