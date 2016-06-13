'use strict';

app.config( [
  '$stateProvider',
  '$urlRouterProvider',
  function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider
    .state( 'home', {
      url: '/home',
      templateUrl: config.templateBase + 'templates/home.html',
      controller: 'HomeCtrl'
    } )
    .state( 'home.list', {
      url: '/list',
      templateUrl: config.templateBase + 'templates/list.html',
      controller: 'ListCtrl'
    } )
    .state( 'home.details', {
      url: '/details?id',
      templateUrl: config.templateBase + 'templates/details.html',
      controller: 'DetailsCtrl'
    } );

    $urlRouterProvider.otherwise( '/home/list' );
  }
] );
