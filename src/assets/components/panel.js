angular.module('app').config(function(ComponentFactoryProvider){
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('panel', {
		replace: true,
		transclude: true,
		scope: {'panelTitle':'@'},
		compile: function(cElement) {
			return {
				post: function(scope, iElement, iAttrs, controller, transcludeFn) {
					scope.c = {};
					scope.c.hideBody = false;

					transcludeFn(function(tElement) {
						var tElements = [
							'panel-header',
							'panel-content'
						];


						angular.forEach(tElements, function(el) {
							cElement.find(el).replaceWith(tElement.filter(el));
						});
					});
				}
			};
		}
	});
});
