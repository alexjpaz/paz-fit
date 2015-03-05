angular.module('helper').provider('RouteBuilder', function(TemplateResolverProvider, AssetLoaderProvider, $routeProvider) {
	var TemplateResolver = TemplateResolverProvider.$get();
	var AssetLoaderProvider = AssetLoaderProvider.$get();

	function RouteBuilder() {
		this.redirect = function(urlPattern, redirectUrl) {
			var routeConfigObj = {
				redirectTo: redirectUrl	
			};
			$routeProvider.when(urlPattern, routeConfigObj);
		};

		this.when = function(urlPattern, screenName, override) {
			var routeConfigObj = {
				templateUrl: TemplateResolver.screen(screenName),
				resolve: {
					load: function ($q, $rootScope, AssetLoader) {
						var deferred = $q.defer();

						// TODO: rm
						AssetLoader.screen(screenName, function() {

							if ($rootScope.$$phase) { 
								return deferred.resolve();
							} else {
								$rootScope.$apply(function () {
									deferred.resolve();
								});
							}

							$rootScope.$broadcast('ScreenLoaded');
						});

						return deferred.promise;
					},
					profiles: function($q, Profile) {
						var promise = Profile.init();
						return promise;
					}
				},
				reloadOnSearch: false
			};

			angular.extend(routeConfigObj,override);

			console.debug(routeConfigObj, override)

			$routeProvider.when(urlPattern, routeConfigObj);
		};

		this.whenSearch = function(urlPattern, screenName) {
			var override = {
				reloadOnSearch: true
			};
			this.when(urlPattern, screenName, override);
		};
	}

	this.$get = function() {
		return new RouteBuilder();
	};
});

