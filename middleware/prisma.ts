import { PrismaClient } from "@prisma/client"

declare global {

    namespace NodeJS {

        interface Global {

            prisma: PrismaClient;

        }

    }

}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {

  prisma = new PrismaClient()

} else {

  if (!global.prisma) {

    global.prisma = new PrismaClient({
  __internal:{
    useUds: true
  }} as any);

  }

  prisma = global.prisma

}

export default prisma