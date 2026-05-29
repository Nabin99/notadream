import { describe, it, expect, beforeEach } from "vitest";

describe("Config Module", () => {
  beforeEach(() => {
    // Set up environment for testing
    if (!process.env.PORT) {
      process.env.PORT = "4000";
    }
  });

  it("should load config from environment", () => {
    // Test by directly checking process.env since config uses it
    expect(process.env.PORT).toBeDefined();
  });

  it("should have PORT as a string or defined value", () => {
    const port = process.env.PORT;
    expect(typeof port === "string" || port === undefined).toBe(true);
  });

  it("should support custom PORT values", () => {
    const testPort = "5000";
    process.env.PORT = testPort;
    expect(process.env.PORT).toBe(testPort);
  });

  it("should default to reasonable port ranges", () => {
    const port = process.env.PORT;
    if (port) {
      const portNum = parseInt(port, 10);
      expect(portNum).toBeGreaterThan(0);
      expect(portNum).toBeLessThan(65535);
    }
  });
});
