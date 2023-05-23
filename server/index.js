const express = require("express");
const { port } = require("./config/env");
const PrismaContext = require("./config/prisma");
const userRouter = require("./route/user");
const postRouter = require("./route/post");
const app = express();
app.use(express.json());

const startServer = async () => {
  const prisma = new PrismaContext();
  await prisma.start();

  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);

  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
};

startServer();
