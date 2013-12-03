head.load('http://code.jquery.com/jquery-2.0.3.min.js', function() {
	var ngmods = [];
	ngmods.push('http://code.angularjs.org/1.2.3/angular.js');
	ngmods.push('http://code.angularjs.org/1.2.3/angular-resource.js');
	ngmods.push('http://code.angularjs.org/1.2.3/angular-route.js');
	ngmods.push('/assets/app.js');
	head.load(ngmods, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});
});
