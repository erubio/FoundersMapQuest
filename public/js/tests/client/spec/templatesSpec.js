define(['plugins/templates'], function(templates) {
	'use strict';

	describe('Template plugin', function() {

		it('Should render a template', function(done) {
			templates.render('csv-form', {}, function(tmpl){
				console.log(tmpl);
				expect(tmpl).toContain('<form id="csvForm" method="POST" action="/founder">');
				done();
			});
		});
	});
});