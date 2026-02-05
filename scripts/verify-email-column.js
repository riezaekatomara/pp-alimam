const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
            const [key, ...vals] = trimmed.split("=");
            if (key && vals.length > 0) {
                process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
            }
        }
    });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
    console.log("Verifying 'email' column in 'profiles' table...");

    // Try to select the email column specifically
    const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .limit(1);

    if (error) {
        console.error("❌ Error selecting email column:", error.message);
        if (error.message.includes("Could not find the 'email' column")) {
            console.log("CONCLUSION: Column is definitively missing or not in schema cache.");
        }
    } else {
        console.log("✅ Success! 'email' column exists and is accessible.");
        console.log("Sample data:", data);
    }
}

main();
