import { db } from "../../db";
import { orders, order_items } from "../../db/schema/orders-schema"; 
import { products } from "../../db/schema/products-schema";
import { inArray } from "drizzle-orm";
import type { CreateOrderInput } from "./orders-interfaces";

export class OrdersRepository {
    constructor(private orm: typeof db) {}
    async createOrder({ userId, items }: CreateOrderInput) {
      return await this.orm.transaction(async (tx) => {
        const productIds = items.map(i => i.productId);
        const dbProducts = await tx
          .select()
          .from(products)
          .where(inArray(products.id, productIds));

        let totalPrice = 0;
        const orderItemsData = items.map(item => {
          const product = dbProducts.find(p => p.id === item.productId);
          if (!product) throw new Error(`Product ${item.productId} not found`);

          const subtotal = product.price * item.quantity;
          totalPrice += subtotal;

          return {
            productId: item.productId,
            price: product.price,
            quantity: item.quantity,
          };
        });

        const [newOrder] = await tx.insert(orders).values({
          user_id: userId,
          total_price: totalPrice,
          status: "PENDING",
        }).returning();

        await tx.insert(order_items).values(
          orderItemsData.map(item => ({
            order_id: newOrder.id,
            product_id: item.productId,
            price: item.price,
            quantity: item.quantity,
          }))
        );

        return newOrder;
      });
    }
}