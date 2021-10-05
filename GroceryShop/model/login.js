var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    user_name : String,
    user_email : String,
    user_password : String,
    user_cpasswor : String
})

module.exports = mongoose.model('user',mySchema);