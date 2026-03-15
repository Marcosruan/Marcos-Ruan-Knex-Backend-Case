import type { FastifyRequest, FastifyReply } from "fastify";
import type { CompanyDTO } from "./companies-interfaces";
import { bodySchema } from "./companies-interfaces";
import { CompaniesService } from "./companies-service";

export class CompaniesController {
  constructor(private service: CompaniesService) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data: CompanyDTO = bodySchema.parse(request.body);

    const company = await this.service.execute(data);

    return reply.code(201).send(company);
  }
}
