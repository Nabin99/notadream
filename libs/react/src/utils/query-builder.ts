import { Filter, Pagination, QueryParameters, Sort, SortOrder } from "./type";

export class QueryBuilder {
  private filters: Filter[] = [];
  private sort: Sort[] = [];
  private pagination: Pagination | null = null;

  addFilter({ field, value, operator }: Filter): this {
    this.filters.push({ field, value, operator });
    return this;
  }

  addSort(field: string, order: SortOrder): this {
    this.sort.push({ field, order });
    return this;
  }

  setPagination(limit: number, offset: number): this {
    this.pagination = { limit, offset };
    return this;
  }

  build(): QueryParameters {
    return {
      filters: this.filters.length ? this.filters : undefined,
      sort: this.sort.length ? this.sort : undefined,
      pagination: this.pagination || undefined,
    };
  }

  getQueryString = (): string => {
    const queryParts: string[] = [];
    const queryParameters = this.build();

    if (queryParameters.filters) {
      queryParameters.filters.forEach((filter) => {
        queryParts.push(
          `${filter.field}${filter.operator}${encodeURIComponent(filter.value.toString())}`
        );
      });
    }

    if (queryParameters.sort) {
      queryParameters.sort.forEach((sort) => {
        queryParts.push(`sort=${sort.field},${sort.order}`);
      });
    }

    if (queryParameters.pagination) {
      if (queryParameters.pagination.limit) {
        queryParts.push(`limit=${queryParameters.pagination.limit}`);
      }

      if (queryParameters.pagination.offset) {
        queryParts.push(`offset=${queryParameters.pagination.offset}`);
      }
    }

    return queryParts.join("&");
  };
}
