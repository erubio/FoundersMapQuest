(function() {
	'use strict';

	define(['jquery', 'plugins/google-maps','plugins/events-manager', 'plugins/config','plugins/templates'], function($, gmaps, eManager, conf, templates) {
		var map, markers = [], 
			config = conf.getConf();


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
		* Function that add event to open infowindow
		**/
		function addEventToMarker(marker) {
			gmaps.event.addListener(marker, 'click', function() {
				marker.infoWindow.open(map,marker);
			});
		}

		/**
		* Function that add generate infowindows
		* @param {Array} -> array of markers
		* @param {Number} -> Index of array that you want to start to render
		**/
		function createInfoWindow(markers, i) {
			if(i< markers.length) {
				var infow = config.infoWindow.split(','),
					contents = [];

				for(var k=0,l=infow.length; k<l; k++) {
					contents.push(markers[i].founder[infow[k]]);
				}

				templates.render('info-window', {contents: contents}, function(html){
					markers[i].infoWindow =  new gmaps.InfoWindow({
						content: html
					});
					createInfoWindow(markers, i+1);
				});
				
			}
			
		}



		/**
		* Function that add markers and center map to view all of them
		* @param {Object} data -> markers data
		**/
		function addMapMarkers(data) {
			var i, l, latlng, title, currentFounder, marker, lat, lng,
				bounds = new gmaps.LatLngBounds();
			
			for(i=0,l=data.length; i<l; i++) {
				currentFounder = data[i];

				if(!currentFounder.isHidden) {
					lat = currentFounder[config.isLatitude];
					lng = currentFounder[config.isLongitude];
					latlng = new gmaps.LatLng(lat, lng);
					title = currentFounder.companyName;
					marker = new gmaps.Marker({
						position: latlng,
						map: map,
						title: title
					});
					marker.founder = currentFounder;
					addEventToMarker(marker);
					markers.push(marker);
					bounds.extend(latlng);	
					
				}
			}
			createInfoWindow(markers, 0);
			map.fitBounds(bounds);
			
		}

		/**
		* Function that remove all markers
		**/
		function removeMarkers() {
			if(markers.length) {
				$(markers).each(function(idx, marker){
					marker.setMap(null);
				});
				markers = [];
			}
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

		function updateConfig() {
			config = conf.getConf();
		}

		/**
		* Function that start listening events for the module
		**/
		function bindEvents() {
			eManager.on('updateMapInfo', function(data) {
				removeMarkers();
				addMapMarkers(data);
			});

			eManager.on('showManagementBox', collapseMap);
			eManager.on('closeManagementBox', expandMap);
			eManager.on('configChange', updateConfig);
			
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