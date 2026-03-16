import { pgTable } from "drizzle-orm/pg-core";
import { companies } from "./companies-schema";

export const products = pgTable("products", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.varchar("name", { length: 255 }).notNull(),
  price: t.integer('price').notNull(),
  company_cnpj: t.varchar("company_cnpj", { length: 14 }).references(() => companies.cnpj).notNull(),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
}));
