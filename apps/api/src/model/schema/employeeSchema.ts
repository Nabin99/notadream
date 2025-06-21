import { ObjectId } from "mongodb";
import { z } from "zod";

import { addressSchema } from "./addressSchema";
import {
  ACTIVE_STATUS_ENUM,
  CONTACT_METHOD,
  EMPLOYEE_ROLE_ENUM,
} from "../../constant";

export const employeeSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  alternateEmails: z.array(z.string().email()).optional().default([]),
  alternatePhoneNumbers: z.array(z.string()).optional().default([]),
  address: addressSchema,
  role: z.array(z.nativeEnum(EMPLOYEE_ROLE_ENUM)),
  preferredContactMethod: z
    .nativeEnum(CONTACT_METHOD)
    .default(CONTACT_METHOD.EMAIL),
  taxID: z.string().optional(),
  status: z.nativeEnum(ACTIVE_STATUS_ENUM).default(ACTIVE_STATUS_ENUM.ACTIVE),
  dateOfBirth: z.date().optional(),
  password: z.string(),
  dateJoined: z.date().default(() => new Date()),
});

export type EmployeeType = z.infer<typeof employeeSchema>;
