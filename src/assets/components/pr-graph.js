angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-graph', {
		scope: {'prGraph':'='},
		controller: function($scope, $element, d3, moment, FiveThreeOneCalculator) {

			var el = {
				width: $element.width(),
				//height: $element.height()
				height: 200,
				mx: 10,
				my: 10
			};

			var records = [];

			var sx = d3.time.scale()
			var sy = d3.scale.linear()


			// bind to angular scope
			$scope.el = el;
			$scope.records = records;
			$scope.sx = sx;
			$scope.sy = sy;

			$scope.translate = function(r) {
				var x = sx(r.date);
				var y = sy(r.max);
				return "translate("+x+","+y+")";
			};

			$scope.line = d3.svg.line().x(lx).y(ly).interpolate("monotone");

			function lx(r) {
				return sx(r.date);
			}
			
			function ly(r) {
				return sy(r.max);
			}

			function extentX(r) {
				return r.date;
			}

			function extentY(r) {
				return r.max;
			}

			function update(data) {
				records = []
				angular.forEach(data, function(r) {
					records.push({
						date: moment(r.date, "YYYY-MM-DD"),
						max: FiveThreeOneCalculator.max(r.reps, r.weight),
						lift: r.lift
					});
				});	

				sx.domain(d3.extent(records, extentX)).range([0, (el.width-el.mx*2)])
				sy.domain(d3.extent(records, extentY)).range([0, (el.height-el.my*2)]) 
				$scope.records = records;
			}

			$scope.$watch('prGraph', update);
		}
	});
});
