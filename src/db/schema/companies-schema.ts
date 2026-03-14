import { pgTable } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", (t) => ({
  cnpj: t.varchar("cnpj", { length: 14 }).primaryKey(),
  name: t.varchar("name", { length: 255 }).notNull(),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
}));
