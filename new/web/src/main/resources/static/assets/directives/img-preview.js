angular.module('app').config(function(DirectiveProvider) {
	DirectiveProvider.register('img-preview', function($window, $compile, $rootScope) {
		return {
			link: function(scope, element, attrs) {
				element.bind('click.cImagePreview', function (e) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('previewImage', attrs.ngSrc);
						$rootScope.$broadcast('cOverlay.shade', true);
					});
					e.stopPropagation();
				});
			}
		};
	});
});

