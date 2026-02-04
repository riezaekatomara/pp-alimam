import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Service role client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugData() {
    console.log("=== DEBUGGING DATA STATUS ===");

    // 1. Check Pembayaran
    console.log("\n1. Checking Table: pembayaran");
    const { data: pembayaran, error: payError } = await supabase
        .from("pembayaran")
        .select("id, status_pembayaran, metode_pembayaran, jumlah, created_at, pendaftar_id");

    if (payError) console.error("Error fetching pembayaran:", payError);
    else {
        console.log(`Found ${pembayaran?.length} records:`);
        console.log(JSON.stringify(pembayaran, null, 2));
    }

    // 2. Check Dokumen
    console.log("\n2. Checking Table: dokumen");
    const { data: dokumen, error: docError } = await supabase
        .from("dokumen")
        .select("id, jenis_dokumen, status_verifikasi, file_path, created_at");

    if (docError) console.error("Error fetching dokumen:", docError);
    else {
        console.log(`Found ${dokumen?.length} records:`);
        console.log(JSON.stringify(dokumen, null, 2));
    }
}

debugData();
