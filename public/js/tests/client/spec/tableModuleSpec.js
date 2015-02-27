define(['jquery', 'modules/table','tests-utils', 'plugins/events-manager'], function($, table, testUtils, eManager) {
	'use strict';

	
	var obj = [{
		id: '1',
		companyName: 'companyName',
		founder: 'founder',
		city: 'city',
		country: 'country',
		postalCode: 'postalCode',
		street: 'street',
		photo: 'photo',
		homePage: 'homePage',
		garageLatitude: 'garageLatitude', 
		garageLongitude: 'garageLongitude'
	}];

	describe('Table', function() {

		beforeEach(function(done) {
			testUtils.loadFixture('table', function(){
				table.init();
				done();	
			});
			
		});
		afterEach(function() {
			eManager.cleanAll();
			testUtils.cleanSandBox();
		});


		it('Should draw a row in table', function(done) {
			eManager.on('addedFounders', function() {
				setTimeout(function(){
					var $tr = $('tbody tr');
					expect($tr.length).toEqual(1);
					expect($tr.find('td').length).toEqual(11);
					done();
				},200);
	
			});
			eManager.trigger('addedFounders', obj);


		});
	});
});