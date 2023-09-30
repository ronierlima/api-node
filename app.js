const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("./middlewares/auth");

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", verifyToken, async (req, res) => {
  const users = await prisma.user.findMany();

  res.send(users);
});

app.post("/", async (req, res) => {
  try {
    const user = req.body;

    user.senha = await bcrypt.hash(user.senha, 12);

    const newUser = await prisma.user.create({
      data: user,
    });

    res.send(newUser);
  } catch (error) {

    res.status(500).send(error.message);

  }
});

app.post("/login", async (req, res) => {

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })
  
    if(user) {
      if(await bcrypt.compare(req.body.senha, user.senha)) {
        res.send({token: generateToken(user), user: user});
      } else {
        res.status(401).send("Login ou Senha incorreta");
      }
    }
  
    res.status(404).send("Usuário não encontrado");
  } catch (error) {
    res.status(500).send(error);
  }
  
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
