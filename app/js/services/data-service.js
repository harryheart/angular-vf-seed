'use strict';

app.factory( 'DataService', [
  '$q', '$http',
  function ( $q, $http ) {

  var getByCategory = function ( category ) {
    var deferred = $q.defer();
    $http.get( 'data/my-plate.json' ).then( function ( res ) {
      deferred.resolve( res.data[ category ] );
    } );

    return deferred.promise;
  };

  var getItem = function ( category, id ) {
    var deferred = $q.defer();
    $http.get( 'data/my-plate.json' ).then( function ( res ) {
      var items = res.data[ category ];
      for ( var i = 0; i < items.length; i++ ) {
        if ( items[ i ].id === id ) {
          deferred.resolve( items[ i ] );
          break;
        }
      }
    } );

    return deferred.promise;
  };

  return {
    getByCategory: getByCategory,
    getItem: getItem
  };
} ] );
