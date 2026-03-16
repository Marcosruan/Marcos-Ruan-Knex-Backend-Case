import { db } from "../../db";
import { orders, order_items } from "../../db/schema/orders-schema"; 
import { products } from "../../db/schema/products-schema";
import { inArray, eq } from "drizzle-orm";
import type { CreateOrderInput } from "./orders-interfaces";
import { AppError } from "../../utils/app-error";

export class OrdersRepository {
    constructor(private orm: typeof db) {}
    async createOrder({ userId, items }: CreateOrderInput) {

      return await this.orm.transaction(async (tx) => {
        //extrai os IDs dos produtos enviados no pedido
        const productIds = items.map(i => i.productId);
        //busca no banco todos os produtos cujos IDs estão no pedido
        const dbProducts = await tx
          .select()
          .from(products)
          .where(inArray(products.id, productIds));
        
        if (dbProducts.length !== productIds.length) {
          throw new AppError("Some products were not found", 404);
        }

        let totalPrice = 0;
        //prepara os dados dos itens do pedido e calcula o preço total
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
        // insere o pedido no banco
        const result = await tx.insert(orders).values({
          user_id: userId,
          total_price: totalPrice,
          status: "PENDING",
        }).returning();

        const newOrder = result[0]
        //garante que o pedido foi criado corretamente
        if (!newOrder){
          throw new AppError("Failed to create order", 500);
        }
        //associa os produtos ao pedido criado
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