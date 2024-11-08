const mongoose = require('mongoose');
const BusinessModel = require("../models/nosql/business");
const CategoryModel = require("../models/nosql/category");

/**
 * Obtiene todos los negocios de la base de datos, incluyendo su categoría.
 * @returns {Promise<Array>} - Una promesa que resuelve a una lista de negocios.
 */
const dbGetBusinesses = async () => {
    return await BusinessModel.find()
}

/**
 * Obtiene un negocio por su ID.
 * @param {string} _id - El ID del negocio a buscar.
 * @returns {Promise<Object|null>} - Una promesa que resuelve al negocio encontrado o null si no existe.
 */
const dbGetBusinessById = async (_id) => {
    return await BusinessModel.findOne({ _id });
}

/**
 * Inserta un nuevo negocio en la base de datos.
 * Si la categoría del negocio no existe, la crea.
 * @param {Object} newBusiness - El objeto que contiene la información del nuevo negocio.
 * @returns {Promise<Object>} - Una promesa que resuelve al negocio insertado.
 * @throws {Error} - Lanza un error si ocurre un problema al insertar el negocio.
 */
const dbInsertBusiness = async (newBusiness) => {
    try {
        const business = new BusinessModel(newBusiness); // Crear una instancia del modelo Business
        await business.save(); // Guardar el nuevo negocio

        // Buscar la categoría del nuevo negocio
        let category = await CategoryModel.findOne({ name: newBusiness.category });
        if (!category) {
            category = new CategoryModel({ name: newBusiness.category }); // Crear nueva categoría si no existe
            await category.save();
        }

        // Asociar el negocio a la categoría
        category.businesses.push(business._id);
        await category.save();

        return business; // Devolver el negocio insertado
    } catch (error) {
        console.error('Error al insertar el negocio:', error);
        throw error; // Lanzar error si falla la inserción
    }
}

/**
 * Actualiza un negocio por su ID.
 * @param {string} id - El ID del negocio a actualizar.
 * @param {Object} updatedBusiness - El objeto con los nuevos datos del negocio.
 * @returns {Promise<Object>} - Una promesa que resuelve al negocio actualizado.
 */
const dbUpdateBusiness = async (id, updatedBusiness) => {
    return await BusinessModel.findOneAndUpdate(
        { _id: id },
        updatedBusiness,
        { new: true } // Devuelve el negocio actualizado
    );
}

/**
 * Elimina un negocio por su ID.
 * @param {string} id - El ID del negocio a eliminar.
 * @returns {Promise<Object|null>} - Una promesa que resuelve al negocio eliminado o null si no existe.
 */
const dbDeleteBusiness = async (id) => {
    return await BusinessModel.findByIdAndDelete(id);
}

/**
 * Busca negocios por nombre o descripción.
 * @param {Object} searchParams - Un objeto que contiene los parámetros de búsqueda.
 * @param {string} [searchParams.name] - El nombre del negocio a buscar.
 * @param {string} [searchParams.description] - La descripción del negocio a buscar.
 * @returns {Promise<Array>} - Una promesa que resuelve a una lista de negocios que coinciden con los criterios de búsqueda.
 */
const findBusinessByName = async (searchParams) => {
    const { name, description } = searchParams; // Desestructurar parámetros de búsqueda
    let searchQuery = {};

    if (name) {
        searchQuery.name = { $regex: name, $options: 'i' }; // Búsqueda insensible a mayúsculas
    }

    if (description) {
        searchQuery.description = { $regex: description, $options: 'i' }; // Búsqueda insensible a mayúsculas
    }

    return await BusinessModel.find(searchQuery).populate('category'); // Devolver negocios que coinciden
}

/**
 * Obtiene todos los negocios de una categoría específica.
 * @param {string} categoryName - El nombre de la categoría.
 * @returns {Promise<Array>} - Una promesa que resuelve a una lista de negocios en la categoría.
 * @throws {Error} - Lanza un error si no se encuentra la categoría o si no se proporciona un nombre de categoría.
 */
// const dbGetBusinessesByCategory = async (categoryName) => {
//     try {
//         if (!categoryName) {
//             throw new Error('El nombre de la categoría es obligatorio.'); // Validación de entrada
//         }

//         const category = await CategoryModel.findOne({ name: categoryName }).populate('businesses');
//         if (!category) {
//             throw new Error(`Categoría "${categoryName}" no encontrada.`); // Lanzar error si la categoría no existe
//         }

//         return category.businesses; // Devolver negocios de la categoría
//     } catch (error) {
//         console.error('Error al obtener negocios de la categoría:', error);
//         throw error; // Lanzar error si ocurre un problema
//     }
// }

module.exports = {
    dbGetBusinesses,
    dbGetBusinessById,
    dbInsertBusiness,
    dbUpdateBusiness,
    dbDeleteBusiness,
    findBusinessByName,
    // dbGetBusinessesByCategory
};
