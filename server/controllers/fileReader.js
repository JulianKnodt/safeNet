var fs = require('fs');
var db = require('../db/db.js')

var filterPacket = function(decodedPacket){
  var parseData = decodedPacket.split('\n');
  if(parseData[1] === undefined || parseData[0] === undefined){
    return;
  }
  var domain = parseData[1].slice(parseData[1].indexOf(' ') + 1);
  var src = parseData[0].slice(parseData[0].indexOf('[') + 1, parseData[0].indexOf(']'));
  var dest = parseData[0].slice(parseData[0].lastIndexOf('[') +1, parseData[0].lastIndexOf(']'));

  return {src:src, dest:dest, domain:domain};
};

var deleteCache = function(callback){
  fs.writeFile('././././savedData/data.txt', '', function(){
    callback();
  });
}

module.exports = {
  data: {
    get: function(req, res){
      db.Link.find().then(function(links){
        res.send(links);
      });
    },
    delete: function(req, res){
      deleteCache(function(){
        db.Link.find({}).remove({}).exec();
        res.send('');
      });
    },
    post: function(req, res){
      fs.readFile('././././savedData/data.txt', function(err, data){
        var entries = data.toString();
        entries = entries.split('\n\n').map(function(entry){
          return filterPacket(entry);
        });
        entries.forEach(function(entry){
          if(entry){
            new db.Link({
              domain:  entry.domain,
              src: entry.src,
              dest: entry.dest,
              timestamp: Date.now(),
              verified: 0
            }).save();
          }
        });
        deleteCache(function(){
          res.send('Finished Posting to database');
        });
      })
    }
  },
  url: {
    post: function(req, res){
      console.log(req.body._id);
      db.Link.find({_id:req.body._id}).update({$set: {verified: 2}}).update().then(function(){
        res.send('');
      });
    }
  }
}




