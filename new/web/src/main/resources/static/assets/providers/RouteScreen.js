angular.module('app').config(function($provide) {
	/**
	 * RouteScreen
	 *
	 * Registers a route that maps to a screen template.
	 *
	 * example: RouteScreenProvider('/user/:userId', 'user/edit')
	 * This will map '/user/:userId' (e.g. '/user/5') will grab the screen template from "assets/screen/user/edit.html"
	 *
	 * @provider
	 */
	 $provide.provider('RouteScreen', function($routeProvider, TemplateResolverProvider) {
		 this.__screens = [];

		 this.when = function(urlPattern, screenUrl) {
			 var routeDef = {
				 templateUrl: TemplateResolverProvider.resolve('screen/'+screenUrl)
			 };
			 $routeProvider.when(urlPattern, routeDef); 

			 this.__screens.push(routeDef.templateUrl);
		 };

		 this.whenWildcard = function(urlPattern, screenUrl) {

			 var routeDef = {
				 templateUrl: function(params) {
					 var newScreenUrl = screenUrl;
					 angular.forEach(params, function(val, key) {
						 newScreenUrl = newScreenUrl.replace(':'+key, val);
					 });
					 return TemplateResolverProvider.resolve('screen/'+newScreenUrl);
				 }
			 };

			 $routeProvider.when(urlPattern, routeDef); 

			 this.__screens.push(routeDef.templateUrl);
		 };


		 this.redirect = function(fromUrl, toUrl) {
			 var routeDef = {
				 redirectTo: toUrl
			 };
			 $routeProvider.when(fromUrl, routeDef); 
		 };

		 $routeProvider.otherwise({
				 redirectTo: function(routeParams, path, search) {
					 return '/error/404?'+path;
				 }
		 }); 

		 this.$get = function() {
			 return this;
		 };
	 });
});
