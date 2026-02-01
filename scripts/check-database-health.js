// Script to check database health and consistency
// Usage: node scripts/check-database-health.js

// Load .env.local
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
} catch (_) { }

const { createClient } = require("@supabase/supabase-js");

async function main() {
    console.log("🔍 Checking Supabase Database Consistency...\n");

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
        console.error("❌ ERROR: Missing credentials in .env.local");
        console.log("Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
        process.exit(1);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { persistSession: false },
    });

    // 1. Check Connection & Tahun Ajaran
    console.log("1️⃣  Checking Tahun Ajaran (Academic Years)...");
    const { data: ta, error: taError } = await supabase
        .from("tahun_ajaran")
        .select("*")
        .order("is_active", { ascending: false });

    if (taError) {
        console.error("   ❌ Failed to fetch tahun_ajaran:", taError.message);
    } else {
        console.log(`   ✅ Found ${ta.length} academic years.`);
        const active = ta.find((t) => t.is_active);
        if (active) {
            console.log(`   🌟 Active Year: ${active.nama} (ID: ${active.id})`);
        } else {
            console.warn("   ⚠️  WARNING: No active academic year found!");
        }
    }

    console.log("");

    // 2. Check Pendaftar
    console.log("2️⃣  Checking Pendaftar (Applicants)...");
    const { count: pendaftarCount, error: pError } = await supabase
        .from("pendaftar")
        .select("*", { count: "exact", head: true });

    if (pError) {
        console.error("   ❌ Failed to fetch pendaftar:", pError.message);
    } else {
        console.log(`   ✅ Total Applicants: ${pendaftarCount}`);

        // Check specific test user
        const { data: testUser } = await supabase
            .from("pendaftar")
            .select("nomor_pendaftaran, nama_lengkap")
            .eq("nik", "1603034545940001")
            .single();

        if (testUser) {
            console.log(`   ✅ Test User Found: ${testUser.nama_lengkap} (${testUser.nomor_pendaftaran})`);
        } else {
            console.warn("   ⚠️  Test User (NIK 160303...) NOT found. Run 'npm run seed:pendaftar' to fix.");
        }
    }

    console.log("");

    // 3. Check Admin/Profiles
    console.log("3️⃣  Checking Profiles (Admins/Users)...");
    const { data: profiles, error: prError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .in("role", ["admin", "penguji"]);

    if (prError) {
        console.error("   ❌ Failed to fetch profiles:", prError.message);
    } else {
        console.log(`   ✅ Found ${profiles.length} Admin/Penguji accounts.`);
        profiles.forEach(p => console.log(`      - [${p.role}] ${p.full_name}`));
    }

    console.log("\n✅ Database Check Finished.");
}

main();
