const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem } = require("../controllers/storage");

// Ruta para cargar archivos
router.post("/", uploadMiddleware.single("myfile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha cargado ningún archivo." });
        }
        const result = await createItem(req.file);
        res.status(201).json({ message: "Archivo cargado exitosamente.", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
