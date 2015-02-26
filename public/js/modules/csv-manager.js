(function() {
	'use strict';

	define(['jquery'], function($) {
		
		function configure() {
			console.log('csv module initialized!');
		}

		return {
			init: configure
		};

	});
}());