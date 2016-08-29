//Intercepting packets
var pcap = require('pcap2');
var session = pcap.createSession('', "tcp");
session.on('packet', function(raw){
  var decoded = pcap.decode.packet(raw);
    console.log(decoded);
    // console.log(decoded);
});
module.exports = session;