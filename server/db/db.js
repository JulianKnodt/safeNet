var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

var linkSchema = new mongoose.Schema({
  domain:  String,
  src: String,
  dest: String,
  timestamp: Number,
  verified: Number
});

// var safeLinkSchema = new mongoose.Schema({
//   domain
// })

var Link = mongoose.model('Link', linkSchema);

module.exports.mongoose = mongoose;
module.exports.Link = Link;