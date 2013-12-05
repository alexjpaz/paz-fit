head.load('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {

	function AssetRepository() {
		this.assets = [];

		this.add = function(assetUrl) {
			this.assets.push(assetUrl);
		};

		this.importFromJson = function(jsonUrl) {
			throw new "Not Yet Implemented";
		};
	}

	var respository = new AssetRepository();
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.js');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource.js');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route.js');
	respository.add('/assets/app.js?v=1');
	respository.add('/assets/components/maxes.js?v=1');
	respository.add('/assets/components/plate-table.js?v=1');
	respository.add('/assets/components/c-calendar.js?v=1');
	respository.add('/assets/config/routes.js?v=1');
	respository.add('/assets/resources/respository.js?v=1');
	respository.add('/assets/helper/factory.js?v=1');
	respository.add('/assets/helper/enum.js?v=1');
	respository.add('/assets/helper/tools.js?v=1');

	console.log(respository);
	head.load(respository.assets, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});

	var asyncmods = new AssetRepository();
	asyncmods.add('/assets/style.css');
	asyncmods.add('//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js');

	head.load(asyncmods.assets);
});
