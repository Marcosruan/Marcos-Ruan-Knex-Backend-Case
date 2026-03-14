import type { FastifyRequest, FastifyReply } from "fastify";
import { SigninService } from "../services/register-service.js";
import type { CreateUserDTO } from "../interfaces/signin-interfaces.js";

export class SigninController {
  constructor(private service: SigninService) {}

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateUserDTO;
    try {
      const result = await this.service.createUser(data);
      return reply.code(201).send(result);
    } catch (error) {
      return reply.code(500).send(error);
    }

    // return reply.code(200).send("Deu errado");
  }
}
