App.screen('screen-note-add', function($scopei, NoteRepository) {
	$scope.dto = new Object();
	$scope.submit = function(dto) {
		NoteRepository.save(dto);
	};
});
