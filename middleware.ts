// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MIDDLEWARE: SIMPLE & AMAN 🛡️ (FIXED)
// Sistem Auth dengan Sliding Session + Auto Logout
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
  // 2️⃣ GET SESSION & USER (FIXED!)
  // ============================================
  // Get session dulu
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user dari session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ============================================
  // 3️⃣ CHECK & REFRESH SESSION (SLIDING)
  // ============================================
  if (session && user) {
    try {
      // Cek expiry time
      const expiresAt = new Date(session.expires_at || 0).getTime();
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      // 🔄 AUTO-REFRESH: Jika session < 1 hari lagi
      // Ini membuat session "sliding" - perpanjang otomatis
      if (timeUntilExpiry < SESSION_REFRESH_THRESHOLD * 1000) {
        console.log("🔄 Refreshing session (sliding window)...");

        const { data, error } = await supabase.auth.refreshSession();

        if (error) {
          console.error("❌ Session refresh failed:", error.message);
          // Jika gagal refresh, logout user
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
  // 4️⃣ ROUTE PROTECTION
  // ============================================

  // 🔒 Protected routes - require authentication
  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    // User belum login, redirect ke login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    loginUrl.searchParams.set("message", "Silakan login terlebih dahulu");
    return NextResponse.redirect(loginUrl);
  }

  // 🚪 Auth routes - redirect to dashboard if already logged in
  const authPaths = ["/login", "/daftar"];
  const isAuthPath = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPath && user) {
    // User sudah login, redirect ke dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

// ============================================
// ⚙️ MIDDLEWARE CONFIG
// ============================================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (images, etc)
     * - api routes (protected internally)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// ============================================
// 📖 CARA KERJA SLIDING SESSION:
// ============================================
//
// 1. User login → Session berlaku 7 hari
// 2. Setiap user akses dashboard:
//    - Middleware cek: "Apakah session < 1 hari lagi expired?"
//    - Jika YA → Refresh session (perpanjang 7 hari lagi)
//    - Jika TIDAK → Biarkan saja
// 3. Hasilnya:
//    - User aktif setiap hari = Tidak pernah logout!
//    - User tidak aktif 7 hari = Logout otomatis
//
// Contoh Timeline:
// ┌────────────────────────────────────────────┐
// │ Hari 1: Login → Session valid s/d Hari 8  │
// │ Hari 6: Akses → Session diperpanjang!     │
// │         Session valid s/d Hari 13         │
// │ Hari 10: Akses → Session diperpanjang!    │
// │          Session valid s/d Hari 17        │
// └────────────────────────────────────────────┘
