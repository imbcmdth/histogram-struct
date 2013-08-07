module.exports = Histogram;

function Histogram (bins, values) {
	this.numBins = bins || 1;

	this.minVal = Infinity;
	this.maxVal = -Infinity;

	for (var i = 0; i < values.length; i++) {
		this.minVal = Math.min(this.minVal, values[i]);
		this.maxVal = Math.max(this.maxVal, values[i]);
	}

	this.binCenters = new Float32Array(this.numBins);
	this.binCounts = new Uint32Array(this.numBins);

	this.binWidth = (this.maxVal - this.minVal) / this.numBins;

	// Initialize bin values to 0 and
	// bin centers to their position
	for (var i = 0; i < this.numBins; i++) {
		this.binCounts[i] = 0;
		this.binCenters [i] = this.minVal + i * this.binWidth + this.binWidth / 2;
	}

	this.add(values);
}

Histogram.prototype.add = function (values) {
	var range = this.maxVal - this.minVal + 1;

	for (var i = 0; i < values.length; i++) {
		var index = Math.floor((values[i] - this.minVal) / range * this.numBins);
		this.binCounts[index]++;
	}
}
