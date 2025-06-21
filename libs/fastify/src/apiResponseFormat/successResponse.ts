export const successResponse = <T>(data: T, message?: string) => ({
  message,
  data,
});
