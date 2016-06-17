'use strict';

app.factory( 'DataService', [
  '$q', '$http',
  function ( $q, $http ) {

  var getAccounts = function ( ) {
    var deferred = $q.defer();
    $http.get( 'data/accounts.json' ).then( function ( res ) {
      deferred.resolve( res.data.records );
    } );

    return deferred.promise;
  };

  var getAccount = function ( id ) {
    var deferred = $q.defer();
    $http.get( 'data/accounts.json' ).then( function ( res ) {
      var accounts = res.data.records;
      for ( var account of accounts ) {
        if ( account.Id === id ) {
          deferred.resolve( account );
          break;
        }
      }
    } );

    return deferred.promise;
  };

  return {
    getAccounts: getAccounts,
    getAccount: getAccount
  };
} ] );
