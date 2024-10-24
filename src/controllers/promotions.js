const {
    dbGetPromotions,
    dbGetPromotionById,
    dbInsertPromotion,
    dbUpdatePromotion,
    dbDeletePromotion
} = require('../services/promotions');

const getPromotions = async (req, res) => {
    const promotions = await dbGetPromotions();
    res.json(promotions);
};

const getPromotionById = async (req, res) => {
    const promotion = await dbGetPromotionById(req.params.id);
    res.json(promotion);
};

const createPromotion = async (req, res) => {
    const newPromotion = req.body;
    const promotion = await dbInsertPromotion(newPromotion);
    res.status(201).json(promotion);
};

const updatePromotion = async (req, res) => {
    const updatedPromotion = await dbUpdatePromotion(req.params.id, req.body);
    res.json(updatedPromotion);
};

const deletePromotion = async (req, res) => {
    await dbDeletePromotion(req.params.id);
    res.status(204).send();
};

module.exports = {
    getPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
};