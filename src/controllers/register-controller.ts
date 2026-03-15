import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserDTO } from "../interfaces/signin-interfaces.js";
import { bodySchema } from "../interfaces/signin-interfaces.js";
import { SigninService } from "../services/register-service.js";
// import {z} from 'zod'

export class SigninController {
  	constructor(private service: SigninService) {}

  	async createUser(request: FastifyRequest, reply: FastifyReply) {
      
    const data: CreateUserDTO = bodySchema.parse(request.body)

    const result = await this.service.createUser(data);
    
    return reply.code(201).send(result);
  }
}
