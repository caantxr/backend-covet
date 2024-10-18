const removePropertyUsers = (bjson) => {
    const dataUser = bjson.toObject();

    delete dataUser.password;
    delete dataUser.createdAt;
    delete dataUser.updatedAt;

    return dataUser;
}

module.exports = {removePropertyUsers}