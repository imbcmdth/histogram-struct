module.exports = Histogram;

function Histogram (bins, values) {
	this.numBins = bins || 1;
	this.minVal = Math.min.apply(Math, values);
	this.maxVal = Math.max.apply(Math, values);

	this.binCenters = new Float64Array(this.numBins);
	this.binCounts = new Float64Array(this.numBins);

	this.binWidth = (this.maxVal - this.minVal + 1) / this.numBins;

	// Initialize bin values to 0 and
	// bin centers to their position
	for (var i = 0; i < this.numBins; i++) {
		this.binCounts[i] = 0;
		this.binCenters [i] = this.minVal + i * this.binWidth + this.binWidth / 2;
	}

	this.add(values);
}

Histogram.prototype.add = function (values) {
	var clamper = clamp.bind(null, this.minVal, this.maxVal);

	var clampedValues = values.map(clamper);
	var range = this.maxVal - this.minVal + 1;

	for (var i = 0; i < values.length; i++) {
		var index = Math.floor((clampedValues[i] - this.minVal) / range * this.numBins);
		this.binCounts[index]++;
	}
}

function clamp (min, max, value) {
	return Math.max(min, Math.min(value, max));
}
