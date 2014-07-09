angular.module('app').config(function(DirectiveProvider) {
	/*
	 * @Directive fa
	 *
	 * Shorthand directive to assign fa-* classes to <i> elements (or <ANY>)
	 * e.g. 
	 * <ANY fa='NAME'></ANY>
	 * result: 
	 * <ANY class='fa fa-NAME'></ANY>
	 *
	 * You may use interpolation ( {{ }} ) to assign a dynamic icon.
	 *
	 */
	 //DirectiveProvider.register('fa-a', function($interpolate) {
		 //return {
			 //restrict: 'A',
			 //compile: function(element, attrs) {
				 //return function link(scope, element, attrs) {
					 //var newClasses="", oldClasses="";
					 //var context = {};
					 //var faFn = $interpolate('fa fa-{{ value }}');

					 //attrs.$observe('faA', function(value) {
						 //oldClasses = newClasses;
						 //context.value = value;
						 //newClasses = faFn(context);
						 //attrs.$updateClass(newClasses, oldClasses);
					 //});
				 //}
			 //};

		 //};
	 //});
});
