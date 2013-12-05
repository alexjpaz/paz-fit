var App = angular.module('app',['ngResource','ngRoute','helper/factory']);
App.lazy = {};
App.lazy.ScreenFactory = function() {
	console.log('called screen');
};

App.screen = function() {
	console.log('called screen');
};
