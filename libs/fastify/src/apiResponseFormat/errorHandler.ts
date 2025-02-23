import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { APIError } from "./apiError";

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof APIError) {
    reply.code(error.statusCode).send({
      success: false,
      message: error.message,
      error: {
        code: error.code,
      },
    });
  } else {
    reply.code(500).send({
      success: false,
      message: "Something went wrong",
      error: {
        code: "UNKNOWN_ERROR",
      },
    });
  }
}
