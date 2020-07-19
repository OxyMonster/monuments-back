const mongoose= require('mongoose'); 


const dbURI = 'mongodb+srv://Oxymonster:zz753951@cluster0.1l7ki.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect( dbURI , { useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
  }, { useUnifiedTopology: true });
  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  }, { useUnifiedTopology: true });


  module.exports = mongoose; 
  
