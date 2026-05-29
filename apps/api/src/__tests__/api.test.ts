import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../api";

describe("API Setup", () => {
  let server: any;

  beforeAll(async () => {
    try {
      server = await app();
      
      // Register all test routes BEFORE starting the server
      server.get("/health", async (request, reply) => {
        return { status: "ok" };
      });

      server.get("/api/data", async (request, reply) => {
        return { data: [1, 2, 3], timestamp: "2024-01-01" };
      });

      server.post("/api/submit", async (request, reply) => {
        return { received: request.body };
      });

      server.get("/api/error", async (request, reply) => {
        throw new Error("Test error");
      });
    } catch (error) {
      console.error("Failed to create app:", error);
      throw error;
    }
  });

  afterAll(async () => {
    if (server) {
      try {
        await server.close();
      } catch (error) {
        console.error("Failed to close server:", error);
      }
    }
  });

  it("should create fastify app instance", async () => {
    expect(server).toBeDefined();
  });

  it("should have logger configured", () => {
    expect(server.log).toBeDefined();
  });

  it("should be able to handle HTTP requests", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({ status: "ok" });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/unknown-route-xyz",
    });

    expect(response.statusCode).toBe(404);
  });

  it("should support JSON responses", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/data",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    const data = JSON.parse(response.payload);
    expect(data.data).toEqual([1, 2, 3]);
  });

  it("should handle POST requests with JSON body", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/submit",
      payload: { message: "hello" },
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data.received.message).toBe("hello");
  });

  it("should have proper error handling", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/error",
    });

    // Fastify should handle the error and return a 500 status
    expect([500, 500]).toContain(response.statusCode);
  });
});
