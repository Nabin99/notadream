import { FastifyInstance } from "fastify";

export const startServer = async (app: () => Promise<FastifyInstance>) => {
  const server = await app();

  server.listen(
    { port: Number(server.apiConfig.port) || 4000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        server.log.error(err);
        // eslint-disable-next-line unicorn/no-process-exit, no-process-exit
        process.exit(1);
      }

      server.log.info(`Server listening at ${address}`);
    }
  );
};
