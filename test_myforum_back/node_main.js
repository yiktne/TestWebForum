var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require('cors')();

const serverPort = 3001;

var app = express();

var mongoose = require("./node_db")();

app.use(cors);
app.use(bodyParser.json());
app.use(session({
  saveUninitialized:true,
  resave:true,
  secret:require("./secretdatas").sessionSecret,
  store:require("mongoose-session")(mongoose)
}));

var user = require('./schema/schema_user');

var router = require("./routes/router_user")(app, user);

var server = app.listen(serverPort, function(){
  console.log("NodeJS server open at port " + serverPort);
});