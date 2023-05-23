const { PrismaClient } = require("@prisma/client");

class PrismaContext {
  async start() {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      console.log("Database connection established");
    } catch (err) {
      console.log("Prisma error --->" + err);
    }
  }
}

module.exports = PrismaContext;
