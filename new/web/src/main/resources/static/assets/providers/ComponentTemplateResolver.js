angular.module('app').config(function($provide) {	
	$provide.provider('ComponentTemplateResolver', function(AppConfig, TemplateResolverProvider) {
		var baseComponentUrl = AppConfig.contextPath+'assets/components';
		this.resolve = function(componentName, componentGroup) {
			var components = [baseComponentUrl,componentGroup,componentName+'.html'];
			return components.join('/');
		};

		this.$get = function() {
			return this;
		};
	});
});
