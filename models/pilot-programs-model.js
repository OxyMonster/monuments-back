const mongoose = require('mongoose'); 

const pilotProgramsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    file: Object
}); 

const PilotPrograms = mongoose.model('PilotPrograms',pilotProgramsSchema ); 

module.exports = PilotPrograms; 
