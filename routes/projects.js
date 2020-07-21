const express = require('express'); 
const router = express.Router(); 
const projectsModel = require('../models/projects-model'); 
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
router.post('/api/post-projects', upload.any('file'), (req, res) => {

    const projects = new projectsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.files, 
    }); 


    console.log(req.file);
    

         projects.save()
                 .then(data => {
                    console.log(data);
                     res.status(200).json(data); 
                })
                .catch(err => {
                    res.status(400).json(err); 
                    console.log(err);
                });

            
}); 


router.delete('/api/delete-projects/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id; 

       projectsModel.findByIdAndRemove(id)
                    .then(data => {
                        console.log(data);
                            res.status(200).json(data)
                    }, err => {
                        console.log(err);
                        res.status(400).json(err); 
                    }); 
            
}); 

router.get('/api/projects', (req, res) => {
    projectsModel.find()
                 .then(data => {
                     res.status(200).json({'data': data}); 
                 })
                .catch(err => {
                    res.status(400).json(err); 
                }); 
}); 


router.get('/api/projects/:id', (req, res) => {
    projectsModel.findById(req.params.id)
                 .then(data => {
                     res.status(200).json({'data': data}); 
                 })
                .catch(err => {
                    res.status(400).json(err); 
                }); 
}); 


module.exports = router; 