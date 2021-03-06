var Histogram = require('../').histogram;
var a = require('assert');

var testArraySkewed =  [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var testArrayUniform = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('histogram', function(){

	it('should have uniform binning given a uniform array', function(){
		var h = new Histogram(3, testArrayUniform);

		a.equal(h.binCounts[0], h.binCounts[1]);
		a.equal(h.binCounts[1], h.binCounts[2]);
		a.equal(h.binCounts[2], h.binCounts[0]);
	});

	it('should have skewed binning given a skewed array', function(){
		var h = new Histogram(3, testArraySkewed);

		a.equal(h.binCounts[0], 6);
		a.equal(h.binCounts[1], 15);
		a.equal(h.binCounts[2], 24);
	});

});