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
      error: error.error,
      statusCode: error.statusCode,
    });
  } else if (error.validation) {
    // Handle Zod validation errors
    reply.status(400).send({
      error: "VALIDATION_ERROR",
      message: error.message,
      statusCode: error.statusCode,
    });
  } else {
    console.error(error); // Log unknown errors

    reply.status(500).send({
      error: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
      statusCode: error.statusCode,
    });
  }
}
