import { ObjectId } from "mongodb";
import { z } from "zod";

import { addressSchema } from "./addressSchema";
import { SHIPMENT_STATUS } from "../../constant";

// Define nested schemas first
// const geolocationSchema = z.object({
//   latitude: z.number().optional(),
//   longitude: z.number().optional(),
// });

// const proofOfDeliverySchema = z.object({
//   signature: z.string().optional(), // URL to signed image/file
//   receivedBy: z.string().optional(), // Name of the person who received the package
//   geolocation: geolocationSchema.optional(),
// });

const deliveryAddressSchema = addressSchema.extend({
  placeId: z.string().optional(),
});

// Main shipment schema
export const shipmentSchema = z
  .object({
    _id: z.instanceof(ObjectId).optional(), // MongoDB will generate this
    shipmentID: z.string(),
    orderID: z.string(), // Reference to Order
    customerID: z.string(), // Reference to Customer
    status: z.nativeEnum(SHIPMENT_STATUS).default(SHIPMENT_STATUS.PENDING),

    ///////////////
    remoteArea: z.boolean().default(false),
    carrier: z.string(), // e.g., FedEx, DHL, UPS, NepalEx
    description: z.string(),
    shipmentType: z.string(),
    shipmentVerifiedBy: z.instanceof(ObjectId),
    weightVerified: z.boolean(),
    isBilled: z.boolean(),
    billNo: z.string(),
    billType: z.string(),
    customClearance: z.string(),
    amount: z.number(),

    ///////////////
    awb_number: z.string(),
    shipmentDate: z.date().default(() => new Date()),
    expectedDeliveryDate: z.date().optional(),
    actualDeliveryDate: z.date().optional(),
    deliveryAddress: deliveryAddressSchema,
    //   proofOfDelivery: proofOfDeliverySchema.optional(),
    notes: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }) // Add validation to ensure delivery dates make logical sense
  .refine(
    (data) => {
      if (data.expectedDeliveryDate && data.shipmentDate) {
        return data.expectedDeliveryDate > data.shipmentDate;
      }

      return true;
    },
    {
      message: "Expected delivery date must be after shipment date",
      path: ["expectedDeliveryDate"],
    }
  )
  .refine(
    (data) => {
      if (data.actualDeliveryDate && data.shipmentDate) {
        return data.actualDeliveryDate > data.shipmentDate;
      }

      return true;
    },
    {
      message: "Actual delivery date must be after shipment date",
      path: ["actualDeliveryDate"],
    }
  );
