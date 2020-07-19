const express = require('express'); 
const router = express.Router(); 
const pilotProgramsModel = require('../models/pilot-programs-model'); 
const multer = require('multer'); 

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


router.post('/api/post-pilot-programs', upload.single('file'), (req, res) => {

    const pilotPrograms = new pilotProgramsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.file, 
    }); 


    console.log(req.file);
    

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


router.get('/api/get-pilot-programs', (req, res) => {

    pilotProgramsModel.find()
                      .then(data => {
                        res.status(200).json({'data': data}); 
                      })
                      .catch(err => {
                          res.status(400).json(err); 
                      })
}); 


module.exports = router; 