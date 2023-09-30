const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.send(users);
});

app.post("/", async (req, res) => {
  const user = req.body;

  user.senha = await bcrypt.hash(user.senha, 12);

  const newUser = await prisma.user.create({
    data: user,
  });

  res.send(newUser);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
