const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Wallet = require("../models/Wallet");
const BankAccount = require("../models/BankAccount");
const Roles = require("../models/Role");
const cookieConfig = require("../config/cookieConfig");

function generarCodigoReferido() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 7 }, () =>
    caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  ).join("");
}

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      repeat_password,
      last_name,
      first_name,
    } = req.body;
    let { ref } = req.params;

    if (ref) {
      const userReferred = await User.findOne({ where: { refer_code: ref } });
      if (!userReferred) {
        return res.status(500).json({ error: "No existe este referido" });
      }
    }

    const userByEmail = await User.findOne({ where: { email } });
    const passwordHashed = bcryptjs.hashSync(password, 10);

    if (userByEmail) {
      return res.status(500).json({ error: "Este email ya existe" });
    }

    if (password !== repeat_password) {
      return res.status(500).json({ error: "Las contraseñas no coinciden" });
    }

    const newUser = await User.create({
      username,
      email,
      last_name,
      first_name,
      password: passwordHashed,
      referred_by: ref,
      refer_code: generarCodigoReferido(),
    });

    const token = jwt.sign(
      { _id: newUser.id, exp: Math.floor(Date.now() / 1000) + 3600 },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, cookieConfig);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error al crear un usuario:", error);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [BankAccount, Wallet, Roles] });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de usuarios" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const user = await User.findByPk(id, { include: Roles });

    const accounts = await BankAccount.findAll({
      where: { owner: user.id },
      include: User,
      raw: true,
    });
    const wallets = await Wallet.findAll({
      where: { owner: user.id },
      include: User,
      raw: true,
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ user, bankAccounts: accounts, wallets });
  } catch (error) {
    console.error("Error al obtener un usuario por ID:", error);
    res.status(500).json({ error: "No se pudo obtener el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.set({
      ...req.body,
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al actualizar un usuario por ID:", error);
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};

exports.authUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordOk = bcryptjs.compareSync(password, user.password);

    if (!isPasswordOk) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { _id: user.id, exp: Math.floor(Date.now() / 1000) + 3600 },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, cookieConfig);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo loguear este usuario" });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const { user } = req;
    const token = jwt.sign(
      { _id: user.id, exp: Math.floor(Date.now() / 1000) + 3600 },
      process.env.SECRET_KEY
    );
    res.cookie("token", token, cookieConfig);
    return res.status(200).json({user: req.user, token});
  } catch (error) {
    res.status(500).json({ error: "Token invalido" });
  }
};

exports.enableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.active = true;
    await user.save();

    res.status(200).json({ message: "Usuario activado con éxito", user });
  } catch (error) {
    console.error("Error al activar el usuario:", error);
    res.status(500).json({ error: "No se pudo activar el usuario" });
  }
};

exports.disableUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.active = false;
    await user.save();

    res.status(200).json({ message: "Usuario deshabilitado con éxito", user });
  } catch (error) {
    console.error("Error al deshabilitar el usuario:", error);
    res.status(500).json({ error: "No se pudo deshabilitar el usuario" });
  }
};
