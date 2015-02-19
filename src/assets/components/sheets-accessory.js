angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('sheets-accessory', {
		scope: {
			'name': '@'
		},
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			scope.mdl = [];
			scope.add = function() {
				scope.mdl.push({ 
					value: 100 
				});
			};

			scope.$watch('mdl', function(mdl) {
				var arr = [];
				angular.forEach(mdl, function(mm) {
					if(!mm) return;
					arr.push(mm.value);
				});
				ngModel.$setViewValue(arr);
			}, true);

			//ngModel.$parsers.push(function(value) {
				//scope.mdl = value;
			//});
		}
	});
});
