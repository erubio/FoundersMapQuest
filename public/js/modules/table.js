(function() {
	'use strict';

	define(['jquery','plugins/templates', 'plugins/events-manager', 'plugins/jquery.tablesorter'], function($, templates, eManager, tableSorter) {
		var $table,
			tableData = null;

		/**
		* Function that add dom events to table
		**/
		function addDomEvents() {
			var $mBox = $('#management-box');
			$mBox.delegate('._addNew', 'click', function() {
				eManager.trigger('showForm');		
			});
		}

		/**
		* Function that configure table sorter
		**/
		function configureSortTable() {
			$table = $('.rounded-corner-table');
			$table.tablesorter();
		}

		/**
		* Function that show table
		**/
		function showTable() {
			var tmplData = {
				rows: tableData, 
				showTfoot: tableData === null	
			};
			eManager.trigger('cleanManagementBox');
			templates.render('table-content', tmplData, function(html) {
				var $boxContent = $('#management-box ._box-content');
				$boxContent.append(html);
				configureSortTable();
			});
			eManager.trigger('showManagementBox');
		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('addedFounders', function(data) {
				if(tableData) {
					tableData = tableData.concat(data);	
				} else {
					tableData = data;
				}
			});
			eManager.on('showTable', function() {
				showTable();
			});
		}


		/**
		* Function that init table module
		**/
		function init() {
			bindEvents();
			addDomEvents();
			console.log('table module initialized!');
		}

		return {
			init: init
		};

	});
}());