import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check admin authorization
    const authorized = await isAdmin(supabase);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { ids, status_proses } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "IDs array is required" },
        { status: 400 }
      );
    }

    if (!status_proses) {
      return NextResponse.json(
        { error: "status_proses is required" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = [
      "draft",
      "awaiting_payment",
      "paid",
      "data_completed",
      "docs_uploaded",
      "docs_verified",
      "scheduled",
      "tested",
      "announced",
      "accepted",
      "rejected",
      "enrolled",
    ];

    if (!validStatuses.includes(status_proses)) {
      return NextResponse.json(
        { error: "Invalid status_proses" },
        { status: 400 }
      );
    }

    // Bulk update
    const { data, error } = await supabase
      .from("pendaftar")
      .update({ status_proses, updated_at: new Date().toISOString() })
      .in("id", ids)
      .select();

    if (error) {
      console.error("Error bulk updating:", error);
      return NextResponse.json(
        { error: "Failed to update pendaftar" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      updated_count: data.length,
      data,
    });
  } catch (error) {
    console.error("Bulk update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
