const mongoose = require('mongoose');

// Definición del esquema para las promociones
const PromotionSchema = new mongoose.Schema({
    // Código único de la promoción (ej. "DESCUENTO10")
    code: { 
        type: String, 
        required: true, // El código es obligatorio
        unique: true // Debe ser único en la base de datos
    },
    // Porcentaje de descuento que ofrece la promoción (0 a 100)
    discountPercentage: { 
        type: Number, 
        required: true, // El porcentaje es obligatorio
        min: 0, // El descuento no puede ser menor que 0
        max: 100 // El descuento no puede ser mayor que 100
    },
    // Fecha de inicio de la promoción
    startDate: { 
        type: Date, 
        required: true // La fecha de inicio es obligatoria
    },
    // Fecha de finalización de la promoción
    endDate: { 
        type: Date, 
        required: true // La fecha de finalización es obligatoria
    },
    // Eventos a los que se aplica la promoción
    applicableEvents: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'events' // Referencia a los eventos asociados a la promoción
    }]
}, {
    timestamps: true, // Se generarán createdAt y updatedAt automáticamente
    versionKey: false // Desactivar el campo __v que mongoose agrega automáticamente
});

// Middleware para validar que startDate no sea posterior a endDate
PromotionSchema.pre('save', function(next) {
    // Verifica que la fecha de inicio no sea posterior a la de finalización
    if (this.startDate > this.endDate) {
        return next(new Error('startDate no puede ser posterior a endDate'));
    }
    next(); // Continúa con el proceso de guardado
});

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = mongoose.model('Promotion', PromotionSchema);
