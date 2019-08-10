const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    name: String,
    password: String,
    mail: String,
    img:{
        type:String,
        default:''
    }
});

const user = mongoose.model('Users',User);
module.exports = {user};