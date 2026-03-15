import type { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "./login-service.js";
import { bodySchema } from "./login-interfaces.js";

export class LoginController {
  constructor(private service: LoginService) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {

    const data = bodySchema.parse(request.body);

    const token = await this.service.execute(data);

    return reply.code(200).send(token);
  }
}
