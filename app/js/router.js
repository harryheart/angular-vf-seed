'use strict';

app.config( [
  '$stateProvider',
  '$urlRouterProvider',
  function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider
    .state( 'home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    } )
    .state( 'list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    } )
    .state( 'details', {
      url: '/details?id',
      templateUrl: 'templates/details.html',
      controller: 'DetailsCtrl'
    } );
    
    $urlRouterProvider.otherwise( '/home' );
  }
] );
