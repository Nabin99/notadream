import app from "./app";
import config from "./config/config";

const start = async () => {
  const server = await app();

  server.listen(
    { port: Number(config.port) || 4000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        server.log.error(err);
      }

      server.log.info(`Server listening at ${address}`);
    },
  );
};

start();
