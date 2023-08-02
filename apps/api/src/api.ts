import fastify from "fastify";

const api = async () => {
  const api = await fastify({
    logger: {
      level: "info",
    },
  });
  return api;
};

export default api;
