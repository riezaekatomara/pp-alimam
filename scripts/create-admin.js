// Create an admin user in Supabase (requires service role key)
// Usage:
// SUPABASE_URL="https://xyz.supabase.co" SUPABASE_SERVICE_ROLE_KEY="..." node scripts/create-admin.js email@example.com P@ssw0rd "Full Name" "+62812..."

const { createClient } = require('@supabase/supabase-js');

async function main() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars');
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

    // Insert profile with admin role
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .insert([{ id: user.id, role: 'admin', full_name: fullName || 'Admin', phone: phone || '' }]);
    if (profileErr) throw profileErr;
    console.log('Inserted profile:', profile);
    console.log('Done. You can now login with', email);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

main();
