angular.module('app').config(function($provide) {
	$provide.factory('Storage', function($parse) {
		var isundef = angular.isUndefined;
		var instances = {};

		function Storage(name, defaults, construct) {
			var mem = null;

			this.get = function(key, defaultValue) {
				var value = null;

				if(isundef(key)) {
					value = mem;
				} else {
					var getter = $parse(key);
					lsval = getter(mem);
					if(angular.isObject(lsval)) {
						value = {};
						angular.extend(value, lsval, defaultValue);
					} else {
						value = lsval;
					}
				}
				return value;
			};

			this.put = function(key, value) {
				var getter = $parse(key);
				var setter = getter.assign;
				setter(mem, value);
				this.save();
			};

			this.load = function() {
				var ls = JSON.parse(localStorage.getItem(name));
				if(ls === null) {
					ls = new Object();
				}

				mem = {};
				angular.extend(mem, defaults, ls);
			};

			this.set = function(newMem) {
				mem = newMem;
			};

			this.save = function() {
				localStorage.setItem(name, JSON.stringify(mem));
			};

			this.load();
		}

		function StorageFactory() {
			this.getInstance = function(name, defaults) {
				var instance = instances[name];
				if(angular.isUndefined(instance)) {
					instance = new Storage(name, defaults);
				}

				return instance;
			};
		}
		return new StorageFactory();
	});

	$provide.factory('ScopeStorage', function() {

	});
});
