import { AuthService } from "../src/services/auth.service";
import { prisma } from "../src/config/db";

// Mocking Prisma
jest.mock("../src/config/db", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshSession: {
      create: jest.fn(),
      deleteMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: "user-123",
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashed_pass",
    });

    const result = await AuthService.register("test@example.com", "password123", "Test User");

    expect(result.user.email).toBe("test@example.com");
    expect(result.user.id).toBe("user-123");
    expect(result.accessToken).toBeDefined();
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("should throw error if email exists during registration", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "1" });
    
    await expect(AuthService.register("test@example.com", "pass", "name"))
      .rejects.toThrow("Email already exists");
  });
});
