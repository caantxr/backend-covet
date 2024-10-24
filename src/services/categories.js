const CategoryModel = require("../models/nosql/category");

const dbGetCategories = async () => {
    return await CategoryModel.find().populate('events'); // Puedes usar populate si quieres obtener detalles de eventos
};

const dbGetCategoryById = async (id) => {
    return await CategoryModel.findById(id);
};

const dbInsertCategory = async (newCategory) => {
    const category = new CategoryModel(newCategory);
    return await category.save();
};

const dbUpdateCategory = async (id, updatedCategory) => {
    return await CategoryModel.findByIdAndUpdate(id, updatedCategory, { new: true });
};

const dbDeleteCategory = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
};

module.exports = {
    dbGetCategories,
    dbGetCategoryById,
    dbInsertCategory,
    dbUpdateCategory,
    dbDeleteCategory
};