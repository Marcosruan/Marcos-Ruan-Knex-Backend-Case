import type { FastifyInstance } from "fastify";
import { RegisterController } from "../modules/register/register-controller.js";
import { RegisterService } from "../modules/register/register-service.js";
import { RegisterRepository } from "../modules/register/register-repository.js";
import { db } from "../db/index.js";

export async function registerRoute(app: FastifyInstance) {
  const repository = new RegisterRepository(db);
  const service = new RegisterService(repository);
  const controller = new RegisterController(service);
  
  app.post("/register", (req, res) => controller.handler(req, res));
}
