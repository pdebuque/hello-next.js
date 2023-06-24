import { PrismaClient } from "@prisma/client";
// in development, next.js uses hot reloading
// this means that the prisma client will be instantiated multiple times in development unless we check if it already exists

// create an object that contains the prisma client
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// check if the prisma client exists in global; if not, create it
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// if the prisma client doesn't exist in global, assign it to global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}