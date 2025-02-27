import { ObjectId } from "mongodb";
import { z } from "zod";

import { addressSchema } from "./addressSchema";

export enum UserTypeEnum {
  personal = "personal",
  business = "business",
}

// Personal user schema - completely separate from business
const personalUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date().optional(),
});

// Business user schema - completely separate from personal
const businessUserSchema = z.object({
  type: z.literal("Business"),
  businessName: z.string(),
  businessType: z.enum(["E-commerce", "Retail", "Logistics", "Other"]),
  establishedAt: z.date().optional(),
  businessWebsite: z.string().url().optional(),
});

// Base user fields that apply to all user types
export const userSchema = z
  .object({
    _id: z.instanceof(ObjectId).optional(),
    email: z.string().email(),
    phoneNumber: z.string(),
    alternateEmails: z.array(z.string().email()).optional().default([]),
    alternatePhoneNumbers: z.array(z.string()).optional().default([]),
    address: addressSchema,
    shippingAddress: addressSchema.optional(),
    dateJoined: z.date().default(() => new Date()),
    preferredContactMethod: z.enum(["Email", "Phone", "SMS"]),
    taxID: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Blacklisted"]).default("Active"),
    type: z.nativeEnum(UserTypeEnum),
    // eslint-disable-next-line unicorn/no-null
    personal: personalUserSchema.nullable().optional().default(null),
    // eslint-disable-next-line unicorn/no-null
    business: businessUserSchema.nullable().optional().default(null),
    passwordHash: z.string(),
    role: z.literal("User"),
  })
  .superRefine((user, context) => {
    if (user.type == UserTypeEnum.personal && user[user.type]) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Personal user should have personal details",
        path: ["personal"],
      });
    } else {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Business user should have business details",
        path: ["business"],
      });
    }
  });

export type UserType = z.infer<typeof userSchema>;
