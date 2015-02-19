angular.module('app').service('Profile', function($parse, $q, $http, DEFAULT_PROFILE) {
	var _profile = angular.copy(DEFAULT_PROFILE);
	//var _profile = {};

	this.get = function(path) {
		var value = _profile;
		if(!!path) {
			value = $parse(path)(_profile);
		}
		return value;
	};

	this.set = function(path, value) {
		if(!path) {
			_profile = value;
		} else {
			value = $parse(path).assign(_profile, value);
		}
		return value;
	};

	this.load = function() {
		var deffered = $q.defer();

		$http.get('/api/profile').then(function(rsp) {
			angular.extend(_profile, rsp.data);
			deffered.resolve(_profile);
		});

		return deffered.promise;
	};

	this.save = function(profile) {
		if(!profile) {
			profile = _profile;
		} else {
			_profile = profile;
		}

		var promise = $http.post('/api/profile', profile);

		return promise;

	};

	this.update = function(updates) {
		$http.put('/api/profile', updates).then(function(rsp) {
			angular.extend(_profile, rsp.data);
		});
		return deffered.promise;
	};
	
	this.init = function() {
		return this.load();	
	};
});
