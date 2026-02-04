import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("Supabase URL:", supabaseUrl);
console.log("Service Key Present:", !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugPembayaran() {
    console.log("\n=== Debug Pembayaran Data ===\n");

    // 1. Get all pembayaran records
    const { data: pembayaran, error } = await supabase
        .from("pembayaran")
        .select(`
            id,
            pendaftar_id,
            jumlah,
            metode_pembayaran,
            status_pembayaran,
            bukti_transfer_path,
            bukti_transfer_filename,
            catatan_verifikasi,
            created_at,
            updated_at,
            pendaftar:pendaftar_id (
                id,
                nama_lengkap,
                nomor_pendaftaran
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching pembayaran:", error);
        return;
    }

    console.log(`Found ${pembayaran.length} pembayaran records:\n`);

    pembayaran.forEach((p, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pendaftar = p.pendaftar as any;
        console.log(`${i + 1}. ${pendaftar?.nama_lengkap || "Unknown"}`);
        console.log(`   Nomor Pendaftaran: ${pendaftar?.nomor_pendaftaran || "-"}`);
        console.log(`   Status: ${p.status_pembayaran}`);
        console.log(`   Jumlah: Rp ${Number(p.jumlah).toLocaleString("id-ID")}`);
        console.log(`   Metode: ${p.metode_pembayaran}`);
        console.log(`   Bukti Path: ${p.bukti_transfer_path || "N/A"}`);
        console.log(`   Bukti Filename: ${p.bukti_transfer_filename || "N/A"}`);
        console.log(`   Created: ${p.created_at}`);
        console.log("");
    });

    // 2. Count by status
    const statusCounts: Record<string, number> = {};
    pembayaran.forEach((p) => {
        statusCounts[p.status_pembayaran] = (statusCounts[p.status_pembayaran] || 0) + 1;
    });

    console.log("\n=== Status Summary ===");
    Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`${status}: ${count}`);
    });

    // 3. Check if bukti-pembayaran bucket exists and list files
    console.log("\n=== Storage Bucket Check ===");
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
        console.error("Error listing buckets:", bucketsError);
    } else {
        const buktiPembayaranBucket = buckets.find(b => b.name === "bukti-pembayaran");
        if (buktiPembayaranBucket) {
            console.log("bukti-pembayaran bucket exists:", buktiPembayaranBucket);

            // List files in bucket
            const { data: files, error: filesError } = await supabase.storage
                .from("bukti-pembayaran")
                .list("", { limit: 100 });

            if (filesError) {
                console.error("Error listing files:", filesError);
            } else {
                console.log(`\nFiles in bucket (folders):`, files?.map(f => f.name));
            }
        } else {
            console.log("bukti-pembayaran bucket NOT FOUND!");
            console.log("Available buckets:", buckets.map(b => b.name));
        }
    }
}

debugPembayaran();
