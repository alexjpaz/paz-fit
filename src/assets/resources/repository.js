/*
 * Module: helper
 *
 */
angular.module('resources',[])
.config(function(){})
angular.module('resources').config(function($provide) {

	$provide.factory('DaoFactory', function($http, $q) {
		function Dao(storeName) {
			this.storeName = storeName
			this.httpConfigDefaults = {
				url: '/rest/'+storeName,
			};
		}

		Dao.prototype.fetchList = function() {
		};

		Dao.prototype._http = function(httpConfig) {
			var resultHttpConfig = {};
			angular.extend(resultHttpConfig, this.httpConfigDefaults, httpConfig);
			var httpPromise = $http(resultHttpConfig);

			return httpPromise;
		};

		Dao.prototype.findSingle = function(key) {
		};

		Dao.prototype.find = function(params) {
			var deffered = $q.defer();
			var httpConfig = {
				method: 'GET',
				params: params
			};

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				var records = response.data.list[_this.storeName];
				if(angular.isUndefined(records)) {
					records = [];
				}
				deffered.resolve(records);
			});

			return deffered.promise;
		};

		Dao.prototype.fetchFromDateRange = function(beginDate, endDate) {
			var params = {
				'fge_date': beginDate,
				'fle_date': endDate,
			};

			return this.find(params);
		};

		Dao.prototype.save = function(data) {
			var httpConfig = {
				method: 'POST',
				data: {}
			};

			httpConfig.data.list = {};
			var dataRef = httpConfig.data.list[this.storeName] = [];

			if(angular.isArray(data)) {
				dataRef.concat(data);
			} else {
				dataRef.push(data);
			}

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				deffered.resolve(response);
			});

			return deffered.promise;
		};

		Dao.prototype.remove = function(entity) {
			var deffered = $q.defer();
			var httpConfig = {
				url: '/rest/'+this.storeName+'/'+entity.key,
				method: 'DELETE',
			};

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				deffered.resolve(response);
			});

			return deffered.promise;

		};

		function DaoFactory(storeName, extendo) {
			var dao = new Dao(storeName);
			return dao; 
		}

		return DaoFactory;
	});

	$provide.factory('MaxesDao', function($http, $q, DaoFactory, moment) {
		var MaxesDao = DaoFactory('Maxes');
		MaxesDao.findLatest = function() {
			var params = {
				"flt_date": moment().format('YYYY-MM-DD'),
				"ordering": "-date",
			};

			return this.find(params);
		};
		return MaxesDao;
	});

	$provide.factory('PersonalRecordDao', function($http, $q, DaoFactory) {
		var PersonalRecordDao = DaoFactory('PersonalRecord');
		return PersonalRecordDao;
	});
});
