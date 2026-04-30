import db from "@/db";
import { dish, dishCategory, orderItem } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const id = parseInt(params.id);
        
        // check if dish is referenced in orderItem
        const orderItems = await db.select().from(orderItem).where(eq(orderItem.dishId, id));
        if (orderItems.length > 0) {
            return NextResponse.json({ error: "Cannot delete dish because it has orders associated with it." }, { status: 400 });
        }

        await db.delete(dishCategory).where(eq(dishCategory.dishId, id));
        await db.delete(dish).where(eq(dish.id, id));
        
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete dish" }, { status: 500 });
    }
}
