define(['jquery', 'modules/nav','tests-utils', 'plugins/events-manager'], function($, nav, testUtils, eManager) {
	'use strict';


	describe('Nav Module', function() {

		beforeEach(function(done) {
			testUtils.loadFixture('nav', function(){
				nav.init();
				done();	
			});
			
		});
		afterEach(function() {
			eManager.cleanAll();
			testUtils.cleanSandBox();
		});


		it('Should trigger show table event when user clicks icon', function(done) {
			eManager.on('showTable', function() {
				expect(true).toEqual(true);
				done();
			});
			$('._showTable').click();
		});

		it('Should trigger show table event when user clicks icon', function(done) {
			eManager.on('showTable', function() {
				expect(true).toEqual(true);
				done();
			});
			$('._showForm').click();
		});
	});
});