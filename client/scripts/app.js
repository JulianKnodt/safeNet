angular.module('app', [
  'home',
  'ui.router'
  ])
.config(function($stateProvider){
  $stateProvider
  .state('/home', {
    url:'/home',
    templateUrl: 'scripts/home/home.html',
    controller: 'homeController'
  })
  .state('/listen', {
    url: '/listen',
    templateUrl: 'scripts/listen/listen.html',
    controller: 'listenController'
  });
})
.run(function($location){
  $location.path('/home');
})