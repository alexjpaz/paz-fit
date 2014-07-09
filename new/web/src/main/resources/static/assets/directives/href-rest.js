angular.module('app').config(function(DirectiveProvider) {
	DirectiveProvider.register('href-rest', function() {
		return {
			link: function(scope, element, attrs) {
				function generateApiUrl(resourceUrl) {
					return 'rest'+resourceUrl;
				}
				attrs.$set("href",generateApiUrl(attrs.hrefRest));
			}
		};
	});
});
