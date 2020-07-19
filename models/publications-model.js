const mongoose = require('mongoose'); 

const publicationsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    file: Object
}); 

const Publications = mongoose.model('Publications',publicationsSchema ); 

module.exports = Publications; 
