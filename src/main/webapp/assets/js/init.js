(function() {
	function Bootstrap() {
	    angular.module('Application', ['app']);
	    angular.element(document).ready(function() {
	    	try{
	    		angular.bootstrap(document, [ 'Application' ]);
	    		console.info('Successfully Bootstrapped');
	    	} catch(e) {
	    		alert("Exception during bootstrap - "+e);
	    		console.error('Error during Bootstrap');
	    		throw e;
	    	}
	    });
	}
	
	function Loader(BootsrapFunc) {
		this.libs = [];
		head.ready(BootsrapFunc);
	}
	
	Loader.prototype.addjs = function(path) {
		this.libs.push("assets/"+path+".js?v=CACHEBUSTER");
	};
	
	Loader.prototype.bootstrap = function(f) {
		head.js.apply(this, this.libs);
	}
	
	loader = new Loader(Bootstrap);
	
//	Hopefully we dont have to put jquery in the *.html file, but only if bootstrap behaves
	loader.addjs('lib/jquery/jquery-1.9.1'); 
	loader.addjs('lib/jstorage/jstorage');
	loader.addjs('lib/bootstrap/js/bootstrap');
	loader.addjs('lib/angular/angular');
	loader.addjs('lib/angular/angular-resource');
	loader.addjs('lib//angular-ui-bootstrap/ui-bootstrap-tpls-0.3.0');
	
	loader.addjs('js/app');
	loader.addjs('js/utils/factory');
	loader.addjs('js/utils/helpers');
	
	loader.addjs('js/resources/rest');
	
	loader.addjs('js/components/layout');
	loader.addjs('js/components/common');
	loader.addjs('js/components/user');
	loader.addjs('js/components/submission');
	
	loader.bootstrap();
})();
