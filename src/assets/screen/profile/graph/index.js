angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-graph-index', function($scope, $http, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao, moment, $q) {
		var each = angular.forEach;

		var defaultChartObject = {
			"type": "ComboChart",
			"displayed": true,
			"colors": ["red"],
			"data": {
				"cols": [
					{ "id": "month", "label": "Month", "type": "string", "p": {} },
					{ "id": "target-work", "label": "Target Work", "type": "number", "p": {} },
					{ "id": "max", "label": "Max", "type": "number", "p": {} },
					{ "id": "work", "label": "Work", "type": "number", "p": {} },
				],
			},
			"options": {
				  seriesType: "steppedArea",
				series: {
						0: { color: '#aaa', type: 'area'},
						1: { color: '#f00'},
						2: { color: '#00f', type: 'line' },
				},
				crosshair: { 
					trigger: 'both',
					orientation: 'vertical'
				},
				//tooltip: {
					//trigger: "selection"
				//},
				//selectionMode: "single",
				focusTarget: 'category',
				aggregationTarget: "category",
				"isStacked": "false",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
					"gridlines": {
						"count": 5
					},
					//viewWindow: {
						//min: 200,
						////max: ,
					//}
				},
				"hAxis": {
				}
			},
			"formatters": {}
		};

		$scope.charts = {};
		var loadData = function() {
			each(['press','deadlift','bench','squat'], function(lift) {
				var chart = angular.copy(defaultChartObject);
				chart.data.rows = [];

				var min = 9999;

				$http({
					url:'/api/graph', 
					params:{lift: lift}
				}).then(function(rsp) {
					var row = {};

					each(rsp.data, function(dp) {
						row = {
							c: [
								{v: dp.date},
								{v: dp.targetWork},
								{v: dp.max},
								{v: dp.work},
							]
						};

						if(min >= dp.max) {
							min = dp.max;
						}

						chart.data.rows.push(row);
					});

					chart.options.title = lift;
					chart.options.vAxis.minValue = min;
					$scope.charts[lift] = chart;

				});
			});
		};

		loadData();
	});

});
