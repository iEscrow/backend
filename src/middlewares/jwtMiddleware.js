const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtMiddleware = async (req, res, next) => {
  const auth = req.header("Authorization");
  const token = typeof auth === "string" ? auth.replace("Bearer ", "") : null;

  if (typeof token !== "undefined") {
    req.token = token;

    try {
      const userId = jwt.verify(req.token, process.env.SECRET_KEY);
      const user = await User.findByPk(userId._id, { raw: true });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (user.role === 1) {
        if (!user.active) {
          return res.status(403).json({ error: "Usuario deshabilitado" });
        }
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
  }
};

module.exports = jwtMiddleware;
