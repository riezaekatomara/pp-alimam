import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// Konfigurasi upload bukti pembayaran
const UPLOAD_CONFIG = {
  maxSize: 2 * 1024 * 1024, // 2MB
  allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
  bucket: "bukti-pembayaran",
};

// Helper function untuk format ukuran file
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

/**
 * POST /api/pembayaran/manual/upload
 * Upload bukti transfer manual ke Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid" },
        { status: 401 }
      );
    }

    if (session.role !== "pendaftar") {
      return NextResponse.json(
        { success: false, error: "Akses tidak diizinkan" },
        { status: 403 }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File bukti transfer wajib diupload" },
        { status: 400 }
      );
    }

    // 3. Validasi ukuran file
    if (file.size > UPLOAD_CONFIG.maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: `Ukuran file terlalu besar! Maksimal ${formatFileSize(UPLOAD_CONFIG.maxSize)}`,
        },
        { status: 400 }
      );
    }

    // 4. Validasi tipe file
    if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format file tidak didukung! Gunakan JPG, PNG, atau PDF",
        },
        { status: 400 }
      );
    }

    // 5. Ambil data pendaftar
    const { data: pendaftar, error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .select(`
        id,
        nomor_pendaftaran,
        tahun_ajaran_id,
        status_pendaftaran,
        tahun_ajaran:tahun_ajaran_id (
          id,
          biaya_pendaftaran,
          tanggal_tutup_pendaftaran
        )
      `)
      .eq("id", session.id)
      .single();

    if (pendaftarError || !pendaftar) {
      return NextResponse.json(
        { success: false, error: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // 6. Cek deadline
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tahunAjaranData = pendaftar.tahun_ajaran as any;
    const tahunAjaran = {
      id: tahunAjaranData?.id || "",
      biaya_pendaftaran: Number(tahunAjaranData?.biaya_pendaftaran || 0),
      tanggal_tutup_pendaftaran: tahunAjaranData?.tanggal_tutup_pendaftaran || "",
    };

    // NOTE: Jangan blokir upload bukti transfer berdasarkan deadline pendaftaran.
    // Jika ingin menutup pembayaran, buat aturan khusus di admin/flow pendaftaran.

    // 7. Cek apakah sudah ada pembayaran yang verified
    const { data: existingPayment } = await supabaseAdmin
      .from("pembayaran")
      .select("id, status_pembayaran")
      .eq("pendaftar_id", session.id)
      .eq("status_pembayaran", "verified")
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json(
        { success: false, error: "Pembayaran Anda sudah terverifikasi sebelumnya" },
        { status: 400 }
      );
    }

    // 8. Cek apakah ada pembayaran pending atau rejected - jika ada, update saja
    const { data: existingPendingPayment } = await supabaseAdmin
      .from("pembayaran")
      .select("id, status_pembayaran")
      .eq("pendaftar_id", session.id)
      .in("status_pembayaran", ["pending", "rejected"])
      .eq("metode_pembayaran", "manual")
      .maybeSingle();

    const pendingPayment = existingPendingPayment;

    // 9. Generate nama file yang unik
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const fileName = `bukti-transfer-${timestamp}.${fileExtension}`;
    const filePath = `${pendaftar.nomor_pendaftaran}/${fileName}`;

    // 10. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 11. Upload ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(UPLOAD_CONFIG.bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);

      // Handle bucket not found error
      if (uploadError.message?.includes("Bucket not found")) {
        return NextResponse.json(
          {
            success: false,
            error: "Storage belum dikonfigurasi. Hubungi admin untuk setup Supabase Storage bucket 'bukti-pembayaran'.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, error: `Gagal mengupload file: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // 12. Simpan atau update record pembayaran
    const paymentData = {
      pendaftar_id: session.id,
      tahun_ajaran_id: pendaftar.tahun_ajaran_id,
      metode_pembayaran: "manual",
      jumlah: Number(tahunAjaran.biaya_pendaftaran),
      bukti_transfer_path: filePath,
      bukti_transfer_filename: file.name,
      status_pembayaran: "pending",
      updated_at: new Date().toISOString(),
    };

    let pembayaranId;

    if (pendingPayment) {
      // Update existing pending payment
      const { error: updateError } = await supabaseAdmin
        .from("pembayaran")
        .update({
          ...paymentData,
          catatan_verifikasi: null, // Reset catatan jika re-upload
        })
        .eq("id", pendingPayment.id);

      if (updateError) {
        console.error("Update pembayaran error:", updateError);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan data pembayaran" },
          { status: 500 }
        );
      }
      pembayaranId = pendingPayment.id;
    } else {
      // Insert new payment
      const { data: insertedPayment, error: insertError } = await supabaseAdmin
        .from("pembayaran")
        .insert(paymentData)
        .select("id")
        .single();

      if (insertError) {
        console.error("Insert pembayaran error:", insertError);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan data pembayaran" },
          { status: 500 }
        );
      }
      pembayaranId = insertedPayment.id;
    }

    // 13. Update status pendaftar jika masih draft, waiting_payment, atau rejected (re-upload setelah ditolak)
    const allowedStatusForUpload = ["draft", "waiting_payment", "rejected"];
    if (allowedStatusForUpload.includes(pendaftar.status_pendaftaran)) {
      await supabaseAdmin
        .from("pendaftar")
        .update({
          status_pendaftaran: "payment_verification",
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.id);
    }

    // 14. Return sukses
    return NextResponse.json({
      success: true,
      message: "Bukti pembayaran berhasil diupload! Tim kami akan memverifikasi dalam 1x24 jam.",
      data: {
        pembayaran_id: pembayaranId,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: "pending",
      },
    });
  } catch (error: any) {
    console.error("Error in POST /api/pembayaran/manual/upload:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengupload bukti pembayaran" },
      { status: 500 }
    );
  }
}
