(function() {
	'use strict';

	define(['jquery','plugins/templates', 'plugins/events-manager', 'plugins/popup'], function($, templates, eManager, popup) {
		var $table;

		/**
		* Callback from template render, this function injects rows to tbody
		* @param {String} html -> html to inject
		**/
		function addRows(html) {
			var $tbody = $table.find('tbody'),
				$tfoot = $table.find('tfoot');
			$tbody.append(html);
			$tfoot.remove();
		}

		/**
		* Function that render template to add rows to table
		* @param {Object} data -> table data
		**/
		function addDataToTable(data) {
			templates.render('table-content', {rows: data}, addRows);
		}

		/**
		* Function that configure table sorter
		**/
		function configureSortTable() {

		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('addedFounders', function(data) {
				addDataToTable(data);
			});
		}


		/**
		* Function that init table module
		**/
		function init() {
			$table = $('.rounded-corner-table');
			bindEvents();
			configureSortTable();
			console.log('table module initialized!');
		}

		return {
			init: init
		};

	});
}());