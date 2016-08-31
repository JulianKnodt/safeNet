//Intercepting packets
var pcap = require('pcap2');
var session = new pcap.Session('', '');
var http = require('http');
// var grunt = require('../../Gruntfile.js');

var tcpTracker = new pcap.TCPTracker();
console.log('listening on', session.device_name);

session.on('packet', function(raw){
  var decoded = pcap.decode.packet(raw);
  tcpTracker.track_packet(decoded);
});

tcpTracker.on('session', function(session){
  console.log(session.src, '-->', session.dst_name);
  session.on('end', function(session){
    console.log('end of session from', session.src);
  });
});


module.exports = session;