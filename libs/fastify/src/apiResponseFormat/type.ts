export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiErrorResponse;
}

export interface ApiErrorResponse {
  code: string;
  details?: string;
}
