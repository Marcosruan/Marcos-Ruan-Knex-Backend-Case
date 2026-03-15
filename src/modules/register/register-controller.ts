import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserDTO } from "./register-interfaces.js";
import { bodySchema } from "./register-interfaces.js";
import { RegisterService } from "./register-service.js";

export class RegisterController {
  constructor(private service: RegisterService) {}

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const data: CreateUserDTO = bodySchema.parse(request.body);

    const result = await this.service.createUser(data);

    return reply.code(201).send(result);
  }
}
