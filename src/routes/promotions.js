const express = require('express');
const router = express.Router();
const {
    getPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
} = require('../controllers/promotions');

router.get('/', getPromotions);
router.get('/:id', getPromotionById);
router.post('/', createPromotion);
router.patch('/:id', updatePromotion);
router.delete('/:id', deletePromotion);

module.exports = router;