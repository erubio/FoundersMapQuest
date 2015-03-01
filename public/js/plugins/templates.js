(function() {
	'use strict';

	// Client side rendering plugin
	define(['jquery', 'handlebars'],function($, HBS) {

		var TEMPLATES_BASE_PATH = '/js/templates/';

		/**
		* Function that look for template file
		* @param {String} templateName -> Name of the template
		* @param {Function} done -> Callback
		**/
		function getTemplate(templateName, done) {
			var tpl;
			// TODO Error handling
			$.get(TEMPLATES_BASE_PATH + templateName + '.hbs', function(raw) {
				tpl = HBS.compile(raw);
				done(null, tpl);
			});
		}

		/**
		* Function that render a template with a context
		* @param {String} templateName -> Name of the template
		* @param {Object} context -> Data to fill the template
		* @param {Function} done -> Callback function with rendered template
		**/
		function render(templateName, context, done) {
			getTemplate(templateName, function(err, tpl) {
				// TODO Error handling
				done(tpl(context));
			});
		}

		/**
		* Add handlebars helper for check if data is image
		**/
		HBS.registerHelper('checkContent', function(value) {
			
			if(value.match(/\.(jpg|png|jpeg|bmp|svg|tiff|gif)$/)) {
				return new HBS.SafeString(
					'<a href="#" class="_imgView"><img src="' + value + '" width="60px"></a>'
				);
			} else if(value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) {
				return new HBS.SafeString(
					'<a href="' + value + '" target="_blank">' + value + '</a>'
				);
			} else {
				return value;
			}
		});

		return {
			render: render
		}

	});
}());