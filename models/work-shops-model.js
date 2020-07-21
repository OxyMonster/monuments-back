const mongoose = require('mongoose'); 

const workShopsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    file: Object
}); 

const workShops = mongoose.model('WorkShops',workShopsSchema ); 

module.exports = workShops; 
