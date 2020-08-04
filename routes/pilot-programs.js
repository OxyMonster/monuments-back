const express = require('express'); 
const router = express.Router(); 
const pilotProgramsModel = require('../models/pilot-programs-model'); 
const multer = require('multer'); 
const verify = require('./verify-token'); 
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


router.post('/api/post-pilot-programs', upload.any('file'), (req, res) => {

    const pilotPrograms = new pilotProgramsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.files, 
    }); 


    console.log(req.files);
    

           pilotPrograms.save()
                        .then(data => {
                            console.log(data);
                            res.status(200).json(data); 
                        })
                        .catch(err => {
                            res.status(400).json(err); 
                            console.log(err);
                        });

            
}); 

   

router.delete('/api/delete-pilot-projects/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id; 

  pilotProgramsModel.findByIdAndRemove(id)
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

router.get('/api/pilot-projects', (req, res) => {

    pilotProgramsModel.find()
                      .then(data => {
                        res.status(200).json({'data': data}); 
                      })
                      .catch(err => {
                          res.status(400).json(err); 
                      })
}); 


router.get('/api/pilot-projects/:id', (req, res) => {

    pilotProgramsModel.findById(req.params.id)
                      .then(data => {
                        res.status(200).json({'data': data}); 
                      })
                      .catch(err => {
                          res.status(400).json(err); 
                      })
}); 
  

module.exports = router; 