import { NextResponse } from "next/server";
import { createServerSupabaseClient, supabaseAdmin } from "@/lib/supabase/server";
import { UserRole } from "@/lib/access-control";

import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";

// Helper to check if user is admin_super
async function checkSuperAdmin() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // 1. If standard Supabase Auth works, verify profile
    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin_super" && profile?.role !== "admin") return null;
        return user;
    }

    // 2. Fallback: Check app_session cookie (Used by our custom login)
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie.value);
            // Allow admin_super and legacy admin
            if (session.role === 'admin_super' || session.role === 'admin') {
                // Return a mock user object with minimal required fields
                return {
                    id: session.id,
                    email: "session@internal",
                    role: session.role
                } as unknown as User;
            }
        } catch (e) {
            console.error("Session parse error", e);
        }
    }

    return null;
}

// GET: List all admin/staff users
export async function GET() {
    const admin = await checkSuperAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        // Get profiles where role is NOT pendaftar
        const { data: profiles, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .in("role", ["admin_berkas", "admin_keuangan", "penguji", "admin_super", "admin"])
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json({ data: profiles });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create new user
export async function POST(request: Request) {
    const admin = await checkSuperAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const body = await request.json();
        console.log("Creating user payload:", body);
        const { email, password, full_name, role } = body;

        if (!email || !password || !full_name || !role) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        // 1. Create user in Supabase Auth
        // Strategy: Try with full metadata. If fails, try minimal.
        let authData, authError;

        console.log("Attempting createUser with full metadata...");
        const resultFull = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                role,
                full_name,
                nama_lengkap: full_name // Legacy support
            },
        });

        if (resultFull.error) {
            // Check if error is "Email already registered"
            if (resultFull.error.message?.includes("already been registered")) {
                console.log("User already exists. Checking for orphan profile...");

                // 1. Get the existing user
                const { data: existingUser, error: findError } = await supabaseAdmin
                    .from("profiles") // Check public profile first
                    .select("id")
                    .eq("email", email)
                    .single();

                if (existingUser) {
                    return NextResponse.json({ error: "User dengan email ini sudah terdaftar." }, { status: 400 });
                }

                // If profile missing, but auth exists -> Recover!
                // We need the User ID from Auth
                // Note: Admin getUser by email is not directly available in JS lib easily without listed users, 
                // but we can try to "dummy sign in" or list users. filtering.
                const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
                const foundAuthUser = users?.find(u => u.email === email);

                if (foundAuthUser) {
                    console.log("Found orphan auth user. Recovery: Creating profile...", foundAuthUser.id);
                    authData = { user: foundAuthUser };
                    authError = null;
                } else {
                    // Start fresh if weirdly not found
                    console.error("Auth said registered but cannot find user?", resultFull.error);
                    throw resultFull.error;
                }
            } else {
                console.error("createUser full metadata failed:", resultFull.error);

                // Should we try fallback? Only if error suggests trigger failure?
                // Let's try minimal metadata just in case trigger chokes on extra fields
                console.log("Retrying with minimal user_metadata...");
                const resultMinimal = await supabaseAdmin.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true,
                    user_metadata: { role }, // Only role
                });

                authData = resultMinimal.data;
                authError = resultMinimal.error;
            }
        } else {
            authData = resultFull.data;
            authError = resultFull.error;
        }

        if (authError) {
            console.error("Final createUser error:", authError);
            throw authError;
        }

        if (!authData.user) throw new Error("Gagal membuat user (No user data)");

        console.log("User created/recovered successfully:", authData.user.id);

        // 2. Ensure Profile Exists & is Updated
        // We use Upsert to handle both cases (Trigger created it OR Trigger didn't)
        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .upsert({
                id: authData.user.id,
                email,
                full_name,
                role,
                updated_at: new Date().toISOString(),
            });

        if (profileError) {
            console.error("Profile upsert error:", profileError);
            throw profileError;
        }

        return NextResponse.json({ success: true, user: authData.user });
    } catch (error: any) {
        console.error("POST /api/admin/users ERROR:", error);
        return NextResponse.json({
            error: error.message || "Database error",
            details: error
        }, { status: 500 });
    }
}

// PUT: Update user (Reset Password or Change Role)
export async function PUT(request: Request) {
    const admin = await checkSuperAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id, password, role, full_name } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "ID User diperlukan" }, { status: 400 });
        }

        // 1. Update Auth (Password/Metadata)
        const updateData: any = {
            user_metadata: {},
        };
        if (password) updateData.password = password;
        if (role) updateData.user_metadata.role = role;
        if (full_name) updateData.user_metadata.full_name = full_name;

        const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
            id,
            updateData
        );

        if (authError) throw authError;

        // 2. Update Profile
        const profileUpdate: any = {};
        if (role) profileUpdate.role = role;
        if (full_name) profileUpdate.full_name = full_name;

        if (Object.keys(profileUpdate).length > 0) {
            const { error: profileError } = await supabaseAdmin
                .from("profiles")
                .update(profileUpdate)
                .eq("id", id);

            if (profileError) throw profileError;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete user
export async function DELETE(request: Request) {
    const admin = await checkSuperAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID User diperlukan" }, { status: 400 });
        }

        // Delete from Auth (Cascade to Profile usually, but let's be safe)
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
        if (authError) throw authError;

        // Profile should be deleted by cascade, but if not:
        await supabaseAdmin.from("profiles").delete().eq("id", id);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
