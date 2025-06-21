import { z } from "zod";

// Common address structure used in multiple places
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});
