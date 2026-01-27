import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get cookie dari request (server-side bisa read httpOnly cookies!)
    const sessionCookie = request.cookies.get("app_session");

    if (!sessionCookie) {
      console.log("❌ [API /session] No app_session cookie found");
      return NextResponse.json(
        { session: null },
        { status: 401 }
      );
    }

    try {
      const session = JSON.parse(sessionCookie.value);
      console.log(`✅ [API /session] Session found - Role: ${session.role}`);
      return NextResponse.json({ session });
    } catch (e) {
      console.log("❌ [API /session] Failed to parse session cookie");
      return NextResponse.json(
        { session: null },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("❌ [API /session] Error:", error);
    return NextResponse.json(
      { session: null },
      { status: 500 }
    );
  }
}
