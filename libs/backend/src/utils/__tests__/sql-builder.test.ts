import { buildSQLQueryFromQueryParameters } from "../sql-builder";
import type {
  Filter,
  QueryParameters,
  Sort,
  TableRelationships,
} from "../type";

describe("buildSQLQueryFromQueryParameters", () => {
  let tableRelationships: TableRelationships;

  beforeEach(() => {
    tableRelationships = {
      users: {
        fields: {
          status: "users.status",
          age: "users.age",
          createdAt: "users.created_at",
          name: "users.name",
          id: "users.id",
        },
        joins: [],
      },
      posts: {
        fields: {
          title: "posts.title",
          content: "posts.content",
          userId: "posts.user_id",
          createdAt: "posts.created_at",
        },
        joins: [
          {
            type: "INNER",
            table: "users",
            on: "posts.user_id = users.id",
          },
        ],
      },
    };
  });

  describe("Base query generation", () => {
    it("should generate basic SELECT query without filters", () => {
      const queryParameters: QueryParameters = {};
      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("SELECT * FROM {base_table}");
    });

    it("should handle empty queryParameters gracefully", () => {
      const queryParameters: QueryParameters = {
        filters: [],
        sort: [],
        pagination: { limit: 0, offset: 0 },
      };
      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("SELECT * FROM {base_table}");
    });
  });

  describe("Filter building", () => {
    it("should add WHERE clause with single equality filter", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: "active",
            operator: "=",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status = 'active'");
    });

    it("should handle multiple filters with AND operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: "active",
            operator: "=",
          } as Filter,
          {
            field: "age",
            value: 18,
            operator: ">",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status = 'active' AND users.age > '18'");
    });

    it("should handle IN operator with array values", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: ["active", "pending", "approved"],
            operator: "IN",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain(
        "WHERE users.status IN ('active', 'pending', 'approved')"
      );
    });

    it("should handle NOT IN operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: ["deleted", "banned"],
            operator: "NOT IN",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status NOT IN ('deleted', 'banned')");
    });

    it("should handle BETWEEN operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "age",
            value: [18, 65],
            operator: "BETWEEN",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.age BETWEEN '18' AND '65'");
    });

    it("should handle NOT BETWEEN operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "age",
            value: [0, 13],
            operator: "NOT BETWEEN",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.age NOT BETWEEN '0' AND '13'");
    });

    it("should handle IS NULL operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: null,
            operator: "IS NULL",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status IS NULL");
    });

    it("should handle IS NOT NULL operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: null,
            operator: "IS NOT NULL",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status IS NOT NULL");
    });

    it("should handle != operator", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: "deleted",
            operator: "!=",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE users.status != 'deleted'");
    });

    it("should ignore filters for unmapped fields", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "nonexistent",
            value: "value",
            operator: "=",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).not.toContain("WHERE");
    });
  });

  describe("Sorting", () => {
    it("should add ORDER BY clause with single sort", () => {
      const queryParameters: QueryParameters = {
        sort: [
          {
            field: "createdAt",
            order: "ASC",
          } as Sort,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("ORDER BY users.created_at ASC");
    });

    it("should handle multiple ORDER BY clauses", () => {
      const queryParameters: QueryParameters = {
        sort: [
          {
            field: "status",
            order: "ASC",
          } as Sort,
          {
            field: "createdAt",
            order: "DESC",
          } as Sort,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("ORDER BY users.status ASC, users.created_at DESC");
    });

    it("should ignore unmapped sort fields", () => {
      const queryParameters: QueryParameters = {
        sort: [
          {
            field: "nonexistent",
            order: "ASC",
          } as Sort,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).not.toContain("ORDER BY");
    });
  });

  describe("Pagination", () => {
    it("should add LIMIT clause", () => {
      const queryParameters: QueryParameters = {
        pagination: {
          limit: 10,
        },
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("LIMIT 10");
    });

    it("should add OFFSET clause", () => {
      const queryParameters: QueryParameters = {
        pagination: {
          offset: 20,
        },
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("OFFSET 20");
    });

    it("should add both LIMIT and OFFSET clauses", () => {
      const queryParameters: QueryParameters = {
        pagination: {
          limit: 10,
          offset: 20,
        },
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("LIMIT 10");
      expect(result).toContain("OFFSET 20");
    });

    it("should handle zero limit gracefully", () => {
      const queryParameters: QueryParameters = {
        pagination: {
          limit: 0,
        },
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      // Should not add LIMIT clause if limit is 0
      expect(result).not.toContain("LIMIT");
    });
  });

  describe("JOIN handling", () => {
    it("should add JOIN clause when accessing related table fields", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "title",
            value: "Hello",
            operator: "=",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("INNER JOIN users ON posts.user_id = users.id");
      expect(result).toContain("WHERE posts.title = 'Hello'");
    });

    it("should not duplicate JOIN clauses", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "title",
            value: "Hello",
            operator: "=",
          } as Filter,
          {
            field: "content",
            value: "World",
            operator: "=",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      const joinCount = (result.match(/INNER JOIN users/g) || []).length;
      expect(joinCount).toBe(1);
    });
  });

  describe("Complex queries", () => {
    it("should build complete query with filters, sort, and pagination", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: "active",
            operator: "=",
          } as Filter,
          {
            field: "age",
            value: 18,
            operator: ">",
          } as Filter,
        ],
        sort: [
          {
            field: "createdAt",
            order: "DESC",
          } as Sort,
        ],
        pagination: {
          limit: 20,
          offset: 40,
        },
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("SELECT * FROM {base_table}");
      expect(result).toContain("WHERE users.status = 'active' AND users.age > '18'");
      expect(result).toContain("ORDER BY users.created_at DESC");
      expect(result).toContain("LIMIT 20");
      expect(result).toContain("OFFSET 40");
    });

    it("should build query with mixed operators", () => {
      const queryParameters: QueryParameters = {
        filters: [
          {
            field: "status",
            value: "deleted",
            operator: "!=",
          } as Filter,
          {
            field: "age",
            value: [18, 65],
            operator: "BETWEEN",
          } as Filter,
        ],
      };

      const result = buildSQLQueryFromQueryParameters(
        queryParameters,
        tableRelationships
      );

      expect(result).toContain("WHERE");
      expect(result).toContain("!=");
      expect(result).toContain("BETWEEN");
    });
  });
});
