angular.module('listen', [])
.controller('listenController', function($scope, $http){
  var filterPacket = function(decodedPacket){
    var parseData = decodedPacket.split('\n');
    if(parseData[1] === undefined){
      return '';
    }
    parseData
    var domain = parseData[1].slice(parseData[1].indexOf('http'), parseData[1].indexOf('.com'));
    parseData[1] = 'Get Data from ' +  domain;
    return parseData.join('\n');
  };
  var collectPackets = function(){
    $http({
      url:'/data',
      method:'GET'
    }).success(function(data){
      $scope.packets = data.split('\n\n').map(function(packetInfo){
        return filterPacket(packetInfo);
      });
    }).error(function(err){
      console.log(err);
    });
  }
  $scope.clearPackets = function(){
    $http({
      url:'/data',
      method: 'DELETE'
    });
  }
  collectPackets();
  setInterval(collectPackets, 1000);
});