const {eventsModel} = require('../models')
const   getItems = async (req, res) => { //obtener la lista de bases de datos
    const data = await eventsModel.find({});
    
    res.send({ data });
}; 
const getItem = (req, res) => {}; //obtener detalle
const createItem = async (req, res) => { //insertar registro
    const { body } = req
    console.log(body)
    const data = await eventsModel.create(body)
    res.send({data})
}; 
const updateItem = (req, res) => {}; //actualizar registro
const deleteItem = (req, res) => {}; //eliminar un registro

module.exports = {getItems, getItem, createItem, updateItem, deleteItem };