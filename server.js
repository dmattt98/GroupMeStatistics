var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var database = require('config/database');
mongoose.connect(database.url);

require('app/routes')(app, router);

app.listen(3000);