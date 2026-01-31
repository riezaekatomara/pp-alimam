import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check admin authorization
    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Fetch all tahun ajaran, ordered by most recent first
    const { data, error } = await supabase
      .from("tahun_ajaran")
      .select("id, nama, tahun_mulai, tahun_selesai, is_active")
      .order("tahun_mulai", { ascending: false });

    if (error) {
      console.error("Error fetching tahun ajaran:", error);
      return NextResponse.json(
        { error: "Failed to fetch tahun ajaran" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Tahun ajaran API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
