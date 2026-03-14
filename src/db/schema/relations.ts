import { companies } from "./companies-schema";
import { order_items } from "./orders-schema";
import { orders } from "./orders-schema";
import { products} from './products-schema';
import { relations } from "drizzle-orm";
import { users } from './users-schema';

export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
  products: many(products),
}));

export const productRelations = relations(products, ({ one, many }) => ({
  company: one(companies, {
    fields: [products.company_cnpj],
    references: [companies.cnpj],
  }),

  orderItems: many(order_items),
}));

export const orderRelations = relations(orders, ({ many, one }) => ({
  items: many(order_items),

  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
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

export const userRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.company_cnpj],
    references: [companies.cnpj],
  }),

  order: many(orders),
}));
