var gzippo = require('gzippo');
var http = require('http');
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var connectRewrite = require('connect-modrewrite');

var app = express();
 
app.use(express.logger('dev'));
app.use(logger('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride());  // simulate DELETE and PUT
app.use(connectRewrite());
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
