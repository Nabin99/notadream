import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { APIConfig } from "../config";

export class AuthService {
  private jwtSecret: string;
  private refreshSecret: string;
  private jwtExpiration: string;
  private refreshExpiration: string;
  private saltRounds: number;
  private revokedTokens: Set<string>;

  constructor(config: APIConfig) {
    this.jwtSecret = config.auth.jwtSecret;
    this.refreshSecret = config.auth.refreshSecret;
    this.jwtExpiration = config.auth.jwtExpiration;
    this.refreshExpiration = config.auth.refreshExpiration;
    this.saltRounds = config.auth.passwordSaltRounds;
    this.revokedTokens = new Set();
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiration as unknown as number,
      algorithm: "RS512",
    });
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiration as unknown as number,
      algorithm: "RS512",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): any {
    if (this.revokedTokens.has(token)) {
      throw new Error("Token has been revoked");
    }

    return jwt.verify(token, this.jwtSecret);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshSecret);
  }

  revokeToken(token: string) {
    this.revokedTokens.add(token);
  }

  // hasPermission(userRole: string, requiredPermission: string): boolean {
  //   return Permissions[userRole]?.includes(requiredPermission) || false;
  // }
}
