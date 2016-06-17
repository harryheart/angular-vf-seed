'use strict';

app.controller( 'DetailsCtrl', [
  '$scope',
  '$stateParams',
  'DataService',
  function ( $scope, $stateParams, DataService ) {
    console.log('aid:' + $stateParams.id);
    DataService.getAccount( $stateParams.id ).then( function ( result ) {
      console.log(result);
      $scope.account = result;
    } );
} ] );
