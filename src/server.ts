import "dotenv/config";
import fastify from "fastify";
import fastifyJwt from '@fastify/jwt';
import { loginRoute } from "./routes/login-route";
import { registerRoute } from "./routes/register-route.js";
import { ZodError } from "zod";
import { AppError } from "./utils/app-error.js";
import { companyRoute } from "./routes/companies-route";

if (!process.env.PORT) {
  throw new Error("PORT não definido");
}

const PORT = Number(process.env.PORT);

const app = fastify({ logger: true });

app.register(fastifyJwt, {secret: process.env.JWT_SECRET!});
app.register(loginRoute);
app.register(registerRoute);
app.register(companyRoute);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error. Body request might have wrong/missing data.", issues: error.format() });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  console.error(error);

  return reply.status(500).send({
    message: "Internal server error",
  });
});

app.listen(
  { port: PORT, host: "0.0.0.0" },
  (error: Error | null, adress: string) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
    app.log.info(`Server running at ${adress}`);
  },
);
