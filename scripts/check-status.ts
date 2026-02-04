import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log("Checking status values...");
  
  const { data, error } = await supabase
    .from("pendaftar")
    .select("nama_lengkap, status_pendaftaran");
  
  if (error) {
    console.error("Error:", error);
    return;
  }
  
  console.log("Pendaftar data:");
  data.forEach((p) => {
    console.log(`  ${p.nama_lengkap}: ${p.status_pendaftaran}`);
  });
}

main();
