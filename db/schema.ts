import { pgTable, serial, varchar, integer, text, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    password: varchar("password", { length: 255 }),
    number: varchar("number", { length: 15 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const dish = pgTable("dish", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    description: text("description"),
    // addons: jsonb("addons").array(),
    imageUrl: varchar("image_url", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const table = pgTable("table", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const dishCategory = pgTable("dish_category", {
    id: serial("id").primaryKey(),
    dishId: integer("dish_id").notNull().references(() => dish.id),
    categoryId: integer("category_id").notNull().references(() => category.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderStatus = pgEnum("order_status", ["pending", "completed", "cancelled"]);

export const order = pgTable("order", {
    id: serial("id").primaryKey(),
    tableId: integer("table_id").notNull().references(() => table.id),
    userId: integer("user_id").references(() => user.id),
    totalPricing: integer("total_pricing").notNull(),
    status: orderStatus("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItem = pgTable("order_item", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => order.id),
    dishId: integer("dish_id").notNull().references(() => dish.id),
    pricing: integer("pricing").notNull(),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});