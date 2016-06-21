'use strict';

app.config( [
  '$stateProvider',
  '$urlRouterProvider',
  'sfCfg',
  function ( $stateProvider, $urlRouterProvider, sfCfg ) {
    $stateProvider
    .state( 'home', {
      url: '/home',
      templateUrl: sfCfg.templateBase + 'templates/home.html',
      controller: 'HomeCtrl'
    } )
    .state( 'home.list', {
      url: '/list',
      templateUrl: sfCfg.templateBase + 'templates/list.html',
      controller: 'ListCtrl'
    } )
    .state( 'home.details', {
      url: '/details?id',
      templateUrl: sfCfg.templateBase + 'templates/details.html',
      controller: 'DetailsCtrl'
    } );

    $urlRouterProvider.otherwise( '/home/list' );
  }
] );
