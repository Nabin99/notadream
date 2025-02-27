/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Filter,
  WithId,
  UpdateFilter,
  Document,
  SortDirection,
  BulkWriteResult,
  AggregateOptions,
  IndexSpecification,
  CreateIndexesOptions,
  CountDocumentsOptions,
  AnyBulkWriteOperation,
} from "mongodb";

import { BaseModel, PaginationOptions, PaginatedResult } from "./base-model";

interface FindWithOptionsParameters<T> {
  query?: Filter<WithId<T>>;
  pagination?: PaginationOptions;
  projection?: Document;
}

export abstract class BaseService<T> {
  constructor(protected model: BaseModel<T>) {}

  /**
   * Create a new document
   */
  async create(data: T): Promise<WithId<T>> {
    return this.model.create(data);
  }

  /**
   * Create multiple documents in a single operation
   */
  async createMany(dataArray: T[]): Promise<WithId<T>[]> {
    return this.model.createMany(dataArray);
  }

  /**
   * Find document by ID
   */
  async findById(id: string): Promise<WithId<T>> {
    return this.model.findById(id);
  }

  /**
   * Find documents by query
   */
  async find(query: Filter<WithId<T>> = {}): Promise<WithId<T>[]> {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return this.model.find(query);
  }

  /**
   * Find documents with pagination, sorting, and projection
   */
  async findWithOptions(
    parameters: FindWithOptionsParameters<T> = {}
  ): Promise<PaginatedResult<T>> {
    const { query = {}, pagination, projection = {} } = parameters;
    return this.model.findWithOptions(query, pagination, projection);
  }

  /**
   * Find one document matching the query
   */
  async findOne(query: Filter<WithId<T>>): Promise<WithId<T> | null> {
    return this.model.findOne(query);
  }

  /**
   * Update document by ID
   */
  async updateById(
    id: string,
    updateData: Partial<T>
  ): Promise<WithId<T> | null> {
    return this.model.updateById(id, updateData);
  }

  /**
   * Update many documents matching the query
   */
  async updateMany(
    query: Filter<WithId<T>>,
    updateData: Partial<T>
  ): Promise<number> {
    return this.model.updateMany(query, updateData);
  }

  /**
   * Delete document by ID
   */
  async deleteById(id: string): Promise<boolean> {
    return this.model.deleteById(id);
  }

  /**
   * Delete many documents matching the query
   */
  async deleteMany(query: Filter<WithId<T>>): Promise<number> {
    return this.model.deleteMany(query);
  }

  /**
   * Count documents matching the query
   */
  async count(
    query: Filter<WithId<T>> = {},
    options: CountDocumentsOptions = {}
  ): Promise<number> {
    return this.model.count(query, options);
  }

  /**
   * Perform aggregation on collection
   */
  async aggregate<R extends Document>(
    pipeline: Document[],
    options: AggregateOptions = {}
  ): Promise<R[]> {
    return this.model.aggregate<R>(pipeline, options);
  }

  /**
   * Check if document exists
   */
  async exists(query: Filter<WithId<T>>): Promise<boolean> {
    return this.model.exists(query);
  }

  /**
   * Create an index on the collection
   */
  async createIndex(
    indexSpec: IndexSpecification,
    options: CreateIndexesOptions = {}
  ): Promise<string> {
    return this.model.createIndex(indexSpec, options);
  }

  /**
   * Bulk write operations
   */
  async bulkWrite(
    operations: AnyBulkWriteOperation<WithId<T>>[],
    ordered: boolean = true
  ): Promise<BulkWriteResult> {
    return this.model.bulkWrite(operations, ordered);
  }

  /**
   * Find and update a document with custom update operators
   */
  async findOneAndUpdate(
    filter: Filter<WithId<T>>,
    update: UpdateFilter<WithId<T>>,
    returnDocument: "before" | "after" = "after"
  ): Promise<WithId<T> | null> {
    return this.model.findOneAndUpdate(filter, update, returnDocument);
  }

  /**
   * Upsert document - update if exists, insert if not
   */
  async upsert(filter: Filter<WithId<T>>, data: T): Promise<WithId<T>> {
    return this.model.upsert(filter, data);
  }

  /**
   * Distinct values for a field
   */
  async distinct(
    field: keyof T & string,
    query: Filter<WithId<T>> = {}
  ): Promise<any[]> {
    return this.model.distinct(field, query);
  }

  /**
   * Execute a series of operations with transaction support
   * @param operations Function that contains database operations to execute within a transaction
   */
  async withTransaction<R>(operations: () => Promise<R>): Promise<R> {
    // Note: Transaction implementation depends on your MongoDB setup
    // This is a placeholder - actual implementation would need session handling
    try {
      // In a real implementation, you would:
      // 1. Start a session
      // 2. Start a transaction
      // 3. Execute operations
      // 4. Commit or abort the transaction
      return await operations();
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      // In a real implementation, you would abort the transaction here
      throw error;
    } finally {
      // In a real implementation, you would end the session here
    }
  }

  /**
   * Get a paginated list with optional filtering and sorting
   * A convenience method that wraps findWithOptions with common defaults
   */
  async list(
    page: number = 1,
    limit: number = 10,
    filter: Filter<WithId<T>> = {},
    sortField: string = "createdAt",
    sortOrder: SortDirection = -1
  ): Promise<PaginatedResult<T>> {
    const sort: { [key: string]: SortDirection } = {};
    sort[sortField] = sortOrder;

    return this.findWithOptions({
      query: filter,
      pagination: {
        page,
        limit,
        sort,
      },
    });
  }

  /**
   * Get a simple key-value list of documents, useful for dropdowns
   * @param valueField The field to use as the value (usually _id)
   * @param labelField The field to use as the label
   * @param filter Optional filter to apply
   */
  async getKeyValueList(
    valueField: keyof WithId<T> & string,
    labelField: keyof WithId<T> & string,
    filter: Filter<WithId<T>> = {}
  ): Promise<Array<{ value: any; label: any }>> {
    const data = await this.find(filter);
    return data.map((item) => ({
      value: item[valueField],
      label: item[labelField],
    }));
  }

  /**
   * Search documents by text search
   * Note: Requires a text index on the collection
   */
  async search(
    searchText: string,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<T>> {
    return this.findWithOptions({
      query: { $text: { $search: searchText } } as any,
      pagination: options,
    });
  }

  /**
   * Get document statistics
   */
  async getStats(): Promise<{
    total: number;
    active?: number;
    inactive?: number;
    [key: string]: any;
  }> {
    const total = await this.count();

    // This is a basic implementation that can be overridden
    // in child classes to provide more specific statistics
    return {
      total,
    };
  }
}
