const mongoose = require('mongoose'); 

const realizedProjectsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    file: Object
}); 

const realizedProjects = mongoose.model('Culture',realizedProjectsSchema ); 

module.exports = realizedProjects; 
