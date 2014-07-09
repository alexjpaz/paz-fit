angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('b-tx-id', {
		componentGroup: 'b',
		replace: true,
		scope: {'t':'=bTxId'}
	});
});
