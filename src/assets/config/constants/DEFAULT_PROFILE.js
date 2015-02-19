
//angular.module('app').constant('DEFAULT_PROFILE',{});
//angular.module('app').config(function($provide){
	//$provide.constant('DEFAULT_PROFILE', {});
//});
angular.module('app').constant('DEFAULT_PROFILE', {
	dateFomrat: 'YYYY-MM-DD',
	liftOrder: ['press','deadlift','bench','squat'],
	lift_order: ['press','deadlift','bench','squat'],
	dashboard: {
		graph: {
			limit: 5
		}
	}
});
