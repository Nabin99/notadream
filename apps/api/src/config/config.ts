import { APIConfig } from "@notadream/fastify";
import dotenv from "dotenv";

dotenv.config();

export const config: APIConfig = {
  appName: "Notadream",
  baseUrl: "localhost",
  cors: {
    allowedOrigins: ["d"],
  },
  database: {
    enablePooling: true,
    type: "nosql",
    nosql: [
      {
        name: "main",
        options: {},
        uri: "mongodb+srv://dhitalnabin11:KBHBDAVRLFmE9B1F@cluster0.xkkg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      },
    ],
  },
  environment: "development",
  auth: {
    allowGuestAccess: false,
    enableAuth: true,
    jwtExpiration: "1w",
    jwtSecret: "S#(r#t",
    passwordSaltRounds: 12,
    refreshExpiration: "1h",
    refreshSecret: "R#fr#$hS#(r#t",
    cookieOptions: {
      secret: "change-me-in-production",
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      path: "/auth",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    routes: {
      prefix: "/auth",
      login: "/user/login",
      signup: "/user/signup",
      refresh: "/user/refresh",
      logout: "/user/logout",
      disable: [],
    },
  },
  port: Number(process.env.PORT) || 4000,
};
