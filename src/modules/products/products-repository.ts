import { db } from "../../db/index.js";
import { products } from "../../db/schema/products-schema.js"
import type { IProductRepository, ProductDTO } from "./products-interfaces.js";

export class ProductsRepository implements IProductRepository {
  	constructor(private orm: typeof db) {}

	async addProduct(data: ProductDTO) {
    	const [product] = await this.orm.insert(products)
    		.values(data).returning();
    	return product!;
  	}

  	async productTypeExists(data: ProductDTO) {
    	return await this.orm.query.products.findFirst({
    	where: (products, { eq, and }) => and(eq(products.name, data.name), eq(products.company_cnpj, data.company_cnpj))});
	}
}
