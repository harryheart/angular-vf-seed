'use strict';

app.controller( 'HomeCtrl', [
  '$scope', 'sfCfg',
  function ( $scope, sfCfg ) {
    console.log(JSON.stringify(sfCfg));
} ] );
