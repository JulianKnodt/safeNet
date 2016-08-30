//router
var router = require('router')();
var fileReader = require('../controllers/fileReader.js');


router.get('/nearby', function(){
  
});

router.get('/data', fileReader.data.get);

module.exports = router;