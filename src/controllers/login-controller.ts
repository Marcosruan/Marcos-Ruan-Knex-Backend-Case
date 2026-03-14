import type { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../services/login-service.js";

export class LoginController{
    constructor(private service: LoginService){}

    async createLogin(request: FastifyRequest, reply: FastifyReply) {
        const result = await this.service.createLogin();
        return reply.code(200).send(result);
    } 
}
