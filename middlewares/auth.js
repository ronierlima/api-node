var jwt = require("jsonwebtoken");

const generateToken = (usuario) => {
  const token = jwt.sign(usuario, process.env.SECRET_KEY);
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
