import {PrismaClient} from "@prisma/client"
import Logger from "../logger.js";

const logger = new Logger('DB')

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ['query', 'error', 'warn'] : ['error'],
})

const connectDB = async() => {
  try {
    await prisma.$connect();
    logger.log("DB connected via prisma")
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
};

const disconnectDB = async() => {
  await prisma.$disconnect()
};

export {prisma, connectDB, disconnectDB};