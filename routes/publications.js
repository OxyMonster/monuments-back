const express = require('express'); 
const router = express.Router(); 
const publicationsModel = require('../models/publications-model'); 
const multer = require('multer'); 
const e = require('express');
const fs = require('fs'); 
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
router.post('/api/post-publications', upload.any('file'), (req, res) => {

    const publication = new publicationsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.files, 
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


router.delete('/api/delete-publications/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id; 

    publicationsModel.findByIdAndRemove(id)
                    .then(data => {
                        console.log(data);
                        fs.unlink(`./${data.file[0].path}`, (img) => {
                            console.log(img);
                            res.status(200).json(data)
                        }, err => console.log(err))

                    }, err => {
                        console.log(err);
                        res.status(400).json(err); 
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

router.get('/api/get-publications/:id', (req, res) => {
    publicationsModel.findById(req.params.id)
                     .then(data => {
                         res.status(200).json(data); 
                     })
                     .catch(err => {
                         res.status(400).json(err); 
                     }); 
}); 


module.exports = router; 