angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-graph-index', function($scope, $http, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao, moment, $q) {
		var each = angular.forEach;

		$scope.chartObject = {
			"type": "SteppedAreaChart",
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
				],
				"rows": [ ]
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

		$scope.records = {};
		$scope.params = [
			{'feq_lift': 'press','ordering': '-date'},
			//{'feq_lift': 'bench','ordering': '-date'},
			//{'feq_lift': 'squat','ordering': '-date'},
			//{'feq_lift': 'press','ordering': '-date'},
		];

		fn = {
			vMin: function(min) {
				if($scope.chartObject.options.vAxis.viewWindow.min > min) {
					$scope.chartObject.options.vAxis.viewWindow.min = min - 20;
				}
			}
		};

		var loadData = function() {
			$http.get('/api/graph', {lift: "press"}).then(function(rsp) {
				var row = {};

				each(rsp.data, function(dp) {
					row = {
						c: [
							{v: dp.date},
							{v: dp.max},
							{v: dp.weight}
						]
					};

					fn.vMin(dp.max)

					$scope.chartObject.data.rows.push(row);
				});
			});

			console.debug($scope.chartObject);
		};

		loadData();


		$scope.$on('prGraph.select', function($event, r, clickEvent) {
			$location.path('/profile/personal-record/edit')
			$location.search('date', moment(r.date).format('YYYY-MM-DD'));
		});
	});

});
