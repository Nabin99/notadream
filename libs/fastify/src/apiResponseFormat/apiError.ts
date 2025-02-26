export class APIError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

// 400 - Bad Request (Generic)
export class BadRequestError extends APIError {
  constructor(message = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}

// 401 - Unauthorized (No authentication provided)
export class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

// 403 - Forbidden (Valid credentials but insufficient permissions)
export class ForbiddenError extends APIError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

// 404 - Not Found (Resource does not exist)
export class NotFoundError extends APIError {
  constructor(message = "Resource Not Found") {
    super(message, 404, "NOT_FOUND");
  }
}

// 409 - Conflict (e.g., Duplicate records)
export class ConflictError extends APIError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}

// 410 - Gone (Resource was deleted or no longer available)
export class GoneError extends APIError {
  constructor(message = "Resource No Longer Available") {
    super(message, 410, "GONE");
  }
}

// 422 - Unprocessable Entity (Validation errors)
export class ValidationError extends APIError {
  constructor(message = "Validation Failed") {
    super(message, 422, "VALIDATION_ERROR");
  }
}

// 429 - Too Many Requests (Rate limiting)
export class TooManyRequestsError extends APIError {
  constructor(message = "Too Many Requests") {
    super(message, 429, "TOO_MANY_REQUESTS");
  }
}

// 500 - Internal Server Error (Unexpected failures)
export class InternalServerError extends APIError {
  constructor(message = "Internal Server Error") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}
