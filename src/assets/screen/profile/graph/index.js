angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-graph-index', function($scope, $http, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao, moment, $q) {
		var each = angular.forEach;

		var defaultChartObject = {
			"type": "LineChart",
			"displayed": true,
			"colors": ["red"],
			"data": {
				"cols": [
					{
					"id": "month",
					"label": "Month",
					"type": "string",
					"p": {}
				},
				{
					"id": "deadlift",
					"label": "Max",
					"type": "number",
					"p": {}
				},
				{

					"id": "weight",
					"label": "Weight",
					"type": "number",
					"p": {}
				},
				{
					"id": "work",
					"label": "Work",
					"type": "number",
					"p": {}
				},
				],
			},
			"options": {
				"title": "Sales per month",
				"isStacked": "false",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
					"minValue": 20,
					"gridlines": {
						"count": 5
					},
					viewWindow: {
						min: 9999
					}
				},
				"hAxis": {
					"title": "Date",
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
								{v: dp.max},
								{v: dp.weight},
								{v: dp.work}
							]
						};

						if(min >= dp.max) {
							min = dp.max - 10;
						}

						chart.data.rows.push(row);
					});
				});


				chart.options.title = lift;
				chart.options.vAxis.viewWindow = min;
				$scope.charts[lift] = chart;
			});
		};

		loadData();
	});

});
