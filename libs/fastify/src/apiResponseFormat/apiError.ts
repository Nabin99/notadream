export class APIError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class BadRequestError extends APIError {
  constructor(message = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends APIError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends APIError {
  constructor(message = "Resource Not Found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class InternalServerError extends APIError {
  constructor(message = "Internal Server Error") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}
