var Histogram = require('./histogram'),
    util = require('util');

module.exports = Cumulative;

function Cumulative (bins, values) {
	Histogram.call(this, bins, values);
}

util.inherits(Cumulative, Histogram);

Cumulative.prototype.add = function (values) {
	Histogram.prototype.add.call(this, values);

	// (ac)cumulate the histogram values
	for (var i = 1; i < this.numBins; i++) {
		this.binCounts[i] += this.binCounts[i - 1];
	}
}
