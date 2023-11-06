const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, repeat_password } = req.body

    const userByEmail = await User.findOne({ where: { email } })
    const passwordHashed = bcryptjs.hashSync(password, 10)

    if (userByEmail) {
      return res.status(500).json({ error: 'Este email ya existe' })
    }

    if (password !== repeat_password) {
      return res.status(500).json({ error: 'Las contraseñas no coinciden' })
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: passwordHashed,
    })

    const token = jwt.sign(
      { _id: newUser.id, exp: Math.floor(Date.now() / 1000) + 3600 },
      process.env.SECRET_KEY
    )

    return res.status(201).json({ user: newUser, token })
  } catch (error) {
    console.error('Error al crear un usuario:', error)
    res.status(500).json({ error: 'No se pudo crear el usuario' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error)
    res.status(500).json({ error: 'No se pudo obtener la lista de usuarios' })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error al obtener un usuario por ID:', error)
    res.status(500).json({ error: 'No se pudo obtener el usuario' })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    user.set({
      ...req.body,
    })

    await user.save()
    res.status(200).json(user)
  } catch (error) {
    console.error('Error al actualizar un usuario por ID:', error)
    res.status(500).json({ error: 'No se pudo actualizar el usuario' })
  }
}

exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const isPasswordOk = bcryptjs.compareSync(password, user.password)

    if (!isPasswordOk) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { _id: user.id, exp: Math.floor(Date.now() / 1000) + 3600 },
      process.env.SECRET_KEY
    )

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: 'No se pudo loguear este usuario' })
  }
}
