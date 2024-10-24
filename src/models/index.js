// Importar todos los modelos de la carpeta 'nosql'
const models = {
    // Modelo de usuarios
    usersModel: require('./nosql/users'),
    // Modelo de almacenamiento de archivos
    storageModel: require('./nosql/storage'),
    // Modelo de reservas de eventos
    reservationModel: require('./nosql/reservation'),
    // Modelo de promociones
    promotionModel: require('./nosql/promotion'),
    // Modelo de eventos
    eventsModel: require('./nosql/events'),
    // Modelo de retroalimentación de eventos
    eventFeedbackModel: require('./nosql/feedback'),
    // Modelo de comentarios
    commentModel: require('./nosql/comment'),
    // Modelo de categorías
    categoryModel: require('./nosql/category')
};

// Manejo de errores al cargar los modelos
Object.entries(models).forEach(([key, model]) => {
    if (!model) {
        console.error(`Error al cargar el modelo: ${key}`);
    }
});

// Exportar todos los modelos para su uso en otras partes de la aplicación
module.exports = models;
