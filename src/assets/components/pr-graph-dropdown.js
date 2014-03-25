angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-graph-dropdown', {
			controller: function($scope, $element, $document) {
				var elMenu = $element.find('ul');
				$scope.toggle = function(type) {
					$scope.$emit('prGraphDropdown.toggle', type);
					elMenu.css({display:'none'});
				};

				$document.bind('click', function() {
					elMenu.css({display:'none'});
				});

				$scope.$on('prGraphDropdown.menu', function($event, clickEvent) {
					elMenu.css({display:'block'});
					var m = {
						x: clickEvent.pageX,
						y: clickEvent.pageY
					};
					$element.css({
							left: m.x,
							top: m.y,
							position: 'fixed'
					});

				});
			}
	});
});

