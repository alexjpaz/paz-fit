angular.element(document).ready(function() {
	try{
		angular.bootstrap(document, ['app']);
		console.info('Successfully Bootstrapped');
	} catch(e) {
		console.trace(e);
		document.write('<pre style="color:red">'+e+'</pre>');
		throw e;
	}
});
