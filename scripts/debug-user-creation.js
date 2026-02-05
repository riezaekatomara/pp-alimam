// Debug script to check if specific roles cause user creation failure
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

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
});

async function testCreateUser(role, email) {
    console.log(`\nTesting creation for role: ${role} (${email})...`);
    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password: "TestPassword123!",
            email_confirm: true,
            user_metadata: {
                role,
                full_name: "Test User",
                nama_lengkap: "Test User"
            },
        });

        if (error) {
            console.error(`FAILED (${role}):`, error.message);
            if (error.code) console.error("Error code:", error.code);
            return false;
        }

        console.log(`SUCCESS (${role}): User created with ID ${data.user.id}`);

        // Cleanup
        await supabase.auth.admin.deleteUser(data.user.id);
        console.log("Cleanup done.");
        return true;

    } catch (err) {
        console.error(`EXCEPTION (${role}):`, err);
        return false;
    }
}

async function main() {
    const timestamp = Date.now();

    // Test 1: admin_super
    await testCreateUser("admin_super", `test-super-${timestamp}@example.com`);

    // Test 2: admin
    await testCreateUser("admin", `test-admin-${timestamp}@example.com`);

    // Test 3: penguji
    await testCreateUser("penguji", `test-penguji-${timestamp}@example.com`);

    // Test 4: admin_berkas
    await testCreateUser("admin_berkas", `test-berkas-${timestamp}@example.com`);

    // Test 5: admin_keuangan
    await testCreateUser("admin_keuangan", `test-keuangan-${timestamp}@example.com`);
}

main();
