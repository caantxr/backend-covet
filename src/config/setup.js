const { usersModel } = require( "../models" );


const createDefaultUsers = async () => {

    try {
        const count = await usersModel.estimatedDocumentCount();

        if( count > 0 ) return;

        // Crea roles por defecto
        const users = await Promise.all([
            new usersModel({
                name: "Super Admin: Covet",
                email: "superadmin@covet.co",
                password: "123456789",
                role: "super-admin"
            }).save(),

        ]);

        console.log( users );

    } catch (error) {
        console.error( error );
    }

}

module.exports = {
    createDefaultUsers
}