import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { products} from './products-schema.js'
import { users } from './users-schema.js'

export const companies = pgTable("companies", (t) => ({
  cnpj: t.varchar("cnpj", { length: 14 }).primaryKey(),
  name: t.varchar("name", { length: 255 }).notNull(),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
}));

export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
  products: many(products),
}));