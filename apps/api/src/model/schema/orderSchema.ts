import { ObjectId } from "mongodb";
import { z } from "zod";

// Define the item schema first
const orderItemSchema = z.object({
  productID: z.string(),
  name: z.string(),
  quantity: z.number().int().min(1),
  price: z.number().positive(),
});

// Main order schema
export const orderSchema = z.object({
  _id: z.instanceof(ObjectId).optional(), // MongoDB will generate this
  awbNumber: z.string(),
  orderID: z.string(),
  customerID: z.string(), // Reference to Customer
  items: z.array(orderItemSchema).nonempty(), // At least one item required
  totalAmount: z.number().positive(),
  paymentStatus: z
    .enum(["Pending", "Paid", "Failed", "Refunded"])
    .default("Pending"),
  orderStatus: z
    .enum(["Pending", "Processing", "Shipped", "Completed", "Canceled"])
    .default("Pending"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.array(z.date().default(() => new Date())),
});
