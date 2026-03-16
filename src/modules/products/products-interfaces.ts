import { z } from "zod";
import type { ProductResponse } from "../../@types/responses";

export const bodySchema = z.object({
  name: z.string().max(255),
  price: z.number().int().positive(),
  company_cnpj: z.string().length(14),
});

export type AuthUser = {
  role: string
  company_cnpj: string
}

export type ProductDTO = z.infer<typeof bodySchema>;

export interface IProductRepository {
  productTypeExists(data: ProductDTO): Promise<ProductResponse | undefined>;
  addProduct(data: ProductDTO): Promise<ProductResponse>;
  getAllProducts(): Promise<ProductResponse | undefined>
}

export interface IProductService {
  execute(data: ProductDTO, user: AuthUser): Promise<ProductResponse>;
}