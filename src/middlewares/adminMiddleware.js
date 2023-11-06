function checkAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'No tiene permisos de administrador' })
  }
}
