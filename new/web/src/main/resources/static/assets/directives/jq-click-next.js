angular.module('app').config(function(DirectiveProvider) {
	DirectiveProvider.register('jq-click-next', function($window, $compile, $rootScope) {
		return {
			link: function(scope, element, attrs) {
				element.bind('click.jqClickFile', function (e) {
					element.next().click();
				});
			}
		};
	});
});

