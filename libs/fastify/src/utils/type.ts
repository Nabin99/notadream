// relationships.ts
export interface Join {
  type: "INNER" | "LEFT" | "RIGHT" | "FULL"; // Add other join types as needed
  table: string;
  on: string;
}

export interface TableRelationship {
  fields: {
    [fieldName: string]: string;
  };
  joins: Join[];
}

export interface TableRelationships {
  [tableName: string]: TableRelationship;
}

// const tableRelationships: TableRelationships = {
//   your_table: {
//     fields: {
//       status: "your_table.status",
//       age: "your_table.age",
//       createdAt: "your_table.created_at",
//       name: "your_table.name",
//     },
//     joins: [],
//   },
//   other_table: {
//     fields: {
//       otherField: "other_table.other_field",
//     },
//     joins: [
//       {
//         type: "INNER",
//         table: "your_table",
//         on: "other_table.your_table_id = your_table.id",
//       },
//     ],
//   },
//   // Add other tables and their relationships
// };

export interface Filter {
  field: string;
  value: string | number | boolean | string[] | number[] | boolean[];
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
export type SortOrder = "asc" | "desc";

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
