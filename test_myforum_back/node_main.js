var express = require("express");
var cors = require('cors')();

const serverPort = 3001;

var app = express();

var mongoose = require("./node_db")();

app.use(cors);
app.use(express.json());

app.set("jwt-secret", require('./secretdatas').jwtSecret);

app.use('/', require("./routes/router_main"));

var server = app.listen(serverPort, function(){
  console.log("NodeJS server open at port " + serverPort);
});