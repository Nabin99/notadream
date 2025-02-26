import { BaseModel } from "./base-model";

import type { Filter, WithId } from "mongodb";

export abstract class BaseService<T> {
  constructor(protected model: BaseModel<T>) {}

  async create(data: T) {
    return this.model.create(data);
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async find(query: Filter<WithId<T>> = {}) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return this.model.find(query);
  }

  async updateById(id: string, updateData: Partial<T>) {
    return this.model.updateById(id, updateData);
  }

  async deleteById(id: string) {
    return this.model.deleteById(id);
  }
}
