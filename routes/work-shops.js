const express = require('express'); 
const router = express.Router(); 
const workShopsModel = require('../models/work-shops-model');
const PilotPrograms = require('../models/pilot-programs-model');

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

// * * * Post Data * * * 
router.post('/api/post-work-shops', upload.single('file'), (req, res) => {

    const workShops = new workShopsModel({
        title: req.body.title, 
        description: req.body.description, 
        file: req.file
    }); 

    workShops.save()
             .then(data => {

                console.log(data);
                res.status(200).json(data); 
             })
             .catch(err => {
                res.status(400).json(err); 
                console.log(err);
             }); 

}); 


router.get('/api/get-work-shops', (req, res) => {
    workShopsModel.find()
                  .then(data => {
                      res.status(200).json({'data': data});
                  })
                  .catch(err => {
                      res.status(400).json(err); 
                  }); 
}); 


module.exports = router; 