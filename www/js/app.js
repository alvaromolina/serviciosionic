// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/views/beers.html',
    controller: 'beerListController' 
  })
  $stateProvider.state('beer', {
    url: '/beers/:id',
    templateUrl: '/views/beer.html',
    controller: 'beerController'
  })
})

app.controller('beerListController',function($scope,$state, beers){
  //$scope.beers = [{name: 'pacena', abv: '7'}, {name: 'taquina', abv: '7'}];
  $scope.beers = [];
  beers.getBeers().success(function(data){
    $scope.beers = data.data;
    //$scope.count = $scope.beers.length;
  });
  $scope.count = function(){
    return $scope.beers.length;
  };
  $scope.loadMore = function() {
    beers.getBeers().success(function(data){
      $scope.beers = $scope.beers.concat(data.data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  
});


app.controller('beerController',function($scope, $stateParams){
  $scope.beer= {name: 'pacena', abv: '7'}, {name: 'taquina', abv: '7'};
});

app.provider('beers', function beersProvider() {
  var apiKey = '79d42c11684be398ee20b7769dd54d0f';
  this.setApikey = function(value) {
    apiKey = value;
  };

  this.$get = function beersFactory($http) {
    var factory = {};
    factory.getBeers = function(){
    return $http.jsonp('https://jsonp.afeld.me/?callback=JSON_CALLBACK&url=http%3A%2F%2Fapi.brewerydb.com%2Fv2%2Fbeers%3Fkey%3D'+apiKey+'%26format%3Djson%26styleId%3D2');
  };
  return factory;
  };
});

