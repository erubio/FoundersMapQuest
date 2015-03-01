define(['jquery', 'plugins/popup'], function($, popup) {
	'use strict';

	describe('Popup plugin', function() {

		afterEach(function(){
			popup.destroy();
		});

		it('Should render a popup and overlay', function(done) {
			popup.create();
			setTimeout(function(){
				expect($('.popup').length).toEqual(1);
				expect($('.overlay').length).toEqual(1);
				done();
			},100);	
		});

		it('Should render a popup and overlay with content', function(done) {
			var test = '<div class="test">Test</div>';
			popup.create(test);
			setTimeout(function(){
				expect($('.popup').length).toEqual(1);
				expect($('.overlay').length).toEqual(1);
				expect($('.popupContent .test').length).toEqual(1);
				done();
			},100);
		});
		it('Should destroy popup', function(done) {
			popup.create();
			setTimeout(function(){
				expect($('.popup').length).toEqual(1);
				expect($('.overlay').length).toEqual(1);
				popup.destroy();
				setTimeout(function(){
					expect($('.popup').length).toEqual(0);
					expect($('.overlay').length).toEqual(0);	
				},100)
				done();
			},100);
		});
	});
});