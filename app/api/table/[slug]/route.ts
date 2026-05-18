import db from "@/db";
import { table } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { tableCode } = await request.json();
    const [res] = await db.select().from(table).where(eq(table.tableCode, tableCode));
    if (!res) return Response.json(false);
    return NextResponse.json(true);
}