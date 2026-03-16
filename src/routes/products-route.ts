import type { FastifyInstance } from "fastify";
import { ProductsController } from "../modules/products/products-controller";
import { ProductsService } from "../modules/products/products-service";
import { ProductsRepository } from "../modules/products/products-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import { db } from "../db/index.js";

export async function productsRoute(app: FastifyInstance) {
  const repository = new ProductsRepository(db);
  const service = new ProductsService(repository);
  const controller = new ProductsController(service);

  app.get("/products", { onRequest: [verifyJWT] }, (req, res) =>
    controller.list(res),
  );

  app.get("/companies/:cnpj/products", async (req, res) =>
    controller.listByCompany(req, res)
  );

  app.post("/products", { onRequest: [verifyJWT] }, (req, res) =>
    controller.add(req, res),
  );

    app.patch("/products", { onRequest: [verifyJWT] }, (req, res) =>
    controller.update(req, res),
  );

    app.delete("/products", { onRequest: [verifyJWT] }, (req, res) =>
    controller.delete(req, res),
  );
}
