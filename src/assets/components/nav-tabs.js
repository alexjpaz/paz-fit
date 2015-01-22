angular.module('app').directive('navTabs', function() {
	return {
		scope: {
			"navTabs": "="
		},
		controller: function($scope) {
			this.currentTab = function() {
				return $scope.navTabs;
			};
			this.changeTab = function(tab) {
				$scope.navTabs = tab;
			};
		}
	};
});
