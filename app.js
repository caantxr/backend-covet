const express = require("express");
const cors = require("cors");
const dbConnect = require('./src/config/mongo');
const { createDefaultUsers, createDefaultCategories } = require("./src/config/register-default");
const { create } = require("./src/models/nosql/users");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("storage")); // Servir archivos estáticos desde la carpeta "storage"

const PORT = process.env.PORT || 3000; // Definir el puerto

/** Conexión a MongoDB */
dbConnect();
createDefaultUsers();
createDefaultCategories();

/** Rutas */
app.use("/api/auth", require("./src/routes/auth")); // Rutas para autenticación
app.use("/api/events", require("./src/routes/events")); // Rutas para eventos
app.use("/api/categories", require("./src/routes/categories")); // Rutas para Categorias
app.use("/api", require("./src/routes/comments")); // Rutas para comentarios
app.use('/api/reservations', require("./src/routes/reservations"));// Rutas para Reservas
app.use('/api/businesses', require("./src/routes/business"));

/** Iniciar el servidor */
app.listen(PORT, () => {
    console.log(`Tu app está lista por http://localhost:${PORT}`);
});