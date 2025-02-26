import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { APIError } from "./apiError";

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof APIError) {
    reply.code(error.statusCode).send({
      message: error.message,
      code: error.code,
    });
  } else if (error.validation) {
    // Handle Zod validation errors
    reply
      .status(400)
      .send({ code: "VALIDATION_ERROR", message: error.message });
  } else {
    console.error(error); // Log unknown errors

    reply.status(500).send({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
}
