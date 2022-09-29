const createUser = async (db, user) => {
    // Note: We should validate if the user exist or not based on the
    // data schema, but since schema is not present and we are utilizing
    // fake DB, will ignore this step
    await db.setItem(user)
    return db.getCollection()
}

module.exports = {
    createUser,
};
