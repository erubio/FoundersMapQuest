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
				$popup.find('.popupContent').css('max-height', $(document).height() - 30);
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