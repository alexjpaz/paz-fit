head.load('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {

	function AssetRepository() {
		this.assets = [];

		this.add = function(assetUrl) {
			this.assets.push(assetUrl+".js?v=2");
		};

		this.importFromJson = function(jsonUrl) {
			throw new "Not Yet Implemented";
		};
	}

	var respository = new AssetRepository();
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource');
	respository.add('https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route');
	respository.add('/assets/app');
	respository.add('/assets/components/maxes');
	respository.add('/assets/components/plate-table');
	respository.add('/assets/components/pr-list');
	respository.add('/assets/components/c-calendar');
	respository.add('/assets/config/routes');
	respository.add('/assets/resources/repository');
	respository.add('/assets/helper/factory');
	respository.add('/assets/helper/enum');
	respository.add('/assets/helper/tools');

	console.log(respository);
	head.load(respository.assets, function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});

	head.load('/assets/style.css');
	head.load('//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js');

});
