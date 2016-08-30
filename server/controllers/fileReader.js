var fs = require('fs');

module.exports = {
  data: {
    get: function(req, res){
      fs.readFile('././././savedData/data.txt', function(err, data){
        res.send(data);
      });
    },
    delete: function(req, res){
      fs.writeFile('././././savedData/data.txt', '', function(){
        console.log('deleted');
        res.send(''); 
      });
    }
  }
}