const mongoose= require('mongoose'); 


const dbURI = 'mongodb://localhost:27017/myapp';
mongoose.connect( dbURI , { useUnifiedTopology: true });

mongoose.connection.once('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
  }, { useUnifiedTopology: true });
  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  }, { useUnifiedTopology: true });


  module.exports = mongoose; 
  
