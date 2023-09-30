const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany()
  
  res.send(users);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
