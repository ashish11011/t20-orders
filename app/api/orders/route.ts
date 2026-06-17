import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/app/admin/actions/order";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    try {
        const { orders, totalPages, total } = await getOrders(page, limit);
        return NextResponse.json({ orders, totalPages, total });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
