angular.module('app').config(function($provide) {
	var isundef = angular.isUndefined;
	var isdef = angular.isDefined;

	$provide.constant('KeyMapComboStarter', {
	});

	$provide.constant('KeyMap', {
			'71' : 'g',
			'83' : 's',
			'85' : 'u',
			'70' : 'f',
			'191': '/'
	});

	$provide.service('KeybindingHelper', function(KeyMap) {

	});


	$provide.factory('NavigationKey', function(Keybinding, $location) {

		function NavigationKey() {
			this._goto = function(path) {
				return function() {
					$location.path(path);	
				};
			};

			this.when = function(keybinding, path) {
				Keybinding.addListener(keybinding, this._goto(path));
			};

			this.on = function() {

			};
		}

		var instance = new NavigationKey();

		return instance;
	});

	$provide.service('KeybindingDocumentListener', function($document, KeyMap, $rootScope, KeybindingHelper, Set) {

		this.activate = function() {
			//TODO: May be a good idea to add namespace
			$document.bind('keydown.kdl', KeybindingDocumentListener); 
		};

		this.deactivate = function() {
			$document.unbind('keydown.kdl');
		};

		var flags = '';
		var ignoreElements = new Set('input', 'textarea', 'select');

		function KeybindingDocumentListener(event) {
			var nodeName = event.target.nodeName.toLowerCase();
			var chr = KeyMap[event.keyCode];
			var combo = null;

			var isIgnoredElement = ignoreElements.$has(nodeName);
			var isValidCharacter = isdef(chr);

			var isValidEvent = ( isValidCharacter && !isIgnoredElement );

			if(isValidEvent) {
				$rootScope.$broadcast('KeybindingEvent', {
						chr: chr,
						keyDownEvent: event
				});

				if(angular.isUndefined(chr)) {
					return;
				}

				if(chr === 'g') {
					flags = '+g';
					return;
				}

				combo = flags+chr;

				$rootScope.$broadcast('KeybindingEvent.ComboFired', combo);

				combo = null;
				flags = "";
			}
		}
	});

	$provide.factory('Keybinding', function($document, $rootScope, KeyMap) {
		function Keybinding() {
			this.addListener = function(binding, callback) {
				$rootScope.$on('KeybindingEvent.ComboFired', function(event, keyevent) {
					if(binding === keyevent) {
						$rootScope.$apply(function() {
							callback.call(this, keyevent);	
						});
					}
				});
			};

			this.when = function(keymatch, callback) {
				function whenCallback(ngevent, keyevent) {
					var matches = true;

					if(angular.isFunction(keymatch)) {
						callback = keymatch;
					} else {
						angular.forEach(keymatch, function(val, prop) {
							if(keyevent[prop] != val) {
								matches = false;
							}
						});
					}

					if(matches) {
						$rootScope.$apply(function() {
							callback.call(this, keyevent);
						});
					}
				}

				$rootScope.$on('KeybindingEvent', whenCallback);
			};
		}

		var instance = new Keybinding();
		return instance;
	});

});
