import type { FastifyRequest, FastifyReply } from "fastify";
import { SigninService } from "../services/signin-service.js";
import type { CreateUserDTO } from "../interfaces/signin-interfaces.js";

export class SigninController{
    constructor(private service: SigninService){}

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as CreateUserDTO
        const result = await this.service.createUser(data);
        return reply.code(200).send(result);
    } 
}
