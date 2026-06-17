import { NextRequest, NextResponse } from "next/server";
import { getTables } from "@/app/admin/actions/table";

export async function GET(request: NextRequest) {
    try {
        const tables = await getTables();
        return NextResponse.json(tables);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 });
    }
}
