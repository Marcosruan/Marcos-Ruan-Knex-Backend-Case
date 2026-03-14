import fastify from 'fastify';
import { loginRoute } from './routes/login-route.js';

const PORT = 8080;

const app = fastify({ logger: true });

app.register(loginRoute);

app.listen({port:PORT, host:'0.0.0.0'}, (error: Error | null, adress: string) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }
    app.log.info(`Server running at ${adress}`);
});