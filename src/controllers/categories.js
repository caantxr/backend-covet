const {
    dbGetCategories,
    dbGetCategoryById,
    dbInsertCategory,
    dbUpdateCategory,
    dbDeleteCategory
} = require("../services/categories");

const getCategories = async (req, res) => {
    try {
        const data = await dbGetCategories();
        res.status(200).json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener categorías' });
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const data = await dbGetCategoryById(categoryId);
        if (!data) {
            return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener categoría por ID' });
    }
};

const createCategory = async (req, res) => {
    const inputData = req.body;
    try {
        const data = await dbInsertCategory(inputData);
        res.status(201).json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear categoría' });
    }
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const inputData = req.body;
    try {
        const data = await dbUpdateCategory(categoryId, inputData);
        if (!data) {
            return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar categoría' });
    }
};

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const data = await dbDeleteCategory(categoryId);
        if (!data) {
            return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, msg: 'Categoría eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar categoría' });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};