const { businessModel } = require('../models');
const { dbGetBusinesses, dbGetBusinessById, dbInsertBusiness, dbUpdateBusiness, dbDeleteBusiness } = require('../services/business');

// Obtener todos los negocios
const getBusinesses = async (req, res) => {
    try {
        const data = await dbGetBusinesses();
        
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los negocios'
        });
    }
};

// Obtener un negocio por ID
const getBusinessById = async (req, res) => {
    const businessId = req.params.id;

    try {
        const data = await dbGetBusinessById(businessId);

        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Negocio no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener un negocio por ID'
        });
    }
};

// Crear un nuevo negocio
const createBusiness = async (req, res) => {
    const payload = req.authUser;
    const inputData = req.body;

    if (payload) {
        inputData.userId = payload.id;
    }

    try {
        const data = await dbInsertBusiness(inputData);
        
        res.status(201).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear un negocio'
        });
    }
};

// Actualizar un negocio por ID
const updateBusiness = async (req, res) => {
    const businessId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateBusiness(businessId,inputData)

        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Negocio no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar un negocio'
        });
    }
};

// Eliminar un negocio por ID
const deleteBusiness = async (req, res) => {
    const businessId = req.params.id;

    try {
        const data = await dbDeleteBusiness (businessId)

        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Negocio no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar un negocio'
        });
    }
};

// Buscar negocios por nombre o descripción
const getBusinessByName = async (req, res) => {
    const { name, description } = req.body;

    try {
        const businesses = await businessModel.find({
            $or: [
                { name: { $regex: name, $options: 'i' } },
                { description: { $regex: description, $options: 'i' } }
            ]
        });

        if (!businesses || businesses.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron negocios que coincidan con los criterios de búsqueda'
            });
        }

        return res.status(200).json({
            ok: true,
            data: businesses
        });
    } catch (error) {
        console.error('Error en la búsqueda de negocios:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar negocios'
        });
    }
};

// // Obtener negocios por categoría
// const getBusinessesByCategory = async (req, res) => {
//     const categoryName = req.params.categoryName;

//     try {
//         const businesses = await businessModel.find({ category: categoryName });

//         if (!businesses || businesses.length === 0) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'No se encontraron negocios en esta categoría.'
//             });
//         }

//         res.status(200).json({
//             ok: true,
//             data: businesses
//         });
//     } catch (error) {
//         console.error("Error en getBusinessesByCategory:", error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Error al obtener negocios.'
//         });
//     }
// };

module.exports = {
    getBusinesses,
    getBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessByName,
    // getBusinessesByCategory
};
