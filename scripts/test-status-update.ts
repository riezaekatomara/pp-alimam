import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testStatusValues() {
  // Test various status values
  const testValues = [
    "draft",
    "payment_verification", 
    "payment_verified",
    "paid",
    "payment_rejected",
    "data_completed",
    "docs_uploaded",
    "docs_verified",
    "docs_rejected",
    "scheduled",
    "exam_scheduled",
    "exam_completed",
    "announced",
    "accepted",
    "rejected",
    "enrolled",
    "verified",
    "pending"
  ];

  // Get a test record
  const { data: testPendaftar } = await supabase
    .from("pendaftar")
    .select("id, nama_lengkap")
    .eq("nama_lengkap", "Reza Test Santri")
    .single();

  if (!testPendaftar) {
    console.log("Test pendaftar not found");
    return;
  }

  console.log("Testing with:", testPendaftar.nama_lengkap);
  console.log("Original id:", testPendaftar.id);
  console.log("\nTesting status values...\n");

  for (const status of testValues) {
    const { error } = await supabase
      .from("pendaftar")
      .update({ status_pendaftaran: status })
      .eq("id", testPendaftar.id);
    
    if (error) {
      console.log(`❌ "${status}" - INVALID`);
    } else {
      console.log(`✅ "${status}" - VALID`);
      // Reset back to payment_verification
      await supabase
        .from("pendaftar")
        .update({ status_pendaftaran: "payment_verification" })
        .eq("id", testPendaftar.id);
    }
  }
}

testStatusValues();
