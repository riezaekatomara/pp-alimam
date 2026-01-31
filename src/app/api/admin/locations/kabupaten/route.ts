import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const provinsi = url.searchParams.get("provinsi");

    const rows: { kabupaten: string | null }[] = provinsi
      ? await prisma.$queryRaw`
          SELECT DISTINCT kabupaten FROM pendaftar WHERE provinsi = ${provinsi} AND kabupaten IS NOT NULL ORDER BY kabupaten
        `
      : await prisma.$queryRaw`
          SELECT DISTINCT kabupaten FROM pendaftar WHERE kabupaten IS NOT NULL ORDER BY kabupaten
        `;

    const data = rows.map((r) => r.kabupaten as string).filter(Boolean);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching kabupaten:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
