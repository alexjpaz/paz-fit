angular.module('app').config(function(ScreenProvider) {
	ScreenProvider.register('screen-watcher-response', {
			controller: function($scope, $http, $upload, Watcher, $routeParams, BioBrokerEndpoint) {
				var file = null; 

				$scope.f = {};

				BioBrokerEndpoint.query(function(endpoints) {
					$scope.endpoints = endpoints;
				});

				Watcher.get({
					name: $routeParams.name
				}, function(watcher) {
					$scope.f.sourceEndpointName = watcher.sourceEndpointName;
					$scope.f.destinationEndpointName = watcher.destinationEndpointName;
				});

				$scope.upload = function() {
					$scope.response = {
						pending: true
					};
					$upload.upload({
							url: '/simulator/respond', //upload.php script, node.js route, or servlet url
							method: 'POST',
							data: $scope.f,
							file: file,
					}).progress(function(evt) {
						console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
					}).success(function(data, status, headers, config) {
						$scope.response = {
							success: true,
							message: data.message
						};
					}).error(function(data, status, headers, config) {
						$scope.response = {
							error: true,
							message: data.message
						};
					});

				};

				$scope.onFileSelect = function($files) {
					$scope.f.$fileReady = false;
					for (var i = 0; i < $files.length; i++) {
						file = $files[i];
						$scope.f.correlationId = file.name;
						$scope.f.$fileReady = true;
						$scope.$apply();
					}
				};
			}
	});
});
