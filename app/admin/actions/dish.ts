"use server";

import db from "@/db";
import { dish, dishCategory } from "@/db/schema";
import { eq, inArray, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getDishes(searchQuery?: string) {
    if (searchQuery && searchQuery.trim() !== "") {
        return await db.select().from(dish).where(ilike(dish.name, `%${searchQuery}%`)).orderBy(dish.createdAt);
    }
    return await db.select().from(dish).orderBy(dish.createdAt);
}

export async function getDish(id: number) {
    const result = await db.select().from(dish).where(eq(dish.id, id));
    const dishData = result[0];

    if (!dishData) return null;

    const categories = await db
        .select({ categoryId: dishCategory.categoryId })
        .from(dishCategory)
        .where(eq(dishCategory.dishId, id));

    return {
        ...dishData,
        categoryIds: categories.map(c => c.categoryId)
    };
}

export async function createDish(data: { name: string; price: number; description: string; imageUrl: string; categoryIds: number[] }) {
    const [newDish] = await db.insert(dish).values({
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
    }).returning({ id: dish.id });

    if (data.categoryIds.length > 0) {
        await db.insert(dishCategory).values(
            data.categoryIds.map(cid => ({
                dishId: newDish.id,
                categoryId: cid
            }))
        );
    }

    revalidatePath("/admin/dishes");
}

export async function updateDish(id: number, data: { name: string; price: number; description: string; imageUrl: string; categoryIds: number[] }) {
    await db.update(dish).set({
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        updatedAt: new Date(),
    }).where(eq(dish.id, id));

    await db.delete(dishCategory).where(eq(dishCategory.dishId, id));

    if (data.categoryIds.length > 0) {
        await db.insert(dishCategory).values(
            data.categoryIds.map(cid => ({
                dishId: id,
                categoryId: cid
            }))
        );
    }

    revalidatePath("/admin/dishes");
}

export async function deleteDish(id: number) {
    await db.delete(dishCategory).where(eq(dishCategory.dishId, id));
    await db.delete(dish).where(eq(dish.id, id));
    revalidatePath("/admin/dishes");
}
