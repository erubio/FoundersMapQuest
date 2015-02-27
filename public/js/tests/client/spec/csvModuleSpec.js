define(['jquery', 'modules/csv-manager','tests-utils', 'plugins/events-manager'], function($, csv, testUtils, eManager) {
	'use strict';

	var csvStr = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n';
	csvStr += '1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n';
	csvStr += '2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n';
	csvStr += '3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';


	describe('Csv Module', function() {

		beforeEach(function(done) {
			testUtils.loadFixture('form', function(){
				csv.init();
				done();	
			});
			
		});
		afterEach(function() {
			testUtils.cleanSandBox();
			eManager.cleanAll();
		});


		it('Should pase a csv and trigger an event with data', function(done) {
			eManager.on('addedFounders', function(data) {
				expect(data.length).toEqual(3);
				done();	
			});
			var $textArea = $('textarea').val(csvStr),
				$form = $('form');
				$form.submit();


		});

		xit('Should warn if input is empty', function(done){

		});
	});
});