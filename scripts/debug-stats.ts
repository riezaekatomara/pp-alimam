import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Service role client to bypass RLS and Auth middleware constraints
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("Supabase URL:", supabaseUrl);
console.log("Service Key Present:", !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testStats() {
    console.log("Testing stats query...");

    // 1. Fetch raw data
    const { data: pendaftarData, error } = await supabase
        .from("pendaftar")
        .select("status_pendaftaran");

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(`Found ${pendaftarData.length} records.`);
    console.log("Raw Data Sample:", pendaftarData.slice(0, 5));

    // 2. Aggregate
    const statusCounts = (pendaftarData || []).reduce(
        (acc: Record<string, number>, item: { status_pendaftaran: string }) => {
            const status = item.status_pendaftaran;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        },
        {}
    );

    console.log("Aggregated Counts:", statusCounts);
}

testStats();
