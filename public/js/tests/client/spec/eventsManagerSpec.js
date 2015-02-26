define(['plugins/events-manager'], function(eManager) {
	'use strict';

	describe('Events Manager', function() {


		it('Should trigger an event with correct data', function(done) {
			var callback;
			eManager.on('eventTest', function(data) {
				expect(data).toEqual('bar');
				done();	
			});
			eManager.trigger('eventTest', 'bar');
		});
	});
});