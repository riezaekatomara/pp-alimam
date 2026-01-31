import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const kecamatan = url.searchParams.get("kecamatan");

    const rows: { kelurahan: string | null }[] = kecamatan
      ? await prisma.$queryRaw`
          SELECT DISTINCT kelurahan FROM pendaftar WHERE kecamatan = ${kecamatan} AND kelurahan IS NOT NULL ORDER BY kelurahan
        `
      : await prisma.$queryRaw`
          SELECT DISTINCT kelurahan FROM pendaftar WHERE kelurahan IS NOT NULL ORDER BY kelurahan
        `;

    const data = rows.map((r) => r.kelurahan as string).filter(Boolean);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching kelurahan:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
