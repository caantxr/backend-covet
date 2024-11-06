const {eventsModel} = require('../models')

const getEvents = async (req, res) => {
    try {
        const data = await eventsModel.find({});
        
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos'
        });
    }
};

const getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const data = await eventsModel.findById(eventId);

        /** Valida si el evento NO fue encontrado */
        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
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
            msg: 'Error al obtener un evento por ID'
        });
    }
};


 //obtener detalle
    const createEvent = async (req, res) => {
    const payload = req.authUser; // Obtener información del usuario autenticado
    const inputData = req.body;

    // Si necesitas asociar un userId al evento
    if (payload) {
        inputData.createdBy = payload.id; // Agregar userId si es necesario
    }

    console.log(inputData); // Para depuración

    try {
        const data = await eventsModel.create(inputData);
        console.log(data); // Para depuración

        res.status(201).json({
            ok: true,
            data // Respuesta estructurada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear un evento'
        });
    }
};

const updateEventPatch = async (req, res) => {
    const eventId = req.params.id; // Obtener el ID del evento desde los parámetros
    const inputData = req.body; // Obtener los datos de entrada

    try {
        const data = await eventsModel.findByIdAndUpdate(eventId, inputData, {
            new: true, // Devuelve el documento actualizado
            runValidators: true // Ejecuta validaciones de esquema
        });

        // Verifica si el evento no fue encontrado
        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
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
            msg: 'Error al actualizar un evento por ID'
        });
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.id; // Obtener el ID del evento desde los parámetros

    try {
        const data = await eventsModel.findByIdAndDelete(eventId);

        // Validar si el evento no fue encontrado
        if (!data) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
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
            msg: 'Error al eliminar un evento por ID'
        });
    }
};

const getEventByName = async (req, res) => {
    const { name, description } = req.body; // Obtener nombre y descripción del cuerpo de la solicitud

    try {
        // Buscar eventos que coincidan con el nombre y la descripción
        const events = await eventsModel.find({
            $or: [
                { name: { $regex: name, $options: 'i' } }, // Coincidencia de nombre (insensible a mayúsculas)
                { description: { $regex: description, $options: 'i' } } // Coincidencia de descripción (insensible a mayúsculas)
            ]
        });

        if (!events || events.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron eventos que coincidan con los criterios de búsqueda'
            });
        }

        return res.status(200).json({
            ok: true,
            data: events
        });
    } catch (error) {
        console.error('Error en la búsqueda de eventos:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar eventos'
        });
    }
};

const getEventsByCategory = async (req, res) => {
    try {
        // Obtener el nombre de la categoría desde los parámetros de la URL
        const categoryName = req.params.categoryName;

        // Llamar al servicio para buscar eventos en la categoría
        const events = await eventsModel.find({ category: categoryName });

        // Verificar si se encontraron eventos
        if (!events || events.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron eventos en esta categoría.'
            });
        }

        // Responder con los eventos encontrados
        res.status(200).json({
            ok: true,
            data: events
        });
    } catch (error) {
        // Imprime el error completo para diagnosticar el problema
        console.error("Error en getEventsByCategory:", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener eventos.'
        });
    }
};
module.exports = {getEvents, getEventById, createEvent, updateEventPatch, deleteEvent, getEventByName, getEventsByCategory};