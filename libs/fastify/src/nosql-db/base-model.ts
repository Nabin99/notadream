/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Db,
  Collection,
  ObjectId,
  Filter,
  UpdateFilter,
  InsertOneResult,
  OptionalUnlessRequiredId,
  WithId,
  SortDirection,
  Document,
  BulkWriteResult,
  UpdateResult,
  DeleteResult,
  CountDocumentsOptions,
  AggregateOptions,
  IndexSpecification,
  CreateIndexesOptions,
  AnyBulkWriteOperation,
} from "mongodb";
import { ZodSchema } from "zod";

import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../apiResponseFormat";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: { [key: string]: SortDirection };
}

export interface PaginatedResult<T> {
  data: WithId<T>[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export abstract class BaseModel<T> {
  protected collection: Collection<WithId<T>>;
  protected schema: ZodSchema; // Validate without _id

  constructor(db: Db, collectionName: string, schema: ZodSchema) {
    this.collection = db.collection<WithId<T>>(collectionName);
    this.schema = schema;
  }

  /**
   * Create a new document
   */
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
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Create multiple documents in a single operation
   */
  async createMany(dataArray: T[]): Promise<WithId<T>[]> {
    try {
      // Validate all documents against schema
      const parsedDataArray = dataArray.map((data) => this.schema.parse(data));

      const result = await this.collection.insertMany(
        parsedDataArray as OptionalUnlessRequiredId<WithId<T>>[]
      );

      if (!result.acknowledged || result.insertedCount !== dataArray.length) {
        throw new InternalServerError("Failed to insert all documents");
      }

      // Map the inserted IDs back to the data
      return parsedDataArray.map((data, index) => ({
        ...data,
        _id: new ObjectId(result.insertedIds[index]),
      })) as WithId<T>[];
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Find document by ID
   */
  async findById(id: string): Promise<WithId<T>> {
    try {
      if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid ID format");

      const record = (await this.collection.findOne({
        _id: new ObjectId(id),
      } as Filter<WithId<T>>)) as WithId<T>;

      if (!record) throw new NotFoundError("Document not found");

      return record;
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Find documents by query
   */
  async find(query: Filter<WithId<T>> = {}): Promise<WithId<T>[]> {
    try {
      return this.collection.find(query).toArray() as Promise<WithId<T>[]>;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Find documents with pagination, sorting, and projection
   */
  async findWithOptions(
    query: Filter<WithId<T>> = {},
    options: PaginationOptions = {},
    projection: Document = {}
  ): Promise<PaginatedResult<T>> {
    try {
      const { page = 1, limit = 10, sort = { _id: -1 } } = options;

      // Ensure positive values
      const validPage = Math.max(1, page);
      const validLimit = Math.max(1, limit);
      const skip = (validPage - 1) * validLimit;

      // Get total count
      const total = await this.collection.countDocuments(query);

      // Execute find with options
      const data = (await this.collection
        .find(query, { projection })
        .sort(sort)
        .skip(skip)
        .limit(validLimit)
        .toArray()) as WithId<T>[];

      return {
        data,
        pagination: {
          total,
          page: validPage,
          limit: validLimit,
          pages: Math.ceil(total / validLimit),
        },
      };
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Find one document matching the query
   */
  async findOne(query: Filter<WithId<T>>): Promise<WithId<T> | null> {
    try {
      const record = (await this.collection.findOne(query)) as WithId<T> | null;

      return record;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Update document by ID
   */
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
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        throw error;
      }
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Update many documents matching the query
   */
  async updateMany(
    query: Filter<WithId<T>>,
    updateData: Partial<T>
  ): Promise<number> {
    try {
      const result: UpdateResult = await this.collection.updateMany(query, {
        $set: updateData,
      } as UpdateFilter<WithId<T>>);

      return result.modifiedCount;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Delete document by ID
   */
  async deleteById(id: string): Promise<boolean> {
    try {
      if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid ID format");

      const result = await this.collection.findOneAndDelete({
        _id: new ObjectId(id),
      } as Filter<WithId<T>>);

      if (!result) throw new NotFoundError("Document not found");

      return true;
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Delete many documents matching the query
   */
  async deleteMany(query: Filter<WithId<T>>): Promise<number> {
    try {
      const result: DeleteResult = await this.collection.deleteMany(query);

      return result.deletedCount;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Count documents matching the query
   */
  async count(
    query: Filter<WithId<T>> = {},
    options: CountDocumentsOptions = {}
  ): Promise<number> {
    try {
      return this.collection.countDocuments(query, options);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Perform aggregation on collection
   */
  async aggregate<R extends Document>(
    pipeline: Document[],
    options: AggregateOptions = {}
  ): Promise<R[]> {
    try {
      return this.collection.aggregate<R>(pipeline, options).toArray();
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Check if document exists
   */
  async exists(query: Filter<WithId<T>>): Promise<boolean> {
    try {
      const count = await this.collection.countDocuments(query, { limit: 1 });

      return count > 0;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Create an index on the collection
   */
  async createIndex(
    indexSpec: IndexSpecification,
    options: CreateIndexesOptions = {}
  ): Promise<string> {
    try {
      return this.collection.createIndex(indexSpec, options);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  /**
   * Bulk write operations
   */
  async bulkWrite(
    operations: AnyBulkWriteOperation<WithId<T>>[],
    ordered: boolean = true
  ): Promise<BulkWriteResult> {
    try {
      return this.collection.bulkWrite(operations, { ordered });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(`Duplicate key error in bulk operation`);
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Find and update a document with custom update operators
   */
  async findOneAndUpdate(
    filter: Filter<WithId<T>>,
    update: UpdateFilter<WithId<T>>,
    returnDocument: "before" | "after" = "after"
  ): Promise<WithId<T> | null> {
    try {
      const result = await this.collection.findOneAndUpdate(filter, update, {
        returnDocument,
      });

      return result as WithId<T> | null;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Upsert document - update if exists, insert if not
   */
  async upsert(filter: Filter<WithId<T>>, data: T): Promise<WithId<T>> {
    try {
      const parsedData = this.schema.parse(data);

      const result = await this.collection.findOneAndUpdate(
        filter,
        { $set: parsedData } as UpdateFilter<WithId<T>>,
        {
          returnDocument: "after",
          upsert: true,
        }
      );

      if (!result) {
        throw new InternalServerError("Failed to upsert document");
      }

      return result as WithId<T>;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError(
          `Duplicate key error: ${JSON.stringify(error.keyValue)}`
        );
      }

      throw new InternalServerError(error.message);
    }
  }

  /**
   * Distinct values for a field
   */
  async distinct(
    field: keyof T & string,
    query: Filter<WithId<T>> = {}
  ): Promise<any[]> {
    try {
      return this.collection.distinct(field, query);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
