import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

// Konfigurasi dokumen
const DOKUMEN_CONFIG: Record<string, {
  label: string;
  maxSize: number; // dalam bytes
  allowedTypes: string[];
  required: boolean;
}> = {
  foto_santri: {
    label: "Foto Calon Santri",
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedTypes: ["image/jpeg", "image/png"],
    required: true,
  },
  ktp_ortu: {
    label: "KTP Orang Tua",
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: true,
  },
  kartu_keluarga: {
    label: "Kartu Keluarga",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: true,
  },
  akta_kelahiran: {
    label: "Akta Kelahiran",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: true,
  },
  rapor_sem1: {
    label: "Rapor Semester 1",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: true,
  },
  rapor_sem2: {
    label: "Rapor Semester 2",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: true,
  },
  surat_kesanggupan: {
    label: "Surat Kesanggupan",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["application/pdf"],
    required: true,
  },
  surat_kesehatan: {
    label: "Surat Kesehatan",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: false,
  },
  hasil_hbsag: {
    label: "Hasil Tes HBsAg",
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    required: false,
  },
};

// Helper function untuk format ukuran file
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// POST: Upload dokumen
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
    const jenisDokumen = formData.get("jenis_dokumen") as string | null;

    if (!file || !jenisDokumen) {
      return NextResponse.json(
        { success: false, error: "File dan jenis dokumen wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Validasi jenis dokumen
    const config = DOKUMEN_CONFIG[jenisDokumen];
    if (!config) {
      return NextResponse.json(
        { success: false, error: "Jenis dokumen tidak valid" },
        { status: 400 }
      );
    }

    // 4. Validasi ukuran file
    if (file.size > config.maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: `Ukuran file terlalu besar! Maksimal ${formatFileSize(config.maxSize)} untuk ${config.label}`,
        },
        { status: 400 }
      );
    }

    // 5. Validasi tipe file
    if (!config.allowedTypes.includes(file.type)) {
      const allowedExtensions = config.allowedTypes
        .map((t) => {
          if (t === "image/jpeg") return "JPG";
          if (t === "image/png") return "PNG";
          if (t === "application/pdf") return "PDF";
          return t;
        })
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          error: `Format file tidak didukung! Gunakan ${allowedExtensions} untuk ${config.label}`,
        },
        { status: 400 }
      );
    }

    // 6. Ambil data pendaftar untuk nomor pendaftaran
    const { data: pendaftar, error: pendaftarError } = await supabaseAdmin
      .from("pendaftar")
      .select("nomor_pendaftaran")
      .eq("id", session.id)
      .single();

    if (pendaftarError || !pendaftar) {
      return NextResponse.json(
        { success: false, error: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // 7. Buat nama file yang unik
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const fileName = `${pendaftar.nomor_pendaftaran}_${jenisDokumen}.${fileExtension}`;
    const filePath = `uploads/${pendaftar.nomor_pendaftaran}/${fileName}`;

    // 8. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 9. Upload ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("dokumen-pendaftaran")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true, // Timpa jika sudah ada
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);

      // Handle bucket not found error
      if (uploadError.message?.includes("Bucket not found")) {
        return NextResponse.json(
          {
            success: false,
            error: "Storage belum dikonfigurasi. Hubungi admin untuk setup Supabase Storage bucket 'dokumen-pendaftaran'.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, error: `Gagal mengupload file: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // 10. Cek apakah sudah ada record dokumen sebelumnya
    const { data: existingDokumen } = await supabaseAdmin
      .from("dokumen")
      .select("id")
      .eq("pendaftar_id", session.id)
      .eq("jenis_dokumen", jenisDokumen)
      .single();

    // 11. Simpan/update ke tabel dokumen
    if (existingDokumen) {
      // Update existing
      const { error: updateError } = await supabaseAdmin
        .from("dokumen")
        .update({
          file_name: fileName,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          is_verified: false, // Reset verifikasi
          verified_by: null,
          verified_at: null,
          catatan: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingDokumen.id);

      if (updateError) {
        console.error("Update dokumen error:", updateError);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan data dokumen" },
          { status: 500 }
        );
      }
    } else {
      // Insert new
      const { error: insertError } = await supabaseAdmin
        .from("dokumen")
        .insert({
          pendaftar_id: session.id,
          jenis_dokumen: jenisDokumen,
          file_name: fileName,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          is_verified: false,
        });

      if (insertError) {
        console.error("Insert dokumen error:", insertError);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan data dokumen" },
          { status: 500 }
        );
      }
    }

    // 12. Return sukses
    return NextResponse.json({
      success: true,
      message: `${config.label} berhasil diupload`,
      data: {
        file_name: fileName,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
      },
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengupload file" },
      { status: 500 }
    );
  }
}

// GET: Ambil konfigurasi dokumen
export async function GET() {
  return NextResponse.json({
    success: true,
    data: DOKUMEN_CONFIG,
  });
}
