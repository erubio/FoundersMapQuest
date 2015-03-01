define(['plugins/config'], function(config) {
	'use strict';

	describe('Config plugin', function() {

		it('Should get default config', function(done) {

			var conf = config.getConf();
			expect(conf.isLatitude).toEqual('garageLatitude');
			expect(conf.isLongitude).toEqual('garageLongitude');
			expect(conf.infoWindow).toEqual('companyName');
			done();
		});


		it('Should set values config', function(done) {
			var conf = config.getConf();
			expect(conf.isLatitude).toEqual('garageLatitude');
			expect(conf.isLongitude).toEqual('garageLongitude');
			config.setConf('isLatitude', 'test');
			config.setConf('isLongitude', 'test');
			expect(conf.isLatitude).toEqual('test');
			expect(conf.isLongitude).toEqual('test');
			done();
		});
	});
});