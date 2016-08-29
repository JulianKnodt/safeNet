//Intercepting packets
var pcap = require('pcap2');
var session = pcap.createSession('', "tcp");
var tcpTracker = new pcap.TCPTracker();


session.on('packet', function(raw){
  var decoded = pcap.decode.packet(raw);
  tcpTracker.track_packet(decoded);
});

tcpTracker.on('session', function(session){
  console.log(session.src, 'and', session.dst);
  session.on('end', function(session){
    console.log('end of session from', session.src);
  });
});

module.exports = session;