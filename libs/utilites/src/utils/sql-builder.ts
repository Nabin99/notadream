import type { Filter, QueryParameters, Sort, TableRelationships } from "./type";

export const buildSQLQueryFromQueryParameters = (
  queryParameters: QueryParameters,
  tableRelationships: TableRelationships
) => {
  const whereClauses: string[] = [];
  const orderClauses: string[] = [];
  let limitClause = "";
  let offsetClause = "";
  const joinClauses = new Set<string>(); // Use a set to avoid duplicate joins

  const getFieldMapping = (field: string) => {
    for (const table in tableRelationships) {
      if (field in tableRelationships[table].fields) {
        // Add joins for the current table
        // eslint-disable-next-line unicorn/no-array-for-each
        tableRelationships[table].joins.forEach((join) => {
          joinClauses.add(`${join.type} JOIN ${join.table} ON ${join.on}`);
        });

        return tableRelationships[table].fields[field];
      }
    }

    // eslint-disable-next-line unicorn/no-null
    return null;
  };

  if (queryParameters.filters) {
    // eslint-disable-next-line unicorn/no-array-for-each
    queryParameters.filters.forEach((filter: Filter) => {
      const mappedField = getFieldMapping(filter.field);

      if (mappedField) {
        const operator = filter.operator;

        if (operator) {
          let clause;

          switch (operator) {
            case "IS NULL":
            case "IS NOT NULL": {
              clause = `${mappedField} ${operator}`;
              break;
            }
            case "IN":
            case "NOT IN": {
              clause = `${mappedField} ${operator} (${(filter.value as number[] | string[] | boolean[])?.map((value) => `'${value}'`).join(", ")})`;
              break;
            }
            case "BETWEEN":
            case "NOT BETWEEN": {
              const values = filter.value as number[] | string[] | boolean[];
              clause = `${mappedField} ${operator} '${values[0]}' AND '${values[1]}'`;
              break;
            }
            default: {
              clause = `${mappedField} ${operator} '${filter.value}'`;
            }
          }

          whereClauses.push(clause);
        }
      }
    });
  }

  if (queryParameters.sort) {
    // eslint-disable-next-line unicorn/no-array-for-each
    queryParameters.sort.forEach((sort: Sort) => {
      const mappedField = getFieldMapping(sort.field);

      if (mappedField) {
        orderClauses.push(`${mappedField} ${sort.order}`);
      }
    });
  }

  if (queryParameters.pagination) {
    if (queryParameters.pagination.limit) {
      limitClause = `LIMIT ${queryParameters.pagination.limit}`;
    }

    if (queryParameters.pagination.offset) {
      offsetClause = `OFFSET ${queryParameters.pagination.offset}`;
    }
  }

  let query = `SELECT * FROM {base_table}`; // Base table

  if (joinClauses.size > 0) {
    // eslint-disable-next-line unicorn/prefer-spread
    query += ` ${Array.from(joinClauses).join(" ")}`;
  }

  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(" AND ")}`;
  }

  if (orderClauses.length > 0) {
    query += ` ORDER BY ${orderClauses.join(", ")}`;
  }

  if (limitClause) {
    query += ` ${limitClause}`;
  }

  if (offsetClause) {
    query += ` ${offsetClause}`;
  }

  return query;
};
