define(['plugins/csv'], function(csv) {
	'use strict';

	var csvStr = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n';
	csvStr += '1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n';
	csvStr += '2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n';
	csvStr += '3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';


	describe('Csv Parser', function() {

		it('Should pase a csv', function(done) {
			var obj = csv.csv2Obj(csvStr);
			expect(obj.length).toEqual(3);
			expect(obj[0].id).toEqual("1");
			expect(obj[0].companyName).toEqual("Google");
			expect(obj[0].founder).toEqual("Larry Page & Sergey Brin");
			expect(obj[0].city).toEqual("Mountain View");
			expect(obj[0].country).toEqual("USA");
			expect(obj[0].postalCode).toEqual("CA 94043");
			expect(obj[0].street).toEqual("1600 Amphitheatre Pkwy");
			expect(obj[0].photo).toEqual("http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg");
			expect(obj[0].homePage).toEqual("http://google.com");
			expect(obj[0].garageLatitude).toEqual("37.457674");
			expect(obj[0].garageLongitude).toEqual("-122.163452");
			expect(obj[1].id).toEqual("2");
			expect(obj[2].id).toEqual("3");
			console.log(obj);
			done();
		});
	});
});