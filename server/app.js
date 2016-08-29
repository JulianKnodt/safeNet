var express = require('express');
var morgan = require('morgan');
var router = require('./config/router.js')

var app = express();

app.use(morgan('dev'));
app.use('/', router);


var port = process.env.PORT || 6969;



app.listen(port);
console.log('theLocals is listening on port', port);