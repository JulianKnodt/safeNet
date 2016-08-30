//worker to check if urls are valid
var db = require('../db/db.js');
var http = require('http');

// var options = {
//     host: 'closure-compiler.appspot.com',
//     port: '80',
//     path: '/compile',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// };


module.exports = function(){
  db.Link.find({verified: 2}).then(function(pending){

  });
}

// POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=API_KEY HTTP/1.1
// Content-Type: application/json