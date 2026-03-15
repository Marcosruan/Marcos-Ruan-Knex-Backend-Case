import type { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "./login-service.js";
import { bodySchema } from "./login-interfaces.js";
export class LoginController {
  constructor(private service: LoginService) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {

    const data = bodySchema.parse(request.body);

    const user = await this.service.execute(data);

    const token = await reply.jwtSign(
		{
			role: user.role,
			company_cnpj: user.company_cnpj
		}, 
		{
			sign: {
			sub: user.id,
			expiresIn: "2h"
			}
		})

	return { token }
  }
}
