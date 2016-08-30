//Intercepting packets
var pcap = require('pcap2');
var session = new pcap.Session('en0', '');
var http = require('http');
// var grunt = require('../../Gruntfile.js');

var tcpTracker = new pcap.TCPTracker();
console.log('listening on', session.device_name);

session.on('packet', function(raw){
  var decoded = pcap.decode.packet(raw);
  tcpTracker.track_packet(decoded);
});

tcpTracker.on('session', function(session){
  console.log(session.src, '-->', session.dst);
  session.on('end', function(session){
    console.log('end of session from', session.src);
  });
});

// tcpTracker.on('http request', function(session, http){

//   console.log(http);
// });


module.exports = session;