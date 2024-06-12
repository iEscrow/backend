const { FooterItem, Footer } = require("../models/Footer");

// Obtener todos los pies de página y sus elementos
exports.getItems = async (req, res) => {
  try {
    const footers = await Footer.findAll({ include: FooterItem });
    res.json(footers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los pies de página." });
  }
};

// Obtener un pie de página por su ID y sus elementos
exports.getByID = async (req, res) => {
  const id = req.params.id;
  try {
    const footer = await Footer.findByPk(id, { include: FooterItem });
    if (!footer) {
      return res
        .status(404)
        .json({ message: "No se encontró el pie de página." });
    }
    res.json(footer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el pie de página." });
  }
};

// Crear un nuevo pie de página con sus elementos
exports.create = async (req, res) => {
  const { title, items } = req.body;
  try {
    const newFooter = await Footer.create({ title });
    await Promise.all(items.map((item) => newFooter.createFooterItem(item)));
    res.status(201).json(newFooter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pie de página." });
  }
};

// Actualizar un pie de página y sus elementos
exports.update = async (req, res) => {
  const id = req.params.id;
  const { title, items } = req.body;
  try {
    const footer = await Footer.findByPk(id);
    if (!footer) {
      return res
        .status(404)
        .json({ message: "No se encontró el pie de página." });
    }
    await footer.update({ title });
    // Eliminar los elementos anteriores y crear nuevos elementos
    await FooterItem.destroy({ where: { FooterId: id } });
    await Promise.all(items.map((item) => footer.createFooterItem(item)));
    res.json(footer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el pie de página." });
  }
};

exports.updateFooterItem = async (req, res) => {
  const id = req.params.id;
  const { title, icon, appScreen, webScreen } = req.body;
  try {
    const footerItem = await FooterItem.findByPk(id);
    if (!footerItem) {
      return res
        .status(404)
        .json({ message: "No se encontró el elemento del pie de página." });
    }
    await footerItem.update({ title, icon, appScreen, webScreen });
    res.json(footerItem);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el elemento del pie de página." });
  }
};

// Eliminar un pie de página y sus elementos
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const footer = await Footer.findByPk(id);
    if (!footer) {
      return res
        .status(404)
        .json({ message: "No se encontró el pie de página." });
    }
    await footer.destroy();
    res.json({ message: "Pie de página eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el pie de página." });
  }
};
