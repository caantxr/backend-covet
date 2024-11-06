const { Schema, model } = require( 'mongoose' );

// Definición del esquema para usuarios
const BusinessSchema = new Schema(
    {
        // Nombre del Negocio
        name: {
            type: String,
            required: true, // Campo obligatorio
        },
        description: String,
        location: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postalCode: String
        },
        contact: {
            // Correo electrónico del usuario
            email: {
                type: String,
                unique: true, // Debe ser único en la colección
                required: true, // Campo obligatorio
                match: /.+\@.+\..+/ // Validación básica de formato de correo
            },
            phone: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {
        timestamps: true,  // Crea automáticamente createdAt y updatedAt
        versionKey: false  // Desactiva el campo __v que mongoose agrega automáticamente
    }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = model( "business", BusinessSchema );
