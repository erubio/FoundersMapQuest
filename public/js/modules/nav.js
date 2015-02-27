(function() {
	'use strict';

	define(['jquery', 'plugins/events-manager'], function($, eManager) {
		var $body;

		function configureShowForm() {
			$body.delegate('._showForm', 'click', function(e){
				e.preventDefault();
				eManager.trigger('showForm');
			});
		}


		function configureShowTable() {
			$body.delegate('._showTable', 'click', function(e){
				e.preventDefault();
				eManager.trigger('showTable');
			});
		}

		function init(){
			$body = $('body');
			configureShowTable();
			configureShowForm();
		}

		return {
			init: init
		}

	});

}());
