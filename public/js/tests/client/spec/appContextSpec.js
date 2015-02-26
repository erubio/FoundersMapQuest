define(['plugins/app-context'], function(app) {
	'use strict';

	describe('Csv Parser', function() {

		it('Should return app context', function(done) {
			expect(app.version).toEqual('0.1.0');
			done();
		});
	});
});