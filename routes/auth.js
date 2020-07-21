const express = require('express'); 
const router  = express.Router(); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const userSchema = require('../models/user-schema'); 
const User = require('../models/user-schema');
const verify = require('./verify-token'); 

router.post('/register', (req, res) => {

    bcrypt.genSalt(10)
          .then(salt => {
              bcrypt.hash(req.body.password, salt)
          .then(hashedPassword => {
            
            user = new userSchema({
                userName: req.body.userName,
                password: hashedPassword
            }); 

            user.save()
                .then(data => {
                    console.log(data);
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(400).json(err); 
                }); 

                }); 

          }); 

});



router.post('/api/login', (req, res) => {
    User.findOne({ userName: req.body.userName })
        .then(user => {
            
            if (!user) return res.status(200).json('wrong credentials'); 

            bcrypt.compare(req.body.password, user.password)
                  .then(data => {
                      console.log(data); 
                      if (data) {
                          //   Create Token 
                          const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
                          res.header('auth_token', token); 
                          res.status(200).send({'auth_token':token}); 

                      } else {
                          res.status(400).json("Wrong Credentials");
                      }
                        
                  })  
                  .catch(err => {
                      res.status(400).json(err); 
                  })
        });              
});


router.get('/api/user', verify, (req, res) => {
      
    User.findOne({_id: req.user})
        .then(user => {
            res.status(200).json(user); 
        })
        .catch(err => { 
            res.status(400).json(err); 
        }); 
}); 



module.exports = router; 