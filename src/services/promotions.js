const PromotionModel = require("../models/nosql/promotion");

// Obtener todas las promociones
const dbGetPromotions = async () => {
    return await PromotionModel.find();
}

// Obtener una promoción por ID
const dbGetPromotionById = async (id) => {
    return await PromotionModel.findById(id);
}

// Insertar una nueva promoción
const dbInsertPromotion = async (newPromotion) => {
    const promotion = new PromotionModel(newPromotion);
    return await promotion.save();
}

// Actualizar una promoción existente
const dbUpdatePromotion = async (id, updatedPromotion) => {
    return await PromotionModel.findByIdAndUpdate(id, updatedPromotion, { new: true });
}

// Eliminar una promoción
const dbDeletePromotion = async (id) => {
    return await PromotionModel.findByIdAndDelete(id);
}

// Aplicar una promoción
const applyPromotion = async (eventId, promoCode) => {
    const promotion = await PromotionModel.findOne({ code: promoCode, eventId });

    if (!promotion) {
        throw new Error('Código de promoción no válido.');
    }

    const currentDate = new Date();
    if (currentDate < promotion.startDate || currentDate > promotion.endDate) {
        throw new Error('La promoción no está activa.');
    }

    // Devuelve el porcentaje de descuento
    return promotion.discountPercentage;
};

module.exports = {
    dbGetPromotions,
    dbGetPromotionById,
    dbInsertPromotion,
    dbUpdatePromotion,
    dbDeletePromotion,
    applyPromotion
};
