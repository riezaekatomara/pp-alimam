// Create an admin user in Supabase (requires service role key)
// Usage:
// node scripts/create-admin.js email@example.com P@ssw0rd "Full Name" "+62812..."

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

const { createClient } = require('@supabase/supabase-js');

async function main() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('❌ Error: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const [email, password, fullName, phone] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Usage: node scripts/create-admin.js email password [Full Name] [phone]');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  try {
    const { data: userData, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr) throw createErr;
    const user = userData.user || userData;
    console.log('Created user id:', user.id);

    // Upsert profile with admin role (handles case where trigger already created profile)
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .upsert([{ id: user.id, role: 'admin', full_name: fullName || 'Admin', phone: phone || '' }]);
    if (profileErr) throw profileErr;
    console.log('Upserted profile:', profile);
    console.log('Done. You can now login with', email);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

main();
