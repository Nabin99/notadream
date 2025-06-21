import { ObjectId } from "mongodb";
import { z } from "zod";

import { addressSchema } from "./addressSchema";
import {
  ACTIVE_STATUS_ENUM,
  BUSINESS_TYPE_ENUM,
  CONTACT_METHOD,
  USER_ROLE_ENUM,
} from "../../constant";

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
  name: z.string(),
  type: z.nativeEnum(BUSINESS_TYPE_ENUM).default(BUSINESS_TYPE_ENUM.OTHER),
  establishedAt: z.date().optional(),
  website: z.string().url().optional(),
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
    preferredContactMethod: z.nativeEnum(CONTACT_METHOD),
    taxID: z.string().optional(),
    status: z.nativeEnum(ACTIVE_STATUS_ENUM).default(ACTIVE_STATUS_ENUM.ACTIVE),
    type: z.nativeEnum(UserTypeEnum),
    personal: personalUserSchema.nullable().optional(),
    business: businessUserSchema.nullable().optional(),
    password: z.string(),
    role: z.nativeEnum(USER_ROLE_ENUM),
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
