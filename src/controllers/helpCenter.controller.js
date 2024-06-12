const { HelpCenterItem, HelpCenterSubItem } = require("../models/HelpCenter");

exports.getItems = async (req, res) => {
  try {
    const titlesWithSubItems = await HelpCenterItem.findAll({
      include: [
        {
          model: HelpCenterSubItem,
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).json(titlesWithSubItems);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error getting banks");
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const faqSets = await FAQSet.findAll({
      include: [
        {
          model: FAQItem,
        },
      ],
      order: [["id", "ASC"]],
    });
    console.log(faqSets);
    return res.status(200).json(faqSets);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error getting banks");
  }
};

exports.updateMainTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const mainTitle = await HelpCenterItem.findByPk(id);

    if (!mainTitle) {
      return res
        .status(404)
        .json({ message: "Título principal no encontrado." });
    }

    mainTitle.title = title;
    await mainTitle.save();

    return res.status(200).json(mainTitle);
  } catch (error) {
    console.error("Error al actualizar el título principal:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el título principal." });
  }
};

exports.updateSubItem = async (req, res) => {
  const { id } = req.params;
  const { title, info } = req.body;
  console.log(req.body);

  try {
    const subItem = await HelpCenterSubItem.findByPk(id);

    if (!subItem) {
      return res.status(404).json({ message: "Subítem no encontrado." });
    }

    subItem.title = title;
    subItem.info = info;
    await subItem.save();

    return res.status(200).json(subItem);
  } catch (error) {
    console.error("Error al actualizar el subítem:", error);
    return res.status(500).json({ message: "Error al actualizar el subítem." });
  }
};

exports.updateFAQSet = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const faqSet = await FAQSet.findByPk(id);

    if (!faqSet) {
      return res.status(404).json({ message: "FAQ Set no encontrado." });
    }

    faqSet.title = title;
    await faqSet.save();

    return res.status(200).json(faqSet);
  } catch (error) {
    console.error("Error al actualizar el subítem:", error);
    return res.status(500).json({ message: "Error al actualizar el subítem." });
  }
};

exports.updateFAQItem = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const faqItem = await FAQItem.findByPk(id);

    if (!faqItem) {
      return res.status(404).json({ message: "FAQ no encontrado." });
    }

    faqItem.question = question;
    faqItem.answer = answer;
    await faqItem.save();

    return res.status(200).json(faqItem);
  } catch (error) {
    console.error("Error al actualizar el subítem:", error);
    return res.status(500).json({ message: "Error al actualizar el subítem." });
  }
};

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { FAQSet, FAQItem } = require("../models/FAQ");

// Configurar multer para almacenar los iconos en una carpeta específica en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/help-center"); // Ruta donde se guardarán los iconos en el servidor
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Solo se permiten archivos de imagen."));
    }
    cb(null, true);
  },
}).single("icon");

exports.uploadMainIcon = async (req, res) => {
  const { id } = req.params;
  try {
    const mainTitle = await HelpCenterItem.findByPk(id);
    if (!mainTitle) {
      return res.status(404).json({ message: "MainTitle no encontrado." });
    }
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const iconUrl = req.file.path.replace(`public\\`, ""); // Obtener la ruta del icono subido

      // Obtener el host de la solicitud
      const host = req.get("host");

      // Concatenar el host con la ruta relativa de la imagen
      const fullUrl = `http://${host}/${iconUrl}`;

      // Verificar si ya hay una URL de imagen asociada con el MainTitle
      if (mainTitle.iconURL) {
        // Si hay una URL de imagen anterior, elimina el archivo de imagen del servidor
        const previousImagePath = mainTitle.iconURL.split("/").pop();
        const absoluteImagePath = path.join(
          __dirname,
          "../..",
          "",
          previousImagePath
        );

        if (fs.existsSync(absoluteImagePath)) {
          // Si el archivo existe, eliminarlo del servidor
          fs.unlinkSync(absoluteImagePath);
        }
      }

      mainTitle.iconURL = fullUrl;
      await mainTitle.save();
      return res.status(200).json({ iconURL: fullUrl });
    });
  } catch (error) {
    console.error("Error al actualizar el subítem:", error);
    return res.status(500).json({ message: "Error al actualizar el subítem." });
  }
};

exports.uploadFAQSetIcon = async (req, res) => {
  const { id } = req.params;

  try {
    const faqSet = await FAQSet.findByPk(id);
    if (!faqSet) {
      return res.status(404).json({ message: "MainTitle no encontrado." });
    }
    console.log(faqSet);
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const iconUrl = req.file.path.replace(`public\\`, ""); // Obtener la ruta del icono subido

      // Obtener el host de la solicitud
      const host = req.get("host");

      // Concatenar el host con la ruta relativa de la imagen
      const fullUrl = `http://${host}/${iconUrl}`;

      // Verificar si ya hay una URL de imagen asociada con el MainTitle
      if (faqSet.iconURL) {
        // Si hay una URL de imagen anterior, elimina el archivo de imagen del servidor
        const previousImagePath = faqSet.iconURL.split("/").pop();
        const absoluteImagePath = path.join(
          __dirname,
          "../..",
          "",
          previousImagePath
        );

        if (fs.existsSync(absoluteImagePath)) {
          // Si el archivo existe, eliminarlo del servidor
          fs.unlinkSync(absoluteImagePath);
        }
      }

      faqSet.iconURL = fullUrl;
      await faqSet.save();
      return res.status(200).json({ iconURL: fullUrl });
    });
  } catch (error) {
    console.error("Error al actualizar el subítem:", error);
    return res.status(500).json({ message: "Error al actualizar el subítem." });
  }
};
