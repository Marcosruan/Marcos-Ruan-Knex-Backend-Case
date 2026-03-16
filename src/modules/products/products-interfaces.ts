import { z } from "zod";
import type { ProductResponse } from "../../@types/responses";

export const bodySchemaAdd = z.object({
  name: z.string().max(255),
  price: z.number().int().positive(),
  company_cnpj: z.string().length(14),
});

export const bodySchemaUpdate = z.object({
  id: z.string(),
  name: z.string().max(255).optional(),
  price: z.number().int().positive().optional(),
});

export const bodySchemaDelete = z.object({
  id: z.string(),
});

export type AuthUser = {
  role: string
  company_cnpj: string
}

export type UpdateProductDTO = {
  name: string | undefined
  price: number | undefined
}

export type AddProductDTO = z.infer<typeof bodySchemaAdd>;

export type UpdateProductRequestDTO = z.infer<typeof bodySchemaUpdate>;

export interface IProductRepository {
  productTypeExists(data: AddProductDTO): Promise<ProductResponse | undefined>;
  addProduct(data: AddProductDTO): Promise<ProductResponse>;
  getAllProducts(): Promise<ProductResponse[] | undefined>;
  findById(id: string): Promise<ProductResponse | undefined>;
  updateProduct(id: string, data: UpdateProductDTO): Promise<ProductResponse | undefined>;
  deleteProduct(id: string): Promise<any>;
}

export interface IProductService {
  execute(data: AddProductDTO, user: AuthUser): Promise<ProductResponse>;
  listAll(): Promise<ProductResponse[] | undefined>;
  update(updateRequest: UpdateProductRequestDTO, user: AuthUser): Promise<ProductResponse | undefined>;
  delete(id: string, user: AuthUser): Promise<any>;
}