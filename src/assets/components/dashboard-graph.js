angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('dashboard-graph', {
		scope: {},
		controller: function($scope, $http, $routeParams, PersonalRecordDao, FiveThreeOneCalculator, $location, MaxesDao, moment, $q, Profile) {
			var each = angular.forEach;

			$scope.charts = {};
			$scope.v = {
				lift: "press",
				limit: Profile.get('dashboard.graphs.limit')
			};


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
						{ "id": "maxShift", "label": "Max check", "type": "number", "p": {} },
						{ "id": "average", "label": "Average", "type": "number", "p": {} },
					],
				},
				"options": {
					seriesType: "steppedArea",
					series: {
						0: { color: '#aaa', type: 'area'},
						1: { color: '#f00'},
						2: { color: '#00f', type: 'line' },
						3: { color: '#444', type: 'line',  lineDashStyle: [4, 4]},
						4: { color: '#888', type: 'line',  lineDashStyle: [4, 4]},
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
					"displayExactValues": false,
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
						showTextEvery: 10
					}
				},
				"formatters": {}
			};




			$scope.charts = {};

			var loadData = function(v) {
				if(angular.isUndefined(v)) return; 
				var chart = angular.copy(defaultChartObject);
				chart.data.rows = [];

				var min = 9999;

				$http({
					url:'/api/graph', 
					params: v,
				}).then(function(rsp) {
					var row = {};

					each(rsp.data, function(dp,i) {
						row = {
							c: [
								{v: dp.date},
								{v: Math.round(dp.targetWork)},
								{v: dp.max},
								{v: Math.round(dp.work)},
								{
									//v: (dp.max >= dp.work ? dp.work : null)
								},
							]
						};

						try {
							row.c.push({
								v:  Math.round((rsp.data[i].work+rsp.data[i-1].work+rsp.data[i+1].work) / 3 )
							});
						} catch(e) {}

						if(min >= dp.max) {
							min = dp.max;
						}

						chart.data.rows.unshift(row);
					});

					chart.options.title = v.lift;
					chart.options.vAxis.minValue = min;
					$scope.charts[v.lift] = chart;

				});
			};

			$scope.$watch('v', loadData, true);
		}
	});

});
