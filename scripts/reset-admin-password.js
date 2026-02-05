
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing ENV variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function resetPassword() {
    const email = "berkas@tes.com";
    const newPassword = "berkas123";

    console.log(`Resetting password for: ${email}...`);

    // 1. Get User ID
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    const user = users?.find(u => u.email === email);

    if (!user) {
        console.error("❌ User not found!");
        return;
    }

    // 2. Update Password
    const { data, error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
    );

    if (updateError) {
        console.error("❌ Failed to update password:", updateError.message);
    } else {
        console.log(`✅ Password successfully reset to: ${newPassword}`);
    }
}

resetPassword();
