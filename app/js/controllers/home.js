'use strict';

app.controller( 'HomeCtrl', [
  '$scope', 'appConfig',
  function ( $scope, appConfig ) {
    $scope.baseURL = appConfig.baseURL;
} ] );
