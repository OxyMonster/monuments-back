const mongoose = require('mongoose'); 

const projectsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    file: Object
}); 

const Projects = mongoose.model('Projects',projectsSchema ); 

module.exports = Projects; 
