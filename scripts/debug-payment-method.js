// Script to debug allowed values for metode_pembayaran
// Usage: node scripts/debug-payment-method.js

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
    console.log("🔍 Debugging 'metode_pembayaran' constraint...\n");

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
        console.error("❌ ERROR: Missing credentials in .env.local");
        process.exit(1);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { persistSession: false },
    });

    // Get a valid pendaftar & tahun_ajaran to use for testing
    const { data: pendaftar } = await supabase.from("pendaftar").select("id, tahun_ajaran_id").limit(1).single();

    if (!pendaftar) {
        console.error("❌ No pendaftar found to test with.");
        return;
    }

    const valuesToTest = ["manual", "transfer", "transfer_manual", "bank_transfer", "midtrans"];

    for (const method of valuesToTest) {
        console.log(`Testing value: "${method}"...`);

        // Attempt insert (we expect failure, but we want to see IF it fails on the specific constraint)
        const { error } = await supabase.from("pembayaran").insert({
            pendaftar_id: pendaftar.id,
            tahun_ajaran_id: pendaftar.tahun_ajaran_id,
            metode_pembayaran: method,
            jumlah: 1000,
            status_pembayaran: "pending"
        });

        if (error) {
            if (error.message.includes("pembayaran_metode_pembayaran_check")) {
                console.log(`   ❌ REJECTED (Constraint violation)`);
            } else {
                console.log(`   ❓ FAILED with other error: ${error.message}`);
            }
        } else {
            console.log(`   ✅ ACCEPTED! This is a valid value.`);
            // Allow cleanup if needed, but for now knowing it works is enough.
            // We might want to delete this dummy record.
        }
    }
}

main();
