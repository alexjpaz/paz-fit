head.load('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {

	function AssetRepository() {
		this.assets = [];

		this.add = function(assetUrl) {
			this.assets[assetUrl];
		};

		this.importFromJson = function(jsonUrl) {
			throw new "Not Yet Implemented";
		};
	}

	var respository = AssetRepository();
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.js');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource.js');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route.js');
	respository.add('/assets/app.js?v=1');
	respository.add('/assets/components/maxes.js?v=1');
	respository.add('/assets/components/plate-table.js?v=1');
	respository.add('/assets/components/c-calendar.js?v=1');
	respository.add('/assets/config/routes.js?v=1');
	respository.add('/assets/helper/factory.js?v=1');
	respository.add('/assets/helper/enum.js?v=1');
	respository.add('/assets/helper/tools.js?v=1');

	head.load(respository.assets, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});

	var asyncmods = [];
	asyncmods.push('/assets/style.css');
	asyncmods.push('//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js');

	head.load(asyncmods);
});
