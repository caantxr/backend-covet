const mongoose = require('mongoose');
const EventModel = require("../models/nosql/events");
const Categorymodel = require("../models/nosql/category");
const { categoryModel } = require('../models');

const dbGetEvents = async () => {
    return await EventModel.find().populate({
        path : "category"
    });
}
const dbCreateEvent = async (newEvent) => {
    return await EventModel.create(newEvent)
}
const dbGetEventById = async (_id) => {
    return await EventModel.findOne({ _id });
}

const dbInsertEvent = async (newEvent) => {
    try {
        const event = new EventModel(newEvent);
        await event.save();

        let category = await Categorymodel.findOne({ name: newEvent.category });
        if (!category) {
            category = new Categorymodel({ name: newEvent.category });
            await category.save();
        }

        category.events.push(event._id);
        await category.save();

        return event;
    } catch (error) {
        console.error('Error al insertar el evento:', error);
        throw error;
    }
}

const dbUpdateEvent = async (id, updatedEvent) => {
    return await EventModel.findOneAndUpdate(
        { _id: id },
        updatedEvent,
        { new: true }
    );
}

const dbDeleteEvent = async (id) => {
    return await EventModel.findByIdAndDelete(id);
}

const findEventByName = async (searchParams) => {
    const { name, description } = searchParams;
    let searchQuery = {};

    if (name) {
        searchQuery.name = { $regex: name, $options: 'i' };
    }

    if (description) {
        searchQuery.description = { $regex: description, $options: 'i' };
    }

    return await EventModel.find(searchQuery).populate('category');
}

const dbGetEventsByCategory = async (categoryName) => {
    try {
        if (!categoryName) {
            throw new Error('El nombre de la categoría es obligatorio.');
        }

        const category = await Categorymodel.findOne({ name: categoryName }).populate('events');
        if (!category) {
            throw new Error(`Categoría "${categoryName}" no encontrada.`);
        }

        return category.events; // Devuelve los eventos como un array
    } catch (error) {
        console.error('Error al obtener eventos de la categoría:', error);
        throw error;
    }
}

module.exports = {
    dbGetEvents,
    dbGetEventById,
    dbInsertEvent,
    dbUpdateEvent,
    dbDeleteEvent,
    findEventByName,
    dbGetEventsByCategory,
    dbCreateEvent
};