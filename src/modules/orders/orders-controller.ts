import type { FastifyReply, FastifyRequest } from "fastify";
import { OrdersService } from "./orders-service";
import { bodySchemaAdd } from "./orders-interfaces";

export class OrdersController {
    constructor(private service: OrdersService) {}

    async add(request: FastifyRequest, reply: FastifyReply){
        const { userId, items } = bodySchemaAdd.parse(request.body);
    
        const { order } = await this.service.addOrder({userId,items});
    
        return reply.status(201).send({ orderId: order.id, status: order.status });

    }

    // async list(reply: FastifyReply){
    //     const products = await this.service.listAll();
    
    //     return reply.code(200).send(products);
    // }
    
    // async update(request: FastifyRequest, reply: FastifyReply) {
    //     const data: UpdateProductRequestDTO = bodySchemaUpdate.parse(request.body);
    
    //     const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};
    
    //     const productUpdated = await this.service.update(data, user);
    
    //     return reply.code(200).send(productUpdated);
    // }
    
    // async delete(request: FastifyRequest, reply: FastifyReply) {
    //     const {id} = bodySchemaDelete.parse(request.body);
    
    //     const user: AuthUser = {role: request.user.role, company_cnpj: request.user.company_cnpj};
    
    //     const productUpdated = await this.service.delete(id, user);
    
    //     return reply.code(200).send(productUpdated);
    // }
}