import { PrismaClient } from "@prisma/client";

// 在开发环境中使用全局变量以防止热重载期间创建多个实例
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// 简化的Prisma客户端初始化
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma; 