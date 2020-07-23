const express  = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const dotEnv = require('dotenv'); 
const compression = require('compression');

dotEnv.config(); 

// * * * MiddleWares * * * *

app.use(cors()); 
app.use(compression());     
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()); 
  
// * * * Routes * * * 

const auth = require('./routes/auth'); 
const pilotPrograms = require('./routes/pilot-programs'); 
const projects = require('./routes/projects'); 
const publications = require('./routes/publications'); 
const realizedProjects = require('./routes/realized-projects'); 
const workShops = require('./routes/work-shops'); 
const fileUploads = require('./routes/file-uploads'); 

  
app.use(auth); 
app.use(projects); 
app.use(publications); 
app.use(realizedProjects); 
app.use(workShops); 
app.use(pilotPrograms); 
app.use(fileUploads);



// * * * Connect to MongoDB  * * * * 
const mongoDB = require('./server'); 

// * * * Server • • • 
var server = app.listen(8081, function () {
    //    var host = server.address().address
       var port = server.address().port
       
       console.log("Example app listening at", port)
}); 