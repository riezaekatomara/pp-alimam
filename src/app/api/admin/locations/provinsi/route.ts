import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows: { provinsi: string | null }[] = await prisma.$queryRaw`
      SELECT DISTINCT provinsi FROM pendaftar WHERE provinsi IS NOT NULL ORDER BY provinsi
    `;
    const data = rows.map((r) => r.provinsi as string).filter(Boolean);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching provinsi:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
