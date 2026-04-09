import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { config } from "../config";
import { ApiError } from "../middleware/error";

export class AuthService {
  static async signAccessToken(userId: string) {
    return jwt.sign({ sub: userId }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpire as any,
    });
  }

  static async signRefreshToken(userId: string) {
    const token = jwt.sign({ sub: userId }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpire as any,
    });
    
    // Persist refresh token session
    await prisma.refreshSession.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });
    
    return token;
  }

  static async register(email: string, password: string, name?: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new ApiError(400, "Email already exists");

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    const accessToken = await this.signAccessToken(user.id);
    const refreshToken = await this.signRefreshToken(user.id);

    return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new ApiError(401, "Invalid credentials");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    const accessToken = await this.signAccessToken(user.id);
    const refreshToken = await this.signRefreshToken(user.id);

    return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };
  }

  static async refreshToken(oldToken: string) {
    const session = await prisma.refreshSession.findUnique({ where: { token: oldToken } });
    if (!session || session.expiresAt < new Date()) {
       if (session) await prisma.refreshSession.delete({ where: { id: session.id } });
       throw new ApiError(401, "Invalid or expired refresh token");
    }

    const userId = session.userId;
    const accessToken = await this.signAccessToken(userId);
    const newRefreshToken = await this.signRefreshToken(userId);

    // Rotate refresh tokens (delete old)
    await prisma.refreshSession.delete({ where: { id: session.id } });

    return { accessToken, refreshToken: newRefreshToken };
  }

  static async logout(token: string) {
    await prisma.refreshSession.deleteMany({ where: { token } });
  }
}
