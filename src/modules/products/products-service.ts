import type { ProductDTO, IProductService, AuthUser } from "./products-interfaces";
import { ProductsRepository } from "./products-repository";
import { AppError } from "../../utils/app-error.js";

export class ProductsService implements IProductService {
    constructor(private repository: ProductsRepository) {}

    async execute(data: ProductDTO, user: AuthUser) {

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
}
