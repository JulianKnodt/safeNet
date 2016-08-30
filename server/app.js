var express = require('express');
var morgan = require('morgan');
var router = require('./config/router.js');
var bodyParser = require('body-parser');
var packetReader = require('./controllers/packetReader.js');
var worker = require('./worker/worker.js');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'))
app.use('/', router);

var port = process.env.PORT || 6969;

worker();


app.listen(port);
console.log('safeNet is listening on port', port);