(function() {
	'use strict';

	define(['jquery', 'plugins/events-manager'], function($, eManager) {
		var $box;

		/**
		* Function that clean box
		**/
		function cleanBox() {
			eManager.trigger('closeManagementBox');
			$box.find('._box-content').empty();	
		}

		/**
		* Function that close box
		**/
		function close() {
			$box.slideUp(400, cleanBox);
		}
		/**
		* Function that show box
		**/
		function show() {
			$box.slideDown(400);
		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('showManagementBox', function() {
				show();
			});
			eManager.on('cleanManagementBox', function() {
				cleanBox();
			});
		}

		/**
		* Function that add event to close icon
		**/
		function initCloseButton() {
			$box.find('._close').click(close);
		}

		/**
		* Function that inits module
		**/
		function init() {
			$box = $('#management-box');
			initCloseButton();
			bindEvents();
		}

		return {
			init: init
		}
	});

}());
