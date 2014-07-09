angular.module('app').config(function($provide) {
	$provide.factory('iframeHelper', function($window, $rootScope) {
		function iframeHelper() {

			this.broadcast = function(eventName, argObj) {

				if (($window.window.top !== $window.window.self)) {
					 console.warn('Not in an iframe!');
				}

				if(angular.isUndefined($window.parent.__iframeBroadcast)) {
					throw 'Could not broadcast iframe event "'+eventName+'". Parent may not have an event listener instantiated.'; 
				}

				$window.parent.__iframeBroadcast(eventName, argObj);
			};

			this.__iframeBroadcast = function(eventName, argObj) {
				$rootScope.$apply(function() {
					$rootScope.$broadcast('iframeEvent', eventName, argObj);
					$rootScope.$broadcast('iframeEvent.' + eventName, argObj);
				});
			};
		}

		var instance = new iframeHelper();

		$window.__iframeBroadcast = instance.__iframeBroadcast;

		return instance;
	});

});

