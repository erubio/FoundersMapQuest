(function() {
	'use strict';

	// Events Manager plugin
	define(['jquery'], function($) {

		var eventsMap = {};

		/**
		* Function that save the events to manage
		* @param {String} eventName -> name of the event
		* @param {function} callback -> Callback to call on event
		**/
		function on(eventName, callback) {
			var fns = eventsMap[eventName] || [];
			if (!~$.inArray(callback, fns)) {
				fns.push(callback);
				eventsMap[eventName] = fns;
			}
		}

		/**
		* Function that trigger an event
		* @param {String} eventName -> name of the event
		* @param {Object} data -> Associated data to event(optional)
		**/
		function trigger(eventName, data) {
			var fns = eventsMap[eventName] || [],
				i = 0, len = fns.length;
			
			for (; i < len; i++) {
				try {
					fns[i](data);
				} catch (e) {
					console.warn('Error executing event callback:', eventName);
					console.warn(e.message);
					console.warn(e.stack);
				}
			}
		}

		/**
		* Function that clean all stored events
		**/
		function cleanAll() {
			eventsMap = {}	
		}
		
		return {
			on: on,
			trigger: trigger,
			cleanAll: cleanAll
		}

	});
}());