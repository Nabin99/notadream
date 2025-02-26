import { APIError } from "./apiError";

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: APIError;
}
