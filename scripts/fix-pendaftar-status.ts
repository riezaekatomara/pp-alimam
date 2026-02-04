import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixPendaftarStatus() {
  console.log("Fixing pendaftar status based on pembayaran status...\n");

  // Get all pembayaran with their pendaftar_id
  const { data: pembayaranList, error: pembayaranError } = await supabase
    .from("pembayaran")
    .select("id, pendaftar_id, status_pembayaran, pendaftar:pendaftar_id(id, nama_lengkap, status_pendaftaran)");

  if (pembayaranError) {
    console.error("Error fetching pembayaran:", pembayaranError);
    return;
  }

  console.log(`Found ${pembayaranList.length} pembayaran records\n`);

  for (const pembayaran of pembayaranList) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pendaftar = pembayaran.pendaftar as any;
    const currentStatus = pendaftar?.status_pendaftaran;

    let newStatus: string | null = null;

    // Determine what the pendaftar status should be based on pembayaran status
    if (pembayaran.status_pembayaran === "verified") {
      // If payment is verified, status should be at least "paid"
      // But don't downgrade if already past paid (e.g., data_completed, docs_uploaded, etc.)
      const paidOrLaterStatuses = ["paid", "data_completed", "docs_uploaded", "docs_verified", "scheduled", "exam_scheduled", "exam_completed", "announced", "accepted", "enrolled"];
      if (!paidOrLaterStatuses.includes(currentStatus)) {
        newStatus = "paid";
      }
    } else if (pembayaran.status_pembayaran === "rejected") {
      // If payment is rejected, status should be payment_rejected
      if (currentStatus !== "payment_rejected") {
        newStatus = "payment_rejected";
      }
    }

    console.log(`${pendaftar?.nama_lengkap || "Unknown"}:`);
    console.log(`  Pembayaran status: ${pembayaran.status_pembayaran}`);
    console.log(`  Current pendaftar status: ${currentStatus}`);

    if (newStatus) {
      console.log(`  -> Updating to: ${newStatus}`);

      const { error: updateError } = await supabase
        .from("pendaftar")
        .update({
          status_pendaftaran: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", pembayaran.pendaftar_id);

      if (updateError) {
        console.log(`  ERROR: ${updateError.message}`);
      } else {
        console.log(`  SUCCESS!`);
      }
    } else {
      console.log(`  -> No update needed`);
    }
    console.log("");
  }

  console.log("Done!");
}

fixPendaftarStatus();
