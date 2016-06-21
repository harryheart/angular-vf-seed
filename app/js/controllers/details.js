'use strict';

app.controller( 'DetailsCtrl', [
  '$scope',
  '$stateParams',
  'DataService',
  'sfCfg',
  function ( $scope, $stateParams, DataService, sfCfg ) {
    $scope.config = sfCfg;
    console.log('aid:' + $stateParams.id);
    DataService.getAccount( $stateParams.id ).then( function ( result ) {
      console.log(result);
      $scope.account = result;
    } );
} ] );
