import type { FastifyReply, FastifyRequest } from "fastify";
import { OrdersService } from "./orders-service";
import { bodySchemaAdd } from "./orders-interfaces";

export class OrdersController {
    constructor(private service: OrdersService) {}

    async add(request: FastifyRequest, reply: FastifyReply){
        const  { items } = bodySchemaAdd.parse(request.body);

        const userId = request.user.sub;
    
        const { order } = await this.service.addOrder({userId, items});
    
        return reply.status(201).send({ orderId: order.id, status: order.status });

    }

    // async list(reply: FastifyReply){
    //     const products = await this.service.listAll();
    
    //     return reply.code(200).send(products);
    // }
}