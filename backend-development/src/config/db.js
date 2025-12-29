import {PrismaClient} from "@prisma/client"
import Logger from "../logger.js";

const logger = new Logger()

const prisma = new PrismaClient({
  log: processs.env.NODE_ENV === "development" ? ['query', 'error', 'warn'] : ['error'],
})

const connectDB = async() => {
  try {
    await prisma.$connect();
    logger.log("DB connected via prisma")
  } catch (error) {
    logger.error(`DataBase connection error: ${error.message}`)
    processs.exit(1)
  }
};

const disconnectDB = async() => {
  await prisma.$disconnect()
};

export {prisma, connectDB, disconnectDB};