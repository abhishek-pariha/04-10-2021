const monggose = require('mongoose');
const Schema = monggose.Schema;

const mySchema = new Schema({
    user_name : String,
    user_email : String,
    user_password : String
})

module.exports = monggose.model('userapi',mySchema);