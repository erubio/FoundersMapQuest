(function() {
	'use strict';

	// Events Manager plugin
	define(function($) {

		var tableConfig = {
				defaultRow: {
					id:'',
					companyName:'',
					founder:'',
					city:'',
					country:'',
					postalCode:'',
					street:'',
					photo:'',
					homePage:'',
					garageLatitude:'',
					garageLongitude:''
				},
				isLatitude: 'garageLatitude',
				isLongitude: 'garageLongitude',
				infoWindow: 'companyName'
			};
		
		/**
		* Function that get config
		* @return {Object} config object
		**/
		function getConf() {
			return tableConfig;
		}

		/**
		* Function set a value
		* @param {String} el -> name of the configuration
		* @param {String} value -> value wanted to save
		**/
		function setConf(el, value) {
			if(tableConfig[el]) {
				tableConfig[el] = value;	
			}
		}

		
		return {
			getConf: getConf,
			setConf: setConf
		}

	});
}());