import type { FastifyInstance } from "fastify";
import { CompaniesController } from "../modules/companies/companies-controller";
import { CompaniesService } from "../modules/companies/companies-service";
import { CompaniesRepository } from "../modules/companies/companies-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyAdmin } from "../middlewares/verify-admin";
import { db } from "../db/index.js";

export async function companyRoute(app: FastifyInstance) {
  const repository = new CompaniesRepository(db);
  const service = new CompaniesService(repository);
  const controller = new CompaniesController(service);

  app.post("/companies", { onRequest: [verifyJWT, verifyAdmin] }, (req, res) =>
    controller.handle(req, res),
  );
}
