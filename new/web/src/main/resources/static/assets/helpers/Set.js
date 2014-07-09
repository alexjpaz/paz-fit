angular.module('app').config(function($provide) {
	$provide.constant('Set', function() {
		var that = this;

		this.$add = function(value) {
			return that[value] = true;
		};

		this.$remove = function(vale) {
			delete that[value];
		};

		this.$has = function(value) {
			return angular.isDefined(that[value]);
		};

		this.$toArray = function() {
			var a = [];
			angular.forEach(this, function(v,k) {
				if(k[0] !== '$') {
					a.push(v);
				}
			});
			return a;
		};

		angular.forEach(arguments, function(arg) {
			that.$add(arg);
		});
	});
});
