import type { FastifyReply, FastifyRequest } from "fastify";
import { OrdersService } from "./orders-service";
import { bodySchemaAdd, updateStatusParamsSchema, updateStatusSchema, type AuthUserOrder } from "./orders-interfaces";

export class OrdersController {
    constructor(private service: OrdersService) {}

    async add(request: FastifyRequest, reply: FastifyReply){
        const  { items } = bodySchemaAdd.parse(request.body);

        const userId = request.user.sub;
    
        const { order } = await this.service.addOrder({userId, items});
    
        return reply.status(201).send({ orderId: order.id, status: order.status });

    }

    async updateStatus(request: FastifyRequest, reply: FastifyReply) {
        const { id } = updateStatusParamsSchema.parse(request.params);
        
        const { status } = updateStatusSchema.parse(request.body);

        const user: AuthUserOrder = {...request.user, userId: request.user.sub};

        const { updatedOrder } = await this.service.updateStatus({orderId: id, status}, user);

        return reply.status(200).send({orderId: updatedOrder.id, newStatus: updatedOrder.status});
    }
}
