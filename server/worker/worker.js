//worker to check if urls are valid
var request = require("request-promise")
var db = require('../db/db.js');
var key = require('../config/config.js').key;
// var google = require('googleapis');
// var safebrowsing = google.safebrowsing('v4');
var malver = require('malver');

module.exports = function(){
  db.Link.find({verified:2})
  .then(function(pending){
    var search = pending.map(function(toRead){
      return {domain: toRead.domain, id:toRead._id};
    });
    if(search.length > 0){
      malver.analyze(search[0].domain, function(err, percent){
        if(percent < 25){
          db.Link.find({_id:search[0].id}).update({$set: {verified: 1}}).update().then(function(){
            console.log('safe');
          });
        } else {
          db.Link.find({_id:search[0].id}).update({$set: {verified: 3}}).update().then(function(){
            console.log('unsafe');
          });
        }
      });
    }
  });
}


