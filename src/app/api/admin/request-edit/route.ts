import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { request_id, action, admin_note } = body;

        if (!request_id || !action) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        let updateData: any = {
            admin_note: admin_note || undefined,
        };

        if (action === "approve_edit") {
            updateData.status = "approved_to_edit";
            updateData.approved_at = new Date();
        } else if (action === "reject") {
            updateData.status = "rejected";
            updateData.completed_at = new Date(); // Rejected is also a form of completion
        } else if (action === "finalize") {
            updateData.status = "completed";
            updateData.completed_at = new Date();
        } else {
            return NextResponse.json(
                { success: false, error: "Invalid action" },
                { status: 400 }
            );
        }

        const updatedRequest = await (prisma as any).dataPerubahanRequest.update({
            where: { id: request_id },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            data: updatedRequest,
        });
    } catch (error: any) {
        console.error("Error updating request:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
