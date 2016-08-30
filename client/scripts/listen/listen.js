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
        return {
          packet: filterPacket(packetInfo), 
          verified: 0};
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
    console.log(obj);
  }
  collectPackets();
  setInterval(collectPackets, 1000);

  $scope.color = function(verified){
    console.log('ran?');
    if(verified === 0){
      return 'yellow';
    } else if(verified === 1){
      return 'green';
    } else if(verified === -1){
      return 'red';
    }
    return 'blue';
  }
})
.directive('link', function(){
  var directive = {};
  directive.templateUrl = 'scripts/listen/linkCard.html';
  return directive;
});