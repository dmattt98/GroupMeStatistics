var express     = require('express');
var bodyParser  = require('body-parser');
var request     = require("request");
var pouch       = require("pouchdb");
//var config      = require('./app/config/config');

var app = express();

app.use(bodyParser.json());


var server = app.listen(8000, function() {
    var host = server.address().host;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});