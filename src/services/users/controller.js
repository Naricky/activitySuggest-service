const {createUser} = require('./model')

const create = async (db, user) => {
    try {
        return createUser(db, user)
    } catch (error) {
        throw new Error('Error while creating user', error);
    }
  }

module.exports = {
    create,
};


