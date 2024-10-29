const {storageModel} = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL;
const   getItems = async (req, res) => { //obtener la lista de bases de datos
    const data = await storageModel.find({});
    
    res.send({ data });
}; 
const getItem = (req, res) => {}; //obtener detalle
const createItem = async (req, res) => { //insertar registro
    const { body, file } = req
    console.log(file)
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})
}; 
const updateItem = (req, res) => {}; //actualizar registro
const deleteItem = (req, res) => {}; //eliminar un registro

module.exports = {getItems, getItem, createItem, updateItem, deleteItem };