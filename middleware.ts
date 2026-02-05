// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MIDDLEWARE: SIMPLE & AMAN 🛡️ 
// Sistem Auth dengan Sliding Session + Role-Based Protection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Path: middleware.ts (root project)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// ============================================
// ⚙️ KONFIGURASI SESSION
// ============================================
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 hari dalam detik (604800)
const SESSION_REFRESH_THRESHOLD = 24 * 60 * 60; // Refresh jika < 1 hari tersisa

// Helper function untuk parse session cookie
function getSessionFromCookie(request: NextRequest): {
  role: string | null;
  id: string | null;
} {
  const sessionCookie = request.cookies.get("app_session");

  if (!sessionCookie) {
    console.log("🍪 [Middleware] No app_session cookie found");
    return { role: null, id: null };
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    console.log(`🍪 [Middleware] Session found - Role: ${session.role}, ID: ${session.id}`);
    return {
      role: session.role || null,
      id: session.id || null,
    };
  } catch (e) {
    console.log(`❌ [Middleware] Failed to parse session cookie:`, e);
    return { role: null, id: null };
  }
}

// ============================================
// 🛡️ MIDDLEWARE FUNCTION
// ============================================
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // ============================================
  // 1️⃣ CREATE SUPABASE CLIENT
  // ============================================
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ============================================
  // 2️⃣ GET SESSION & USER
  // ============================================
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ============================================
  // 3️⃣ CHECK & REFRESH SESSION (SLIDING)
  // ============================================
  if (session && user) {
    try {
      const expiresAt = new Date(session.expires_at || 0).getTime();
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      // 🔄 AUTO-REFRESH: Jika session < 1 hari lagi
      if (timeUntilExpiry < SESSION_REFRESH_THRESHOLD * 1000) {
        console.log("🔄 Refreshing session (sliding window)...");

        const { data, error } = await supabase.auth.refreshSession();

        if (error) {
          console.error("❌ Session refresh failed:", error.message);
          await supabase.auth.signOut();
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set(
            "message",
            "Sesi Anda telah berakhir. Silakan login kembali."
          );
          return NextResponse.redirect(loginUrl);
        }

        if (data.session) {
          console.log("✅ Session refreshed successfully!");
        }
      }
    } catch (error) {
      console.error("❌ Session check error:", error);
    }
  }

  // ============================================
  // 4️⃣ GET USER METADATA (ROLE)
  // ============================================
  // Cek session dari cookie dulu
  const cookieSession = getSessionFromCookie(request);
  let userRole: string | null = cookieSession.role;

  // Jika tidak ada di cookie, cek dari Supabase user metadata
  if (!userRole && user && user.user_metadata) {
    userRole = user.user_metadata.role || null;
  }

  const { pathname } = request.nextUrl;
  console.log(`📍 [Middleware] Path: ${pathname}, Role: ${userRole || "null"}`);

  // ═══════════════════════════════════════════
  // PROTECT: /dashboard/pendaftar
  // ═══════════════════════════════════════════
  if (pathname.startsWith("/dashboard/pendaftar")) {
    if (!userRole || userRole !== "pendaftar") {
      console.log(`❌ [Protect] Access denied to /dashboard/pendaftar (role: ${userRole})`);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    console.log(`✅ [Protect] Access granted to /dashboard/pendaftar`);
  }

  // ═══════════════════════════════════════════
  // PROTECT: /dashboard/admin
  // ═══════════════════════════════════════════
  if (pathname.startsWith("/dashboard/admin")) {
    const allowedAdminRoles = ["admin_berkas", "admin_keuangan", "admin_super", "admin"]; // 'admin' kept for legacy safety
    if (!userRole || !allowedAdminRoles.includes(userRole)) {
      console.log(`❌ [Protect] Access denied to /dashboard/admin (role: ${userRole})`);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    console.log(`✅ [Protect] Access granted to /dashboard/admin`);
  }

  // ═══════════════════════════════════════════
  // PROTECT: /dashboard/penguji
  // ═══════════════════════════════════════════
  // ═══════════════════════════════════════════
  // PROTECT: /dashboard/penguji
  // ═══════════════════════════════════════════
  if (pathname.startsWith("/dashboard/penguji")) {
    if (!userRole || (userRole !== "penguji" && userRole !== "admin_super")) {
      console.log(`❌ [Protect] Access denied to /dashboard/penguji (role: ${userRole})`);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    console.log(`✅ [Protect] Access granted to /dashboard/penguji`);
  }

  // ═══════════════════════════════════════════
  // REDIRECT: /dashboard (root) based on role
  // ═══════════════════════════════════════════
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    console.log(`📍 [Middleware] At /dashboard, userRole: ${userRole}`);

    if (!userRole) {
      console.log(`❌ [Redirect] /dashboard → /login (no role)`);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect sesuai role
    if (userRole === "pendaftar") {
      console.log(`➡️ [Redirect] /dashboard → /dashboard/pendaftar`);
      return NextResponse.redirect(
        new URL("/dashboard/pendaftar", request.url)
      );
    } else if (["admin_berkas", "admin_keuangan", "admin_super", "admin"].includes(userRole)) {
      console.log(`➡️ [Redirect] /dashboard → /dashboard/admin`);
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "penguji") {
      console.log(`➡️ [Redirect] /dashboard → /dashboard/penguji`);
      return NextResponse.redirect(new URL("/dashboard/penguji", request.url));
    }

    // Role tidak dikenali, redirect ke login
    console.log(`❌ [Redirect] /dashboard → /login (role not recognized: ${userRole})`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ═══════════════════════════════════════════
  // REDIRECT: /login if already logged in
  // ═══════════════════════════════════════════
  if (pathname === "/login" && userRole) {
    // Redirect ke dashboard sesuai role
    if (userRole === "pendaftar") {
      return NextResponse.redirect(
        new URL("/dashboard/pendaftar", request.url)
      );
    } else if (["admin_berkas", "admin_keuangan", "admin_super", "admin"].includes(userRole)) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "penguji") {
      return NextResponse.redirect(new URL("/dashboard/penguji", request.url));
    }
  }

  // ═══════════════════════════════════════════
  // REDIRECT: /daftar if already logged in
  // ═══════════════════════════════════════════
  if (pathname.startsWith("/daftar") && userRole === "pendaftar") {
    return NextResponse.redirect(
      new URL("/dashboard/pendaftar", request.url)
    );
  }

  return response;
}

// ============================================
// ⚙️ MIDDLEWARE CONFIG
// ============================================
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
