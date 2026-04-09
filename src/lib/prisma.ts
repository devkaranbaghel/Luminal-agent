import { PrismaClient } from '@prisma/client'

// 1. Properly declare the global type for TypeScript
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 2. Initialize Prisma (Singleton pattern)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Only log queries in development to keep your terminal clean
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// 3. Save to global object if we aren't in production
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma