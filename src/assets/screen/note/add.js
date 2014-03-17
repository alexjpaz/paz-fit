angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-note-add', function($scopei, NoteRepository) {
		$scope.dto = new Object();
		$scope.submit = function(dto) {
			NoteRepository.save(dto);
		};
	});
});
