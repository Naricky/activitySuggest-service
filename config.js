const dotenv = require('dotenv')
dotenv.config()

const { PORT, ACTIVITY_API } = process.env

module.exports = {
    PORT,
    ACTIVITY_API
};
