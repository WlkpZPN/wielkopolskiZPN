
import { PrismaClient } from "@prisma/client";

// Rozszerzenie globalThis o właściwość prisma
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Tworzymy nową instancję lub używamy istniejącej w czasie developmentu
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;


// import { PrismaClient } from "@prisma/client"

// declare global {

//     namespace NodeJS {

//         interface Global {

//             prisma: PrismaClient;

//         }

//     }

// }

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {

//   prisma = new PrismaClient()

// } else {

//   if (!global.prisma) {

//     global.prisma = new PrismaClient();

//   }

//   prisma = global.prisma

// }

// export default prisma
