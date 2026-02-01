import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user role from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch statistics from pendaftar table
    const { data: pendaftarData, error: pendaftarError } = await supabase
      .from("pendaftar")
      .select("status_proses");

    if (pendaftarError) {
      console.error("Error fetching pendaftar:", pendaftarError);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    // Calculate statistics
    const total_pendaftar = pendaftarData?.length || 0;

    const statusCounts = (pendaftarData || []).reduce(
      (acc: Record<string, number>, item: { status_proses: string }) => {
        acc[item.status_proses] = (acc[item.status_proses] || 0) + 1;
        return acc;
      },
      {}
    );

    // Map status to stats
    const stats = {
      total_pendaftar,
      pending_verification:
        (statusCounts.data_completed || 0) + (statusCounts.docs_uploaded || 0),
      verified: statusCounts.docs_verified || 0,
      rejected: statusCounts.rejected || 0,
      pending_payment:
        (statusCounts.draft || 0) + (statusCounts.awaiting_payment || 0),
      paid: statusCounts.paid || 0,
      scheduled_exams: statusCounts.scheduled || 0,
      announced: statusCounts.announced || 0,
      accepted: statusCounts.accepted || 0,
      enrolled: statusCounts.enrolled || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error in admin stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
