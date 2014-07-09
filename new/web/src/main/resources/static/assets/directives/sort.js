angular.module('app').config(function(DirectiveProvider) {
	/*
	 * @Directive
	 * @Params
	 * sort: The sort value to search for in the array. Prepend +/- to set the default sort.
	 */
	 DirectiveProvider.register('sort', function () {
		 return {
			 controller: function($scope, $attrs, $element) {

				 $scope.sort = {
					 order: '',
					 key: '',
					 value: ''
				 };

				 if(/^[+-]/.test($attrs.sort)) {
					 $scope.sort.order = $attrs.sort[0];
					 $scope.sort.key = $attrs.sort.slice(1);
					 $scope.sort.value = ($scope.sort.order + $scope.sort.key);
				 } else {
					 $scope.sort.order = '-';
					 $scope.sort.key = $attrs.sort;
				 }

				 $element.bind('click', function() {
					 $scope.$apply(function() {
						 if($scope.sort.order == "+") {
							 $scope.sort.order = "-";
						 } else {
							 $scope.sort.order = "+";
						 }

						 $scope.sort.value = ($scope.sort.order + $scope.sort.key); 
					 });
				 });
			 }
		 };
	 });
});
