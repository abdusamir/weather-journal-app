// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const port = 3030;
// Setup Server
app.listen(port, () => {
  console.log(`server is running on localhost: ${port}`);
});
//post request
app.post("/postData", (req, res) => {
  const newData = {
    time: req.body.time,
    temp: req.body.temp,
    content: req.body.feel,
  };
  projectData = newData;
});
// the get request
app.get("/getData", (req, res) => {
  res.send(projectData);
});
