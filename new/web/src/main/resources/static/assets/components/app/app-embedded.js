angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('app-embedded', {
			componentGroup: 'app',
			controller: function($element, App, $route) {
				var $bs = $('#abisPortalBootstrap');

				$bs.find('.PContent').appendTo($bs);
				$bs.find('.PTitle').remove();
				$bs.find('.PContentBorder').remove();

				App.portalMode = true;

				console.debug('Forcing Route Reload... this is a bug :(');
				$route.reload();
			}
	});
});
