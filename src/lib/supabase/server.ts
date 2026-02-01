// Supabase Server Client
// Path: lib/supabase/server.ts
// For SERVER COMPONENTS & API ROUTES only!

import { createServerClient as createServerClientFromSSR } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ============================================
// 1️⃣ SERVER CLIENT (untuk Server Components)
// ============================================
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClientFromSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component, can't set cookies
          }
        },
      },
    }
  );
}

// ============================================
// 2️⃣ ALIAS createClient untuk backward compatibility
// ============================================
export const createClient = createServerSupabaseClient;

// ============================================
// 3️⃣ ADMIN CLIENT (untuk API Routes yang butuh bypass RLS)
// ============================================
export const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);