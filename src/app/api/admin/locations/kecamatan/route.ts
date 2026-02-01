import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const kabupaten = url.searchParams.get("kabupaten");

    const rows: { kecamatan: string | null }[] = kabupaten
      ? await prisma.$queryRaw`
          SELECT DISTINCT kecamatan FROM pendaftar WHERE kabupaten = ${kabupaten} AND kecamatan IS NOT NULL ORDER BY kecamatan
        `
      : await prisma.$queryRaw`
          SELECT DISTINCT kecamatan FROM pendaftar WHERE kecamatan IS NOT NULL ORDER BY kecamatan
        `;

    const data = rows.map((r) => r.kecamatan as string).filter(Boolean);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching kecamatan:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
