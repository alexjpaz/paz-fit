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
	DirectiveProvider.register('fa', function($interpolate) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var newClasses="", oldClasses="";
				var context = {};
				var faFn = $interpolate('fa fa-{{ value }}');

				attrs.$observe('fa', function(value) {
					oldClasses = newClasses;
					context.value = value;
					newClasses = faFn(context);
					attrs.$updateClass(newClasses, oldClasses);
				});
			}
		};
	});
});
