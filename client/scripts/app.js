angular.module('app', [
  'home',
  'ui.router'
  ])
.config(function($stateProvider){
  $stateProvider
  .state('/listening', {
    templateUrl: '/home/home.html',
    controller: 'homeController'
  });
})
.run(function($location){
  $location.path('/home');
})