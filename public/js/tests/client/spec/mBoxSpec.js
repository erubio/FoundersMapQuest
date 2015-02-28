define(['jquery', 'modules/management-box','tests-utils', 'plugins/events-manager'], function($, mBox, testUtils, eManager) {
	'use strict';


	describe('Management box Module', function() {

		beforeEach(function(done) {
			testUtils.loadFixture('box', function(){
				mBox.init();
				done();	
			});
			
		});
		afterEach(function() {
			eManager.cleanAll();
			testUtils.cleanSandBox();
		});


		it('Should show management-box on event showManagementBox', function(done) {
			eManager.on('showManagementBox', function() {
				setTimeout(function(){
					var mBox = $('#management-box');
					expect(mBox.css('display')).toEqual('block');
					done();
				},500);
				
			});
			eManager.trigger('showManagementBox');
		});

		it('Should clean management box on event cleanManagementBox', function(done) {
			var $boxContent = $('._box-content');
			$boxContent.append($('<div id="test">TEST</div>'));
			eManager.on('cleanManagementBox', function() {
				setTimeout(function(){
					expect($boxContent.find('#test').length).toEqual(0);
					done();
				},100);
				
			});
			expect($boxContent.find('#test').length).toEqual(1);
			eManager.trigger('cleanManagementBox');
		});
		
		it('Should close clean and trigger a closeManagementBox even on close action', function(done) {
			var $boxContent = $('._box-content');
			$boxContent.append($('<div id="test">TEST</div>'));
			eManager.on('closeManagementBox', function() {
				setTimeout(function(){
					expect($boxContent.find('#test').length).toEqual(0);
					done();
				},100);
				
			});
			expect($boxContent.find('#test').length).toEqual(1);
			$('._close').click();
		});
	});
});