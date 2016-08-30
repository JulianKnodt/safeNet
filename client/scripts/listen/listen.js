angular.module('listen', [])
.controller('listenController', function($scope, $http){
  var filterPacket = function(decodedPacket){
    var parseData = decodedPacket.split('\n');
    if(parseData[1] === undefined){
      return;
    }
    var domain = parseData[1].slice(parseData[1].indexOf(' ') + 1);
    parseData[1] = domain;
    return {parsed: parseData.join('\n'), domain:domain};
  };
  var collectPackets = function(){
    $http({
      url:'/data',
      method:'GET'
    }).success(function(data){
      $scope.packets = data.split('\n\n').map(function(packetInfo){
        var filtered = filterPacket(packetInfo);
        if(filtered !== undefined){
          return {
            packet: filtered.parsed,
            domain: filtered.domain, 
            verified: 0
          };
        }
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
  $scope.mark = function(obj){
    obj.verified = 2;
    $http({
      url:'/data',
      method: 'POST',
      data: obj
    })
  }
  collectPackets();
  setInterval(collectPackets, 1000);

  $scope.color = function(verified){
    if(verified === 0){
      return 'yellow';
    } else if(verified === 1){
      return 'green';
    } else if(verified === -1){
      return 'red';
    } else if(verified === 2){
      return 'blue';
    }
    return 'gray';
  }
})
.directive('link', function(){
  var directive = {};
  directive.templateUrl = 'scripts/listen/linkCard.html';
  return directive;
});