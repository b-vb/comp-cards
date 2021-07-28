import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare const global: NodeJS.Global & { prisma?: PrismaClient };

// eslint-disable-next-line import/prefer-default-export
export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
