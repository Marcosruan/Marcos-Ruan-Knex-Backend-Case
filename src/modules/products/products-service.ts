import type { AddProductDTO, IProductService, AuthUser, UpdateProductDTO, UpdateProductRequestDTO } from "./products-interfaces";
import { ProductsRepository } from "./products-repository";
import { AppError } from "../../utils/app-error.js";

export class ProductsService implements IProductService {
    constructor(private repository: ProductsRepository) {}

    async execute(data: AddProductDTO, user: AuthUser) {

        if (user.role !== "SALESPERSON" || user.company_cnpj !== data.company_cnpj){
            throw new AppError("Forbidden: only salespeople can register products for their own company", 403);
        }

        const productExists = await this.repository.productTypeExists(data);

        if (productExists) {
            throw new AppError("Resource colision: The product may already exist", 409);
        }

        const product = await this.repository.addProduct(data);

        return product;
    }

    async listAll() {
        const products = await this.repository.getAllProducts();

        if (!products){
            throw new AppError("No content: no products registered", 404);
        }

        return products; 
    }

    async update(updateRequest: UpdateProductRequestDTO, user: AuthUser) {
        const product = await this.repository.findById(updateRequest.id);

        if (!product) {
          throw new AppError("Product not found", 404);
        }

        if (user.role !== "SALESPERSON" || product.company_cnpj !== user.company_cnpj) {
          throw new AppError("Forbidden: You don't have permission to edit this product", 403);
        }

        const data: UpdateProductDTO = {name: updateRequest.name, price: updateRequest.price};

        return await this.repository.updateProduct(updateRequest.id, data);
    }
    
    async delete(id: string, user: AuthUser) {
        const product = await this.repository.findById(id);
    
        if (!product) {
          throw new AppError("Product not found", 404);
        }
        
        if (user.role !== "SALESPERSON" || product.company_cnpj !== user.company_cnpj) {
          throw new AppError("Forbidden: You don't have permission to delete this product", 403);
        }

        return await this.repository.deleteProduct(id);
    }
}
