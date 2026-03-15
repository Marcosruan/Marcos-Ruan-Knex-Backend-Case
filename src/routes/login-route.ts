import type { FastifyInstance } from "fastify";
import { LoginController } from "../modules/login/login-controller.js";
import { LoginService } from "../modules/login/login-service.js";
import { LoginRepository } from "../modules/login/login-repository.js";
import { db } from "../db/index.js";

export async function loginRoute(app: FastifyInstance) {
  const repository = new LoginRepository(db);
  const service = new LoginService(repository);
  const controller = new LoginController(service);
  
  app.post("/users", (req, res) => controller.handle(req, res));
}
