import app from "./api.ts";
import config from "./config/config.ts";

const server = await app();

server.listen(
  { port: Number(config.port), host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      server.log.error(err);
    }

    server.log.info(`Server listening at ${address}`);
  },
);
