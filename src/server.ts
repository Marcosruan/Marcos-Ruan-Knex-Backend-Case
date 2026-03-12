import fastify from 'fastify';

const PORT = 8080;

export const app = fastify({ logger: true });

app.listen({port:PORT, host:'0.0.0.0'}, (error: Error | null, adress: string) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }
    app.log.info(`Server running at ${adress}`);
});