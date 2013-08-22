(function(angular){
	var common = angular.module('components/common', ['utils/factory']);
	
	common.config(function($compileProvider) {
		$compileProvider.directive('ckeditor', function() {
			return {
				compile: function(element) {
					$(element).ckeditor();
				}
			}
		});
	});
})(angular);