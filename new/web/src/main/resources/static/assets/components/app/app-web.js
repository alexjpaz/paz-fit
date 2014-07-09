angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('app-web', {
			componentGroup: 'app',
			replace: true,
			controller: function($location, $window, $scope, $element, $rootScope, $route) {
				$scope.isSidebarCollapsed = true;

				$scope.toggleSidebar = function () {
					if($scope.isSidebarCollapsed) {
						$element.addClass('app-web--fullscreen');	
					} else{
						$element.removeClass('app-web--fullscreen');
					}
					$scope.isSidebarCollapsed = !$scope.isSidebarCollapsed;
				};

				console.debug('Forcing Route Reload... this is a bug :(');
				$route.reload();
			}

				});

	});
