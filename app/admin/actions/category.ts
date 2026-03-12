"use server";

import db from "@/db";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    return await db.select().from(category).orderBy(category.createdAt);
}

export async function getCategory(id: number) {
    const result = await db.select().from(category).where(eq(category.id, id));
    return result[0];
}

export async function createCategory(data: { name: string }) {
    await db.insert(category).values({
        name: data.name,
    });
    revalidatePath("/admin/categories");
}

export async function updateCategory(id: number, data: { name: string }) {
    await db.update(category).set({
        name: data.name,
        updatedAt: new Date(),
    }).where(eq(category.id, id));
    revalidatePath("/admin/categories");
}

export async function deleteCategory(id: number) {
    await db.delete(category).where(eq(category.id, id));
    revalidatePath("/admin/categories");
}
