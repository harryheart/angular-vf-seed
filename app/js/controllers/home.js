'use strict';

app.controller( 'HomeCtrl', [
  '$scope',
  function ( $scope ) {

  	$scope.weekDayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    $scope.weekDay = [];

    $scope.arry1 = [1, 2, 3, 4, 5, 6, 7];

    $scope.arry2 = [8, 9, 10, 11, 12, 13, 14];

    $scope.arry3 = [15, 16, 17, 18, 19, 20, 21];

    $scope.arry4 = [22, 23, 24, 25, 26, 27, 28];

    $scope.weekDay = $scope.arry2;


    $scope.swipeLeft = function () {
      $scope.weekDay = $scope.arry3;
    };

    $scope.swipeRight = function () {
      $scope.weekDay = $scope.arry1;
    };

    $scope.loadView = function () {
      console.log( 'Start loading home.html' );
    };

    $scope.viewDidLoad = function () {
      console.log( 'Animation is done' );
    };

} ] );
