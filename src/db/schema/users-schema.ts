import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies-schema";

export const userRole = pgEnum("user_roles", ["CUSTOMER", "SELLER"]);

export const users = pgTable("users", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.varchar("name", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  password: t.varchar("password", { length: 255 }).notNull(),
  role: userRole("role").notNull().default("CUSTOMER"),
  company_cnpj: t.varchar("company_cnpj", { length: 14 }).references(() => companies.cnpj),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
}));
