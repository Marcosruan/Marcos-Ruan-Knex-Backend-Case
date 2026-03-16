import type { FastifyRequest, FastifyReply } from "fastify";
import type { AuthUser, AddProductDTO, UpdateProductRequestDTO } from "./products-interfaces";
import { bodySchemaAdd, bodySchemaUpdate, bodySchemaDelete } from "./products-interfaces";
import { ProductsService } from "./products-service";

export class ProductsController {
  constructor(private service: ProductsService) {}

  async add(request: FastifyRequest, reply: FastifyReply) {
    const data: AddProductDTO = bodySchemaAdd.parse(request.body);

    const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};

    const product = await this.service.execute(data, user);

    return reply.code(201).send(product);
  }

  async list(reply: FastifyReply){
    const products = await this.service.listAll();

    return reply.code(200).send(products);
  }

  async listByCompany(request: FastifyRequest, reply: FastifyReply) {
    const { cnpj } = request.params as { cnpj: string };

    const products = await this.service.listProductsByCompany(cnpj);

    return reply.status(200).send(products);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const data: UpdateProductRequestDTO = bodySchemaUpdate.parse(request.body);

    const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};

    const productUpdated = await this.service.update(data, user);

    return reply.code(200).send(productUpdated);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const {id} = bodySchemaDelete.parse(request.body);

    const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};

    const productUpdated = await this.service.delete(id, user);

    return reply.code(200).send(productUpdated);
  }
}
