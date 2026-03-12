"use server";

import db from "@/db";
import { table } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTables() {
    return await db.select().from(table).orderBy(table.createdAt);
}

export async function getTable(id: number) {
    const result = await db.select().from(table).where(eq(table.id, id));
    return result[0];
}

export async function createTable(data: { name: string }) {
    await db.insert(table).values({
        name: data.name,
    });
    revalidatePath("/admin/tables");
}

export async function updateTable(id: number, data: { name: string }) {
    await db.update(table).set({
        name: data.name,
        updatedAt: new Date(),
    }).where(eq(table.id, id));
    revalidatePath("/admin/tables");
}

export async function deleteTable(id: number) {
    await db.delete(table).where(eq(table.id, id));
    revalidatePath("/admin/tables");
}
