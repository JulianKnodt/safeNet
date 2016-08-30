var fs = require('fs');

module.exports = {
  data: {
    get: function(req, res){
      fs.readFile('././././savedData/data.txt', function(err, data){
        res.send(data);
      });
    }
  }
}