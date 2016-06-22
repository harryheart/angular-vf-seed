'use strict';

app.controller( 'DetailsCtrl', [
  '$scope',
  '$stateParams',
  'DataService',
  'sfCfg',
  function ( $scope, $stateParams, DataService, sfCfg ) {
    $scope.config = sfCfg;
    DataService.getAccount( $stateParams.id ).then( function ( result ) {
      $scope.account = result;
    } );
} ] );
