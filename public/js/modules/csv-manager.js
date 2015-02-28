(function() {
	'use strict';

	define(['jquery', 'plugins/csv', 'plugins/events-manager', 'plugins/templates'], function($, csvParser, eManager, templates) {
		
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
		* Function that show form
		**/
		function showForm() {
			eManager.trigger('cleanManagementBox');
			templates.render('csv-form', {}, function(html) {
				var $boxContent = $('#management-box ._box-content');
				$boxContent.append(html);
			});
			eManager.trigger('showManagementBox');
		}

		/**
		* Function that show tip(animation)
		**/
		function showTip($tip) {
			$tip.animate({
				opacity: 1,
			}, 500);
		}
		/**
		* Function that hide tip (animation)
		**/
		function hideTip($tip) {
			$tip.animate({
				opacity: 0,
			}, 500);
		}

		function initForm() {
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
					$tipError = $target.find('.tipError'),
					foundersData;
					hideTip($tipError);
					if(csv) {
						foundersData = csvParser.csv2Obj(csv);
						$target.find('textarea').val('');
						eManager.trigger('addedFounders', foundersData);
					} else {
						showTip($tipError);
					}
					isProcessing = false;
					
			});
		}

		function addDomEvents() {
			var $mBox = $('#management-box'),
				$tipHelp;
			$mBox.delegate('textarea', 'focus', function() {
				$tipHelp = $mBox.find('.tipHelp');
				showTip($tipHelp);
			});
			$mBox.delegate('textarea', 'blur', function() {
				hideTip($tipHelp);
			});
		}

		/**
		* Function that start listening app events
		**/
		function bindEvents() {
			eManager.on('showForm', function() {
				showForm();
			});
		}

		/**
		* Function that configure csv form
		**/
		function configure() {
			bindEvents();
			initForm();
			addDomEvents();
			console.log('csv module initialized!');

		}

		return {
			init: configure
		};

	});
}());