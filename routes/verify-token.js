const jwt = require('jsonwebtoken'); 

module.exports  = function (req, res, next) {
    const token = req.header('Authorization'); 
    console.log(token);
    if(!token) return res.status(401).send('Permission Denied ;(');

    try {  
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); 
        req.user = verified;  
        next();     
    } catch (err) {
        console.log(err);
        res.status(400).send("Inavalid token"); 
    }
}; 
