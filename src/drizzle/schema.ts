import { pgTable, pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRoles", ["CUSTOMER", "SELLER"]);
export const orderStatus = pgEnum("order_status", ["PENDING", "PAID", "CANCELLED", "REFUNDED"]);

export const user = pgTable("user", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.varchar("name", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  password: t.varchar("password", { length: 255 }).notNull(),
  role: userRole("userRole").notNull().default("CUSTOMER"),
  company_cnpj: t.varchar("company_cnpj", { length: 14 }).references(() => company.cnpj),
}));

export const company = pgTable("company", (t) => ({
  cnpj: t.varchar("cnpj", { length: 14 }).primaryKey(),
  name: t.varchar("name", { length: 255 }).notNull(),
}));

export const product = pgTable("product", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.varchar("name", { length: 255 }).notNull(),
  price: t.numeric("price", { precision: 10, scale: 2 }),
  owner: t.varchar("owner", { length: 255 }).references(() => company.cnpj).notNull(),
}));

export const order = pgTable("order", (t) => ({
	id: t.uuid("id").primaryKey().notNull().defaultRandom(),
	user_id: t.uuid("user_id").notNull().references(() => user.id),
	status: orderStatus("status").notNull().default("PENDING"),
	total_price: t.numeric("price", { precision: 10, scale: 2 }).notNull(),
	created_at: t.timestamp("created_at").defaultNow().notNull(),
  })
);

export const order_item = pgTable("order_item", (t) => ({
	id: t.uuid("id").primaryKey().notNull().defaultRandom(),
  order_id: t.uuid("order_id").notNull().references(() => order.id),
  product_id: t.uuid("product_id").notNull().references(() => product.id),
	price: t.numeric("price", { precision: 10, scale: 2 }).notNull(),
	quantity: t.integer("quantity").notNull(),
  })
);
