'use strict';

var app = app || angular.module( 'app', [
  'ngAnimate',
  'ui.router',
  'ngTouch'
] );

var config = window.config || {
  templateBase: '',
  baseURL: ''
};

app.value('appConfig', config );
