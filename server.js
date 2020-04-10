// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Setup server
const port = 3000; 

//Spin up the server
const server = app.listen(port,listening);

function listening(){
    console.log(`running on localhost: ${port}`);
    
}

// GET route that returns projectData object from the server code
app.get('/all', function (req, res) {
    res.send(projectData);
  }); 

// POST route that adds incoming data to projectData
const data = [];
app.post('/add',incomingData )
function incomingData(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.userResponse;
    res.send(projectData);
  }
   

