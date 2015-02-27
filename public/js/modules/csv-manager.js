(function() {
	'use strict';

	define(['jquery', 'plugins/csv', 'plugins/events-manager'], function($, csvParser, eManager) {
		
		/**
		* Function that fetch csv from form
		* @param {String} formQueryString -> Form query string to extract csv value
		* @return {String} csv value
		**/
		function fetchCsv(formQueryString) {
			var csv = formQueryString.match(/csv=([^&]*)/)[1];
			return decodeURIComponent(csv).replace(/\+/g, ' ');
		}

		/**
		* Function that configure csv form
		**/
		function configure() {
			var $body = $('body'),
				isProcessing = false;
			$body.delegate('#csvForm','submit', function(e) {
				e.preventDefault();
				if(isProcessing) {
					return;
				}
				isProcessing = true;
				var $target = $(e.target),
					formQueryString = $target.serialize(),
					csv = fetchCsv(formQueryString),
					foundersData;
					if(csv) {
						foundersData = csvParser.csv2Obj(csv);
						$target.find('textarea').val('');
						eManager.trigger('addedFounders', foundersData);
					} else {
						alert('Text area empty');
					}
					isProcessing = false;
					
			});
			console.log('csv module initialized!');

		}

		return {
			init: configure
		};

	});
}());