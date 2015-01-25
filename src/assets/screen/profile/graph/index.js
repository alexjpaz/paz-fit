angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-graph-index', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao, moment, $q) {
		var each = angular.forEach;

		$scope.chartObject = {
			"type": "SteppedAreaChart",
  "displayed": true,
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
        "label": "Deadlift",
        "type": "number",
        "p": {}
      },
	],
    "rows": [ ]
  },
  "options": {
    "title": "Sales per month",
    "isStacked": "true",
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
}

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
					$scope.chartObject.options.vAxis.viewWindow.min = min;
				}
			}
		};

		var loadData = function() {
			var promises = {};
			var params = {'feq_lift': 'press','ordering': '-date'};

			var data = {
			};

			promises.pr = PersonalRecordDao.find(params).then(function(records) {
				data.pr = records;
			});

			params = {'ordering': 'date'};
			promises.maxes = MaxesDao.find(params).then(function(maxes) {
				data.maxes = maxes;
			});
			
			$q.all(promises).then(function() {
				angular.forEach(data.maxes, function(rr) {
					fn.vMin(rr.deadlift);
					
					$scope.chartObject.data.rows.push({
						"c": [
							{
							"v": rr.date
						},
						{
							"v": rr.deadlift
						}
						]
					});
				})
			});
		};

		loadData();


		$scope.$on('prGraph.select', function($event, r, clickEvent) {
			$location.path('/profile/personal-record/edit')
			$location.search('date', moment(r.date).format('YYYY-MM-DD'));
		});
	});

});
