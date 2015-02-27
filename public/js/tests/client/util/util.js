(function() {
	'use strict';
	define(['jquery'], function($) {
		var basePath = '/js/tests/client/fixtures/';
		var testUtils = {
			loadFixture : function (fixture, callback) {
				var url = basePath + fixture + '.html';
				$.ajax(url, {
					success: function(data) {
						$('#sandBox').html(data);
						callback();
					}
				});
			},

			cleanSandBox: function () {
				$('#sandBox').html('');
			}
		};
		return testUtils;
	});

}());