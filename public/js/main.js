(function() {
	'use strict';

	// Main configuration
	requirejs.config({
		baseUrl: '/js',
		paths: {
			jquery: '/vendor/jquery/dist/jquery',
			handlebars: '/vendor/handlebars/handlebars',
			async: '/vendor/requirejs-plugins/src/async'
		}
	});
	// Main initialization
	require(['modules/table', "modules/map", "modules/csv-manager", "modules/nav", "modules/management-box"], function(tableModule, mapModule, csvManager, mBox) {
		console.log('App initialized');
		for(var i=0,l=arguments.length; i<l; i++) {
			arguments[i].init();
		}
	});

}());