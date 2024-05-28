export type SortOrder = "asc" | "desc";

// export const FILTER_OPERATORS = {
//   eq: "=", // equal
//   neq: "!=", // not equal
//   gt: ">", // greater than
//   gte: ">=", // greater than or equal
//   lt: "<", // less than
//   lte: "<=", // less than or equal
//   like: "LIKE", // pattern matching
//   notLike: "NOT LIKE", // pattern not matching
//   in: "IN", // in a set of values
//   nin: "NOT IN", // not in a set of values
//   between: "BETWEEN", // between values
//   notBetween: "NOT BETWEEN", // not between values
//   isNull: "IS NULL", // is null
//   isNotNull: "IS NOT NULL", // is not null
// };

export interface Filter {
  field: string;
  value: string | number | boolean;
  operator:
    | "="
    | "!="
    | ">"
    | ">="
    | "<"
    | "<="
    | "IN"
    | "LIKE"
    | "NOT LIKE"
    | "NOT IN"
    | "BETWEEN"
    | "NOT BETWEEN"
    | "IS NULL"
    | "IS NOT NULL";
  //   operator: keyof typeof FILTER_OPERATORS;
}

export interface Sort {
  field: string;
  order: SortOrder;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface QueryParameters {
  filters?: Filter[];
  sort?: Sort[];
  pagination?: Pagination;
}
