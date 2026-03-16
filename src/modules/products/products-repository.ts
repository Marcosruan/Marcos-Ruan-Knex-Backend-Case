import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { products } from "../../db/schema/products-schema.js"
import type { IProductRepository, AddProductDTO, UpdateProductDTO } from "./products-interfaces.js";

export class ProductsRepository implements IProductRepository {
  	constructor(private orm: typeof db) {}

	async addProduct(data: AddProductDTO) {
    	const [product] = await this.orm.insert(products)
    		.values(data).returning();
    	return product!;
  	}

  	async productTypeExists(data: AddProductDTO) {
    	return await this.orm.query.products.findFirst({
    	where: (products, { eq, and }) => 
		and(eq(products.name, data.name), eq(products.company_cnpj, data.company_cnpj))});
	}

	async getAllProducts() {
  		return await this.orm.query.products.findMany();
	}

	async getProductsByCompany(cnpj: string) {
		const productsList = await this.orm
		.select()
		.from(products)
		.where(eq(products.company_cnpj, cnpj));

		return productsList;
	}

	async findById(id: string){
    	return await this.orm.query.products.findFirst({
    	where: (products, { eq }) => eq(products.id, id)});
	}

	async updateProduct(id: string, data: UpdateProductDTO) {
  		const [updatedProduct] = await this.orm.update(products).set(data).where(eq(products.id, id)).returning();

  		return updatedProduct;
	}

	async deleteProduct(id: string) {
  		await this.orm.delete(products).where(eq(products.id, id));
	}
}
