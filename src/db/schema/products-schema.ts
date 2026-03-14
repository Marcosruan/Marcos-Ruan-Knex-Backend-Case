import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core";
import { companies } from "./companies-schema.js";
import { order_items } from "./orders-schema.js";

export const products = pgTable("products", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.varchar("name", { length: 255 }).notNull(),
  price: t.numeric("price", { precision: 10, scale: 2 }).notNull(),
  company_cnpj: t.varchar("company_cnpj", { length: 14 }).references(() => companies.cnpj).notNull(),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
}));

export const productRelations = relations(products, ({ one, many }) => ({
  company: one(companies, {
    fields: [products.company_cnpj],
    references: [companies.cnpj],
  }),

  orderItems: many(order_items),
}));