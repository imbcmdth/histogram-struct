var Cumulative = require('../').cumulative;
var a = require('assert');

var testArraySkewed =  [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var testArrayUniform = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('cumulative', function(){

	it('should have uniform binning given a uniform array', function(){
		var c = new Cumulative(3, testArrayUniform);

		a.equal(c.binCounts[0], 15);
		a.equal(c.binCounts[1], c.binCounts[0] + 15);
		a.equal(c.binCounts[2], c.binCounts[1] + 15);
		a.equal(c.binCounts[2], 45);
	});

	it('should have skewed binning given a skewed array', function(){
		var c = new Cumulative(3, testArraySkewed);

		a.equal(c.binCounts[0], 6);
		a.equal(c.binCounts[1], c.binCounts[0] + 15);
		a.equal(c.binCounts[2], c.binCounts[1] + 24);
		a.equal(c.binCounts[2], 45);
	});

});