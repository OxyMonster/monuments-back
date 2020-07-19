const express = require('express'); 
const router = express.Router(); 
const realizedProjectsModel = require('../models/realized-projects-model'); 
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


// * * * * Post Data * * * * *
router.post('/api/post-realized-projects', upload.single('file'), (req, res) => {

    const realizedProjects = new realizedProjectsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.file, 
    }); 


    console.log(req.file);
    
    realizedProjects.save()
                    .then(data => {
                        console.log(data);
                        res.status(200).json(data); 
                    })
                    .catch(err => {
                        res.status(400).json(err); 
                        console.log(err);
                    }); 

            
}); 


router.get('/api/get-realized-projects', (req, res) => {
    realizedProjectsModel.find()
                         .then(data => {
                             res.status(200).json({'data': data});
                         })
                         .catch(err => {
                             res.status(400).json(err); 
                         }); 
}); 


module.exports = router; 