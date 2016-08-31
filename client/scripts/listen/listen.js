angular.module('listen', [])
.controller('listenController', function($scope, $http){
  $scope.collectPackets = function(){
    $http({
      url:'/data',
      method:'POST'
    })
    .success(function(){
      $http({
        url:'/data',
        method:'GET'
      })
      .success(function(data){
        data.forEach(function(entry){
          entry.timestamp = new Date(entry.timestamp).toLocaleDateString() + " " + new Date(entry.timestamp).toLocaleTimeString();
        });
        $scope.packets = data.reverse();
      });
    });
  }
  $scope.clearPackets = function(){
    $http({
      url:'/data',
      method: 'DELETE'
    }).then(function(){
      $scope.collectPackets();
    });
  }
  $scope.mark = function(obj){
    $http.post('/url', JSON.stringify(obj))
    .then(function(){
      $scope.collectPackets();
    });
  }

  $scope.color = function(verified){
    if(verified === 0){
      return 'yellow darken-1';
    } else if(verified === 1){
      return 'green';
    } else if(verified === 3){
      return 'red accent-4';
    } else if(verified === 2){
      return 'blue';
    }
    return 'gray';
  }
  $scope.collectPackets();
})
.directive('link', function(){
  var directive = {};
  directive.templateUrl = 'scripts/listen/linkCard.html';
  return directive;
});