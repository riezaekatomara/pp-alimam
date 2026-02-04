import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma"; // Adjust path if necessary

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pendaftar_id = searchParams.get("pendaftar_id");

        if (!pendaftar_id) {
            return NextResponse.json(
                { success: false, error: "Pendaftar ID is required" },
                { status: 400 }
            );
        }

        // Get the latest ACTIVE request (not completed or rejected)
        const latestRequest = await (prisma as any).dataPerubahanRequest.findFirst({
            where: {
                pendaftar_id: pendaftar_id,
                status: {
                    in: ["pending", "approved_to_edit", "submitted"],
                },
            },
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json({
            success: true,
            data: latestRequest,
        });
    } catch (error: any) {
        console.error("Error fetching request:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pendaftar_id, reason } = body;

        if (!pendaftar_id || !reason) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if there is already an active request
        const existingRequest = await (prisma as any).dataPerubahanRequest.findFirst({
            where: {
                pendaftar_id: pendaftar_id,
                status: {
                    in: ["pending", "approved_to_edit", "submitted"],
                },
            },
        });

        if (existingRequest) {
            return NextResponse.json(
                { success: false, error: "Masih ada permintaan perubahan data yang sedang diproses." },
                { status: 400 }
            );
        }

        // Create new request
        const newRequest = await (prisma as any).dataPerubahanRequest.create({
            data: {
                pendaftar_id,
                reason,
                status: "pending",
            },
        });

        return NextResponse.json({
            success: true,
            data: newRequest,
        });
    } catch (error: any) {
        console.error("Error creating request:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
