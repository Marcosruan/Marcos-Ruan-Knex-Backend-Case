import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { users } from './users-schema.js'
import { products } from './products-schema.js'

export const orderStatus = pgEnum("order_status", ["PENDING", "PAID", "CANCELLED", "REFUNDED"]);


export const orders = pgTable("orders", (t) => ({
	id: t.uuid("id").primaryKey().notNull().defaultRandom(),
	user_id: t.uuid("user_id").notNull().references(() => users.id),
	status: orderStatus("status").notNull().default("PENDING"),
	total_price: t.numeric("total_price", { precision: 10, scale: 2 }).notNull(),
	created_at: t.timestamp("created_at").defaultNow().notNull(),
  })
);

export const order_items = pgTable("order_items", (t) => ({
	id: t.uuid("id").primaryKey().notNull().defaultRandom(),
  order_id: t.uuid("order_id").notNull().references(() => orders.id),
  product_id: t.uuid("product_id").notNull().references(() => products.id),
	price: t.numeric("price", { precision: 10, scale: 2 }).notNull(),
	quantity: t.integer("quantity").notNull(),
  })
);

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(order_items),
}));

export const orderItemsRelations = relations(order_items, ({ one }) => ({
  orders: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),

  product: one(products, {
    fields: [order_items.product_id],
    references: [products.id],
  }),
}));
