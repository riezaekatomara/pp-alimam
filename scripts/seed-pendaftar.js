/**
 * Seed pendaftar uji untuk development/testing
 * Membuat tahun ajaran aktif (jika belum ada) + 1 pendaftar untuk login
 *
 * Usage:
 *   pnpm seed:pendaftar
 *   atau (dengan env dari .env.local):
 *   node -e "require('fs').readFileSync('.env.local','utf8').split('\n').forEach(l=>{const[k,v]=l.split('=');if(k&&v)process.env[k]=v.trim()})" -e "require('./scripts/seed-pendaftar.js')"
 *   atau set manual: set NEXT_PUBLIC_SUPABASE_URL=... && set SUPABASE_SERVICE_ROLE_KEY=... && pnpm seed:pendaftar
 *
 * Login setelah seed:
 *   NIK: 1603034545940001
 *   Nomor: ILI2600001
 */

// Load .env.local jika ada (Next.js project)
try {
  const fs = require("fs");
  const path = require("path");
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf8")
      .split("\n")
      .forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const eq = trimmed.indexOf("=");
          if (eq > 0) {
            const key = trimmed.slice(0, eq).trim();
            const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
            if (key) process.env[key] = val;
          }
        }
      });
  }
} catch (_) {}

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌ Set NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const TEST_PENDAFTAR = {
  nik: "1603034545940001",
  nomor_pendaftaran: "ILI2600001",
  nama_lengkap: "Test Pendaftar Development",
  jenis_kelamin: "L",
  jenjang: "IL",
  tanggal_lahir: "2010-03-15",
  no_hp: "6281234567890",
  email: "test@example.com",
  status_pendaftaran: "draft",
};

async function main() {
  console.log("\n🌱 SEED PENDAFTAR UJI - PPDB AL-IMAM\n");

  // 1. Cek/insert tahun ajaran aktif
  const { data: tahunAjaran, error: taError } = await supabase
    .from("tahun_ajaran")
    .select("id, nama")
    .eq("is_active", true)
    .maybeSingle();

  let tahun_ajaran_id;

  if (taError) {
    console.error("❌ Error cek tahun ajaran:", taError.message);
    process.exit(1);
  }

  if (tahunAjaran) {
    tahun_ajaran_id = tahunAjaran.id;
    console.log("✅ Tahun ajaran aktif:", tahunAjaran.nama);
  } else {
    console.log("📌 Membuat tahun ajaran 2026/2027...");
    const { data: newTA, error: insertTA } = await supabase
      .from("tahun_ajaran")
      .insert({
        tahun_mulai: 2026,
        tahun_selesai: 2027,
        nama: "2026/2027",
        is_active: true,
        tanggal_buka_pendaftaran: "2026-01-01",
        tanggal_tutup_pendaftaran: "2026-06-30",
        biaya_pendaftaran: 250000,
      })
      .select("id, nama")
      .single();

    if (insertTA) {
      console.error("❌ Gagal membuat tahun ajaran:", insertTA.message);
      process.exit(1);
    }
    tahun_ajaran_id = newTA.id;
    console.log("✅ Tahun ajaran dibuat:", newTA.nama);
  }

  // 2. Cek apakah pendaftar sudah ada
  const { data: existing } = await supabase
    .from("pendaftar")
    .select("id, nomor_pendaftaran")
    .eq("nik", TEST_PENDAFTAR.nik)
    .maybeSingle();

  if (existing) {
    console.log("\n✅ Pendaftar sudah ada:");
    console.log("   NIK:", TEST_PENDAFTAR.nik);
    console.log("   Nomor:", existing.nomor_pendaftaran);
    console.log("\n🔐 Login dengan:");
    console.log("   NIK:", TEST_PENDAFTAR.nik);
    console.log("   Nomor:", existing.nomor_pendaftaran);
    console.log("\n");
    return;
  }

  // 3. Insert pendaftar
  const { data: pendaftar, error } = await supabase
    .from("pendaftar")
    .insert({
      tahun_ajaran_id,
      nik: TEST_PENDAFTAR.nik,
      nomor_pendaftaran: TEST_PENDAFTAR.nomor_pendaftaran,
      nama_lengkap: TEST_PENDAFTAR.nama_lengkap,
      jenis_kelamin: TEST_PENDAFTAR.jenis_kelamin,
      jenjang: TEST_PENDAFTAR.jenjang,
      tanggal_lahir: TEST_PENDAFTAR.tanggal_lahir,
      no_hp: TEST_PENDAFTAR.no_hp,
      email: TEST_PENDAFTAR.email,
      status_pendaftaran: TEST_PENDAFTAR.status_pendaftaran,
      user_id: null,
    })
    .select("id, nomor_pendaftaran")
    .single();

  if (error) {
    console.error("❌ Gagal insert pendaftar:", error.message);
    console.error("   Detail:", error);
    process.exit(1);
  }

  console.log("\n✅ Pendaftar uji berhasil dibuat!");
  console.log("   ID:", pendaftar.id);
  console.log("   Nomor:", pendaftar.nomor_pendaftaran);
  console.log("\n🔐 Login dengan:");
  console.log("   NIK:", TEST_PENDAFTAR.nik);
  console.log("   Nomor:", pendaftar.nomor_pendaftaran);
  console.log("\n   → Buka http://localhost:3000/login\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
