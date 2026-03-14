import fastify from 'fastify';
import 'dotenv/config'
import { loginRoute } from './routes/login-route.js';
import { signinRoute } from './routes/register-route.js';


if (!process.env.PORT) {
    throw new Error("PORT não definida")
}

const PORT = Number(process.env.PORT)

const app = fastify({ logger: true });

app.register(loginRoute);
app.register(signinRoute);

app.listen({port:PORT, host:'0.0.0.0'}, (error: Error | null, adress: string) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }
    app.log.info(`Server running at ${adress}`);
});