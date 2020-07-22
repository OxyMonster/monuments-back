const express = require('express'); 
const router = express.Router(); 
const realizedProjectsModel = require('../models/realized-projects-model'); 
const multer = require('multer'); 
const realizedProjects = require('../models/realized-projects-model');
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
router.post('/api/post-realized-projects', upload.any('file'), (req, res) => {

    const realizedProjects = new realizedProjectsModel({
        title: req.body.title,
        description: req.body.description,
        file: req.files, 
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


router.delete('/api/delete-realized-projects/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id; 

    realizedProjectsModel.findByIdAndRemove(id)
                         .then(data => {
                            fs.unlink(`./${data.file[0].path}`, (img) => {
                                console.log(img);
                                res.status(200).json(data)
                            }, err => console.log(err))
                             console.log(data);

                        }, err => {
                            console.log(err);
                            res.status(400).json(err); 
                        }); 
            
}); 


router.get('/api/realized-projects', (req, res) => {
    realizedProjectsModel.find()
                         .then(data => {
                             res.status(200).json({'data': data});
                         })
                         .catch(err => {
                             res.status(400).json(err); 
                         }); 
}); 
    
router.get('/api/realized-projects/:id', (req, res) => {
    realizedProjectsModel.findById(req.params.id)
                         .then(data => {
                             res.status(200).json({'data': data});
                         })
                         .catch(err => {
                             res.status(400).json(err); 
                         }); 
}); 


module.exports = router; 