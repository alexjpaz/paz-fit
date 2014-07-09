angular.module('app').config(function(ResourceProvider) {
	ResourceProvider.register('Watcher', '/watcher/:name');
	ResourceProvider.register('Event', '/event/:name');
});
