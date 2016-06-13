'use strict';

app.controller( 'ListCtrl', [
  '$scope',
  'DataService',
  function ( $scope, DataService ) {
    DataService.getAccounts( ).then( function ( result ) {
      $scope.accounts = result;
    } );
} ] );
