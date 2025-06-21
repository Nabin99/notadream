import { BaseService } from "@notadream/fastify";

import { UserModel, userSchema, UserType } from "../model";

import type { Db } from "mongodb";

export class UserService extends BaseService<UserType> {
  constructor(db: Db) {
    super(new UserModel(db, "users", userSchema));
  }
}
