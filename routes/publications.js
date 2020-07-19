const express = require('express'); 
const router = express.Router(); 
const publicationsModel = require('../models/publications-model'); 
const multer = require('multer'); 
const e = require('express');

// * * * *  Multer Configurations * * * * 

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function(req, file, cb ) {
        cb(null, Date.now() + file.originalname)    
    }
}); 

let upload  = multer({storage: storage});     


// * * * * Post Data * * * * *
router.post('/api/post-publications', upload.single('file'), (req, res) => {

    const publication = new publicationsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.file, 
    }); 


    console.log(req.file);
    
     publication.save()
                .then(data => {
                console.log(data);
                res.status(200).json(data); 
                })
                .catch(err => {
                res.status(400).json(err); 
                console.log(err);
                });

            
}); 


router.get('/api/get-publications', (req, res) => {
    publicationsModel.find()
                     .then(data => {
                         res.status(200).json(data); 
                     })
                     .catch(err => {
                         res.status(400).json(err); 
                     }); 
}); 


module.exports = router; 