const mongoose = require('mongoose'); 

const userShcema = new mongoose.Schema({
    userName: String, 
    password: String,
}); 

const User = mongoose.model('User',userShcema ); 

module.exports = User; 
