//router
var router = require('router')();
var fileReader = require('../controllers/fileReader.js');

router.get('/data', fileReader.data.get);

router.delete('/data', fileReader.data.delete);

router.post('/data', fileReader.data.post);

router.post('/url', fileReader.url.post)

module.exports = router;