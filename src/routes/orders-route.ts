import type { FastifyInstance } from "fastify";
import { OrdersController } from "../modules/orders/orders-controller";
import { OrdersService } from "../modules/orders/orders-service"
import { OrdersRepository } from "../modules/orders/orders-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import { db } from "../db/index.js";

export async function ordersRoute(app: FastifyInstance) {
  const repository = new OrdersRepository(db);
  const service = new OrdersService(repository);
  const controller = new OrdersController(service);

  app.post("/orders", { onRequest: [verifyJWT] }, (req, res) =>
    controller.add(req, res),
  );

  app.patch("/orders/:id/status", { onRequest: [verifyJWT] }, (req, res) =>
    controller.updateStatus(req, res),
  );
}
