import { BaseService } from "@notadream/fastify";

import { UserModel } from "../model";

import type { UserType } from "../model";
import type { Db } from "mongodb";
import type { ZodSchema } from "zod";

export class UserService extends BaseService<UserType> {
  constructor(db: Db, collectionName: string, schema: ZodSchema<UserType>) {
    super(new UserModel(db, collectionName, schema));
  }
}
