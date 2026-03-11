import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

export const deputados = pgTable("deputados", {
  id: serial("id").primaryKey(),
  nome: text("nome"),
  uf: text("uf")
})