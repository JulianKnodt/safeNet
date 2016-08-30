//worker to check if urls are valid
var db = require('../db/db.js');
var key = require('../config/config.js').key;
var google = require('googleapis');
var safebrowsing = google.safebrowsing('v4');

module.exports = function(){
  db.Link.find({verified:2})
  .then(function(pending){
    var search = pending.map(function(toRead){
      return toRead.domain;
    });
    safebrowsing.threatMatches.find({auth: key}, {url:search[0]}, function(err, res){
      console.log(err);
      console.log(res);
    });
  });
}
