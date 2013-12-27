head.load('/bower_components/jquery/jquery.min.js', function() {

	function AssetRepository() {
		this.assets = [];

		var assetSeed = 0;
		this.add = function(assetUrl) {
			assetSeed += 1;
			var asset = {}
			asset[assetSeed] = (assetUrl+".js?v=2");
			this.assets.push(asset);
		};

		this.addBowerComponent = function(componentUrl) {
			this.add('/bower_components/'+componentUrl);
		};

		this.importFromJson = function(jsonUrl) {
			throw new "Not Yet Implemented";
		};
	}

	var respository = new AssetRepository();


	respository.addBowerComponent('momentjs/moment');
	respository.addBowerComponent('angular/angular');
	respository.addBowerComponent('angular-route/angular-route');
	respository.addBowerComponent('angular-mocks/angular-mocks');
	respository.addBowerComponent('angular-resource/angular-resource')

	respository.add('/assets/lib/ydn.db-iswu-core-e-qry-dev');

	respository.add('/assets/app');
	respository.add('/assets/components/maxes');
	respository.add('/assets/components/plate-table');
	respository.add('/assets/components/pr-list');
	respository.add('/assets/components/pr-add');
	respository.add('/assets/components/c-calendar');
	respository.add('/assets/components/c-table');
	respository.add('/assets/config/routes');
	respository.add('/assets/resources/repository');
	respository.add('/assets/helper/factory');
	respository.add('/assets/helper/enum');
	respository.add('/assets/helper/tools');

	console.log(respository);
	head.load(respository.assets, function() {
		angular.element(document).ready(function() {
			try{
				angular.bootstrap(document, ['app']);
			} catch(e) {
				console.error(e.message);
				document.write('<pre>'+e+'</pre>');
			}
		});
	});


	head.load('/bower_components/bootstrap/dist/js/bootstrap.min.js');
	head.load('/assets/style.css');
});
