App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', {
		scope: {'maxes':'='}
	});
});
