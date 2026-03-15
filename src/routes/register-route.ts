import type { FastifyInstance } from "fastify";
import { SigninController } from "../controllers/register-controller.js";
import { SigninService } from "../services/register-service.js";
import { SigninRepository } from "../repositories/register-repository.js";
import { db } from "../db/index.js";

export async function signinRoute(app: FastifyInstance) {
  	const repository = new SigninRepository(db);
  	const service = new SigninService(repository);
  	const controller = new SigninController(service);
  	app.post("/register", (req, res) => controller.createUser(req, res));
}
