import { z } from "zod";

import { ACTIVE_STATUS_ENUM, DISCOUNT_TYPE } from "../../constant";

export const discountSchema = z.object({
  discountID: z.string().nonempty(),
  type: z.nativeEnum(DISCOUNT_TYPE),
  value: z.number(),
  minOrderAmount: z.number().default(0),
  maxDiscountAmount: z.number().optional(),
  validFrom: z.date(),
  validUntil: z.date(),
  status: z
    .enum([
      ACTIVE_STATUS_ENUM.ACTIVE,
      ACTIVE_STATUS_ENUM.EXPIRED,
      ACTIVE_STATUS_ENUM.DISABLED,
    ])
    .default(ACTIVE_STATUS_ENUM.ACTIVE),
  appliedAt: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date()),
});

export type Discount = z.infer<typeof discountSchema>;
