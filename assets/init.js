head.load('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {
	var ngmods = [];
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.js');
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource.js');
	ngmods.push('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route.js');
	ngmods.push('/assets/app.js');
	ngmods.push('/assets/components/plate-table.js');
	ngmods.push('/assets/config/routes.js');
	ngmods.push('/assets/helper/factory.js');
	ngmods.push('/assets/helper/enum.js');
	ngmods.push('/assets/helper/tools.js');
	head.load(ngmods, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});

	var asyncmods = [];
	asyncmods.push('/assets/style.css');
	asyncmods.push('//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js');

	head.load(asyncmods);
});
