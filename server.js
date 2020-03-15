var express = require("express"),
  app = express(),
  port = process.env.PORT || 40015,
  mongoose = require("mongoose"),
  User = require("./api/models/userModel"), //created model loading here
  bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/userdb");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

var routes = require("./api/routes/userRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("RESTful API server started on: " + port);
