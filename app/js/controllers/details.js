'use strict';

app.controller( 'DetailsCtrl', [
  '$scope',
  '$stateParams',
  function ( $scope, $stateParams ) {
    console.log($scope.config);
} ] );
