'use strict';

var app = app || angular.module( 'app', [
  'ngAnimate',
  'ui.router',
  'ngTouch'
] );

config = config || {
  templateBase: '',
  baseURL: ''
};

app.value('appConfig', config );

console.log(config);
