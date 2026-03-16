import { z } from "zod";

export const bodySchemaAdd = z.object({
    items: z.array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
      })).min(1),
});

export type CreateOrderDTO = z.infer<typeof bodySchemaAdd>;

export type CreateOrderRequest = {
  userId: string;
  items: { productId: string; quantity: number }[];
};

export type AuthUserOrder = {
  userId: string
  role: string
  company_cnpj: string
}

export type CreateOrderInput = {
  userId: string;
  items: { productId: string; quantity: number }[];
};

export const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "CANCELLED", "REFUNDED"])
});

export const updateStatusParamsSchema = z.object({
  id: z.string().uuid()
});

export type UpdateOrderStatusInput = {
  orderId: string;
  status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";
};