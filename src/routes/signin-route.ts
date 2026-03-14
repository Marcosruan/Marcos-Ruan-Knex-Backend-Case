import type { FastifyInstance } from "fastify";
import { SigninController } from "../controllers/signin-controller.js";
import { SigninService } from "../services/signin-service.js";
import { SigninRepository } from "../repositories/signin-repository.js";
import { db } from "../db/index.js";

export async function signinRoute(app: FastifyInstance) {
  const repository = new SigninRepository(db);
  const service = new SigninService(repository);
  const controller = new SigninController(service);
  app.post("/signin", (req, res) => controller.createUser(req, res));
}
