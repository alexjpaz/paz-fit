angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('dashboard-event-status', {
		componentGroup: 'dashboard',
		replace: true,
		scope: {
			'e': '=dashboardEventStatus'
		},
		controller: function($scope) {
		}
	});
});
