angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-graph', {
		scope: {'prGraph':'=', 'prGraphMaxes':'=', 'prGraphKey':'@'},
		controller: function($scope, $element, d3, moment, FiveThreeOneCalculator, jQuery) {
			$scope.hide = {};

			var $el_drop = $element.find('pr-graph-x-dropdown');
			$element.bind('contextmenu', function(ev) {
				ev.preventDefault();
				$scope.$broadcast('prGraphDropdown.menu', ev);
				$scope.$apply();
			});

			$scope.$on('prGraphDropdown.toggle', function($event, type) {
				$scope.hide[type] = !$scope.hide[type];
			});

			var el = {
				width: $element.width(),
				//height: $element.height()
				height: 200,
				mx: 10,
				my: 10
			};

			var records = [];
			var maxes = [];

			var sx = d3.time.scale()
			var sy = d3.scale.linear()


			// bind to angular scope
			$scope.el = el;
			$scope.records = records;
			$scope.maxes = maxes;
			$scope.sx = sx;
			$scope.sy = sy;

			$scope.translate = function(r) {
				var x = sx(r.date);
				var y = sy(r.max);
				return "translate("+x+","+y+")";
			};

			$scope.translateMax = function(m) {
				var x = sx(m.date);
				var y = sy(m.max);
				return "translate("+x+","+y+")";
			};

			$scope.line = d3.svg.line().x(lx).y(ly).interpolate("monotone");
			$scope.lineStep = d3.svg.line().x(lx).y(ly).interpolate("step-before");

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
						_date: r.date,
						date: moment(r.date, "YYYY-MM-DD"),
						max: FiveThreeOneCalculator.max(r.weight, r.reps),
						lift: r.lift,
						r: r
					});
				});	

				sx.domain(d3.extent(records, extentX)).range([0, (el.width-el.mx*2)])
				sy.domain(d3.extent(records, extentY)).range([(el.height-el.my*2), 0]) 
				$scope.records = records;
				$scope.syTicks = sy.ticks(12);
			}

			function updateMaxes(data) {
				maxes = [];

				angular.forEach(data, function(m) {
					maxes.push({
						date: moment(m.date, "YYYY-MM-DD"),
						max: m[$scope.prGraphKey]
					});
				});

				if(maxes.length > 0) {
					maxes.unshift({
							date: moment('2015-12-01', "YYYY-MM-DD"),
							max: maxes.slice(-1)[0].max
					});
				}

				$scope.maxes = maxes;
			}

			function updateDelta() {
				if($scope.selectedNodes.length == 2) {
					$scope.delta = +$scope.selectedNodes[0].max - +$scope.selectedNodes[1].max;
				} else {
					$scope.delta = 0;
				}
			}

			$scope.highlight = function(r) {
				$scope.$emit('prGraph.highlight', r);
				$scope.$emit('screen-profile-personal-record-list__highlight-pr', r.r);
				$scope.selectedNode = r;
			};

			$scope.select = function($event, r) {
				if($event.ctrlKey) { // TODO: probably should remove this as tablets dont have a ctrl button :(
					if($scope.selectedNodes.length == 2) {
						$scope.selectedNodes[1] = r;
					} else {
						$scope.selectedNodes.push(r);
					}
				}
				updateDelta();
				$scope.$emit('prGraph.select', r, clickEvent);
			};

			$scope.deselect = function($event, r) {
				if($event.ctrlKey) {
					angular.forEach($scope.selectedNodes, function(n,i) {
						if(n === r) {
							$scope.selectedNodes.splice(i,1);
						}
					});
				} else {
					$scope.selectedNodes = [];
				}
				updateDelta();
				$scope.$emit('prGraph.deselect', r, clickEvent);
			};

			$scope.selectedNodes = [];
			$scope.delta = 0;

			$scope.$watch('prGraph', update);
			$scope.$watch('prGraphMaxes', updateMaxes);
		}
	});
});
