angular.module('app').config(function($provide) {
	$provide.provider('TemplateResolver', function(AppConfig) {
		var baseUrl = AppConfig.contextPath+'assets';
		this.resolve = function(turl) {
			var components = [baseUrl,turl+'.html'];
			return components.join('/');
		};

		this.$get = function() {
			return this;
		};
	});
});
