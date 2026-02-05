
const { createClient } = require('@supabase/supabase-js');

// Hardcode keys for script usage to avoid dotenv complexity if needed, 
// OR just rely on process.env being loaded if executed via a runner that loads it.
// Here we will try to load dotenv.
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing ENV variables. Make sure .env.local exists.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUser() {
    const email = "berkas@tes.com";
    console.log(`Checking user: ${email}...`);

    // 1. Check Auth User
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error("❌ Auth Error:", error.message);
        return;
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        console.log("❌ User NOT FOUND in Auth users list.");
    } else {
        console.log(`✅ User FOUND in Auth: ${user.id}`);
        console.log(`   Confirmed: ${user.email_confirmed_at}`);
        console.log(`   Metadata:`, user.user_metadata);
    }

    // 2. Check Profile
    if (user) {
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (profileError) {
            console.log("❌ Profile fetch error:", profileError.message);
        } else if (!profile) {
            console.log("❌ Profile NOT FOUND in 'profiles' table.");
        } else {
            console.log("✅ Profile FOUND:", profile);
        }
    }
}

checkUser();
