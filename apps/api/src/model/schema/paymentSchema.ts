import { z } from "zod";

import { discountSchema } from "./discountSchema";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../../constant";

export const paymentSchema = z.object({
  paymentID: z.string().nonempty(),
  orderID: z.string().nonempty(),
  customerID: z.string().nonempty(),
  amount: z.number(),
  currency: z.string().default("USD"),
  method: z.nativeEnum(PAYMENT_METHOD),
  transactionID: z.string().optional(),
  status: z.nativeEnum(PAYMENT_STATUS).default(PAYMENT_STATUS.PENDING),
  // eslint-disable-next-line unicorn/no-null
  discount: discountSchema,
  fees: z.number().default(0),
  tax: z.number().default(0),
  refundedAmount: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type PaymentType = z.infer<typeof paymentSchema>;
