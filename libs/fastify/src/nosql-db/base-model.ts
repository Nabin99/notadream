import {
  Db,
  Collection,
  ObjectId,
  Filter,
  UpdateFilter,
  InsertOneResult,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { ZodSchema } from "zod";

import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../apiResponseFormat";

export abstract class BaseModel<T> {
  protected collection: Collection<WithId<T>>;
  protected schema: ZodSchema<T>; // Validate without _id

  constructor(db: Db, collectionName: string, schema: ZodSchema<T>) {
    this.collection = db.collection<WithId<T>>(collectionName);
    this.schema = schema;
  }

  async create(data: T): Promise<WithId<T>> {
    try {
      const parsedData = this.schema.parse(data);
      const result: InsertOneResult<WithId<T>> =
        await this.collection.insertOne(
          parsedData as OptionalUnlessRequiredId<WithId<T>>
        );

      if (!result.insertedId)
        throw new InternalServerError("Failed to insert document");

      return {
        ...parsedData,
        _id: new ObjectId(result.insertedId),
      } as WithId<T>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async findById(id: string): Promise<WithId<T>> {
    try {
      if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid ID format");

      const record = (await this.collection.findOne({
        _id: new ObjectId(id),
      } as Filter<WithId<T>>)) as WithId<T>;

      if (!record) throw new NotFoundError("Document not found");

      return record;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async find(query: Filter<WithId<T>> = {}): Promise<WithId<T>[]> {
    try {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      return this.collection.find(query).toArray() as Promise<WithId<T>[]>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async updateById(
    id: string,
    updateData: Partial<T>
  ): Promise<WithId<T> | null> {
    try {
      if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid ID format");

      const updated: WithId<T> | null = (await this.collection.findOneAndUpdate(
        { _id: new ObjectId(id) } as Filter<WithId<T>>,
        { $set: updateData } as UpdateFilter<WithId<T>>,
        { returnDocument: "after" }
      )) as WithId<T> | null;

      if (!updated) throw new NotFoundError("Document not found");

      return updated;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid ID format");

      const result = await this.collection.findOneAndDelete({
        _id: new ObjectId(id),
      } as Filter<WithId<T>>);

      if (!result) throw new NotFoundError("Document not found");

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
