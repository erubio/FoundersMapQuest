(function() {
	'use strict';

	define(['jquery', 'plugins/google-maps','plugins/events-manager'], function($, gmaps, eManager) {
		var map, markers = [];


		/**
		* Function that init google maps
		**/
		function initMaps() {
			var mapOptions = {
				center: new gmaps.LatLng(0, 0),
				zoom: 2
			};
			map = new gmaps.Map(document.getElementById('map'), mapOptions);
		}

		/**
		* Function that add markers and center map to view all of them
		* @param {Object} data -> markers data
		**/
		function addMapMarkers(data) {
			var i, l, latlng, title, currentFounder,
				bounds = new gmaps.LatLngBounds();
			
			for(i=0,l=data.length; i<l; i++) {
				currentFounder = data[i];
				latlng = new gmaps.LatLng(currentFounder.garageLatitude, currentFounder.garageLongitude);
				title = currentFounder.companyName;
				markers.push(new gmaps.Marker({
					position: latlng,
					map: map,
					title: title
				}));
				bounds.extend(latlng);
			}
			map.fitBounds(bounds);
			
		}

		/**
		* Function that resize map
		**/
		function resizeMap() {
			gmaps.event.trigger(map, 'resize');
		}

		/**
		* Callback for map collapsing
		**/
		function collapseMap() {
			$('.map-container').addClass('collapsed');
			resizeMap();
		}

		/**
		* Callback for map expanding
		**/
		function expandMap() {
			$('.map-container').removeClass('collapsed');
			resizeMap();
		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('addedFounders', function(data) {
				addMapMarkers(data);
			});
			eManager.on('showManagementBox', collapseMap);
			eManager.on('closeManagementBox', expandMap);
		}

		/**
		* Function that init maps module
		**/
		function init() {
			initMaps();
			bindEvents();
			console.log('map module initialized!');
		}

		return {
			init: init
		};

	});
}());