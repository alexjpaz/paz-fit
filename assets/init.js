head.load('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {
	var ngmods = [];
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.js');
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource.js');
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route.js');
	ngmods.push('/assets/app.js');
	head.load(ngmods, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});
});
