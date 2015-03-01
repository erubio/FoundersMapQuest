(function() {
	'use strict';

	define(['jquery','plugins/templates', 'plugins/events-manager', 'plugins/jquery.tablesorter', 'plugins/popup'], function($, templates, eManager, tableSorter, popup) {
		var $table,
			tableData;

		
		/**
		* Function that transform camelcase to normal string
		* @param {String} str-> camel case string
		* @return {String} converted string
		**/
		function unCamelCase(str) {
			return str
				// insert a space between lower & upper
				.replace(/([a-z])([A-Z])/g, '$1 $2')
				// space before last upper in a sequence followed by lower
				.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
				// uppercase the first character
				.replace(/^./, function(str){ return str.toUpperCase(); });
		}

		/**
		* Function that show config popup
		**/
		function showTableConfig() {
			popup.create();
		}

		/**
		* Function that set isHidden on founder info depending on id
		* @param {String} id -> Id of founder we want to change
		* @param {Boolean} isHidden -> if element is hidden or not
		**/
		function changeVisibility(id, isHidden) {
			for(var i=0,l=tableData.length;i<l;i++) {
				if(tableData[i].id === id) {
					tableData[i].isHidden = isHidden;
					break;
				}
			}	
		}

		/**
		* Callback that manage visibility change
		* @param {Event} e -> Change event of the checkboxes
		**/
		function toggleVisibility(e) {
			var $target = $(e.target),
				$tr = $target.closest('tr'),
				id = $tr.find('._id').text(),
				isHidden = !$target.is(':checked');
			changeVisibility(id, isHidden);
			eManager.trigger('updateMapInfo', tableData);
		}

		/**
		* Function that add dom events to table
		**/
		function addDomEvents() {
			var $mBox = $('#management-box');
			$mBox.delegate('._addNew', 'click', function() {
				eManager.trigger('showForm');		
			});
			$mBox.delegate('._openConfig', 'click', showTableConfig);
			$mBox.delegate('._toggleVisibility', 'change', toggleVisibility);
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
		* Function that check if data has one or more duplicated element(look for id)
		* @param {Array} data -> new data to add in founders array
		* @return {Boolean} if there is some elements duplicated
		**/
		function hasDuplicated(data) {
			var valuesSoFar = {},
				currentIds = tableData.map(function(d){
					return d.id;
				}),
				newIds = data.map(function(d){
					return d.id;
				}),
				array = currentIds.concat(newIds),
				value;
    		
    		for (var i = 0; i < array.length; ++i) {
				value = array[i];
				if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
					return true;
				}
       			 valuesSoFar[value] = true;
   			 }
    		return false;
		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('addedFounders', function(data) {
				if(tableData) {
					if(hasDuplicated(data)) {
						alert('Error: Ids should be different');
						return;
					} else {
						tableData = tableData.concat(data);	
					}
					
				} else {
					tableData = data;
				}
				eManager.trigger('updateMapInfo', tableData);
			});
			eManager.on('showTable', function() {
				showTable();
			});
		}


		/**
		* Function that init table module
		**/
		function init() {
			tableData = null;
			bindEvents();
			addDomEvents();
			console.log('table module initialized!');
		}

		return {
			init: init
		};

	});
}());