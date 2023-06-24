require('dotenv').config()
const url = process.env.MONGO_URL;
module.exports = {
    url: url
}