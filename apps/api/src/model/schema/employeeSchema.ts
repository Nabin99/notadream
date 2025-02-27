import { ObjectId } from "mongodb";
import { z } from "zod";

import { addressSchema } from "./addressSchema";

export enum EmployeeRoleEnum {
  Admin = "Admin",
  Manager = "Manager",
  WarehouseStaff = "WarehouseStaff",
  CustomerSupport = "CustomerSupport",
}

export const employeeSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  alternateEmails: z.array(z.string().email()).optional().default([]),
  alternatePhoneNumbers: z.array(z.string()).optional().default([]),
  address: addressSchema,
  role: z.array(z.nativeEnum(EmployeeRoleEnum)),
  preferredContactMethod: z.enum(["Email", "Phone", "SMS"]),
  taxID: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Blacklisted"]).default("Active"),
  dateOfBirth: z.date().optional(),
  passwordHash: z.string(),
  dateJoined: z.date().default(() => new Date()),
});

export type EmployeeType = z.infer<typeof employeeSchema>;
