import { BaseModel } from "@notadream/fastify";
import { Db } from "mongodb";
import { ZodSchema } from "zod";

import { UserType } from "../schema";

export class UserModel extends BaseModel<UserType> {
  constructor(db: Db, collectionName: string, schema: ZodSchema<UserType>) {
    super(db, collectionName, schema);
  }
}
