import { AutomationService } from "../src/services/automation.service";
import { prisma } from "../src/config/db";

jest.mock("../src/config/db", () => ({
  prisma: {
    scrapedJob: { create: jest.fn(), findMany: jest.fn() },
    application: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    agentLog: { create: jest.fn(), findMany: jest.fn() }
  },
}));

describe("AutomationService (MongoDB)", () => {
  const mockUserId = "60d5ec42f1b0c03d40e1b3a1"; // Mock MongoDB ObjectId

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should queue a new application and create an initial log", async () => {
    const jobData = { title: "Staff React Engineer", company: "Meta" };
    (prisma.application.create as jest.Mock).mockResolvedValue({ id: "app-1", ...jobData });
    (prisma.agentLog.create as jest.Mock).mockResolvedValue({ id: "log-1" });

    const result = await AutomationService.startApplication(mockUserId, jobData);

    expect(result.id).toBe("app-1");
    expect(prisma.application.create).toHaveBeenCalled();
    expect(prisma.agentLog.create).toHaveBeenCalled();
  });
});
