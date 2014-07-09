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
	DirectiveProvider.register('bs-alert', function($interpolate) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var newClasses="", oldClasses="";
				var context = {};
				var faFn = $interpolate('alert alert-{{ value }}');

				attrs.$observe('bsAlert', function(value) {
					oldClasses = newClasses;
					context.value = value;
					newClasses = faFn(context);
					attrs.$updateClass(newClasses, oldClasses);
				});
			}
		};
	});
});
