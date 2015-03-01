(function() {
	'use strict';

	// Popup plugin
	define(['jquery', 'plugins/templates'], function($, template) {
		var $body = $('body'),
			$popup, $overlay;

		function createOverlay() {
			template.render('overlay', {}, function(html) {
				$overlay = $(html);
				$body.append($overlay);
			});
		}

		function configClose() {
			$popup.delegate('._close', 'click', destroy);	
		}

		function createPopup(tmpl) {
			template.render('popup', {content: tmpl}, function(html) {
				$popup = $(html);
				$body.append($popup);
				configClose();
			});
		}

		function create(tmpl) {
			createOverlay();
			createPopup(tmpl);

		}

		function destroy() {
			if ($popup) {
				$popup.remove();
			} 
			if ($overlay) {
				$overlay.remove();
			}
		}


		return {
			create: create,
			destroy: destroy
		}

	});
}());