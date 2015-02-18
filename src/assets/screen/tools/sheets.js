angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-tools-sheets', function($scope, FiveThreeOneCalculator, PersonalRecordDao, $routeParams, MaxesDao, Profile, SheetHelper) {

		/** @var m model */
		$scope.m = {};

		var r = $scope.r = $routeParams;

		if(r.latestMax) {

		} else {

		}

		$scope.m = {
			fiveMonths: {
				increment: 5,
				cycles: 5
			},
			cycle: {
				p: +r.p,
				d: +r.d,
				b: +r.b,
				s: +r.s,
				pa: [],
				da: [],
				ba: [],
				sa: [],
			}
		};

		var sheetMap = {
			"531bbb": {
				url: "/api/table/531?{{ params }}"
			}
		};

		$scope.sheetUrl = "";

		var updateSheetUrl = function() {
			$scope.sheetUrl = SheetHelper.getUrl($scope.v.pane, $scope.m); 
		};

		$scope.useMax = function(lift) {
			$scope.m.fiveMonths.max = +$scope.r[lift[0]];
		};

		$scope.save = function(title, params) {
			var update = {
				sheets: {}
			};
			
			update.sheets[$scope.v.pane] = $scope.m;

			Profile.update(update);
		};

		$scope.$watch('m', function(m) {
			if(angular.isUndefined(m)) return;
			if(angular.isUndefined($scope.v)) return;
			updateSheetUrl();
		}, true);

		$scope.$watch('v.pane', function(pane) {
			if(angular.isUndefined(pane)) return;
			updateSheetUrl();
		}, true);

		$scope.$watch('m.fiveMonths', function(fiveMonths) {
			if(angular.isUndefined(fiveMonths)) return;
			var lifts = {};

			for(var i=0;i<fiveMonths.cycles;i++) {
				lifts['lift'+i] = fiveMonths.max+(fiveMonths.increment*i);
			}

			$scope.projectedMaxes = $.param(lifts);
		}, true);

		$scope.$watch('m.cycle', function(cycle) {
		},true);
	});
});

angular.module('app').constant('SheetMap', {
	"531bbb" : { url: '/api/table/531bbb?{{ cycle | paramString }}' },
	"531single" : { url: '/api/table/531x5?{{ cycle | paramString }}' },
	"531" : { url: '/api/table/531bbb?{{ cycle | paramString }}' },
	"531day" : { url: '/api/table/531day?{{ cycle| paramString }}' },
	"GZCL" : { url: '/api/table/GZCL?{{ cycle | paramString }}' },
});

angular.module('app').service('SheetHelper', function($interpolate, SheetMap) {
	this.getUrl = function(sheetName, context) {
		var sheet = SheetMap[sheetName];
		return $interpolate(sheet.url)(context);
	};
});
