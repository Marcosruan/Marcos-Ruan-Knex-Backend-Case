import type { FastifyRequest, FastifyReply } from "fastify";
import type { AuthUser, ProductDTO } from "./products-interfaces";
import { bodySchema } from "./products-interfaces";
import { ProductsService } from "./products-service";

export class ProductsController {
  constructor(private service: ProductsService) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data: ProductDTO = bodySchema.parse(request.body);

    const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};

    const product = await this.service.execute(data, user);

    return reply.code(201).send(product);
  }
}
