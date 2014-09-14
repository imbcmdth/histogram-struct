module.exports = Histogram;

function Histogram (bins, values, options) {
	this.numBins = bins || 1;

	this.meanVal = 0;
	this.minVal = Infinity;
	this.maxVal = -Infinity;
	this.maxCount = 0;
	var numThrownOut = 0;

	if (options) {
		this.minVal = options.minVal;
		this.maxVal = options.maxVal;

		for (var i = 0; i < values.length; i++) {
			if (values[i] >= this.minVal && values[i] <= this.maxVal) {
				this.meanVal += values[i];
			} else {
				numThrownOut++;
			}
		}
	} else {
		for (var i = 0; i < values.length; i++) {
			if (values[i] !== -Infinity) {
				this.minVal = Math.min(values[i], this.minVal);
				this.maxVal = Math.max(values[i], this.maxVal);
				this.meanVal += values[i];
			} else {
				numThrownOut++;
			}
		}
	}

	this.meanVal /= values.length - numThrownOut;

	this._allocateArrays();

	this.binWidth = (this.maxVal - this.minVal) / this.numBins;

	// Initialize bin values to 0 and
	// bin centers to their position
	for (var i = 0; i < this.numBins; i++) {
		this.binCounts[i] = 0;
		this.binCenters[i] = this.minVal + i * this.binWidth + this.binWidth / 2;
	}

	this.add(values);
}

Histogram.prototype._allocateArrays = function() {
	this.binCenters = new Float32Array(this.numBins);
	this.binCounts = new Uint32Array(this.numBins);
}

Histogram.prototype.add = function (values) {
	var range = this.maxVal - this.minVal;
	var scale = 1 / range * this.numBins;

	for (var i = 0; i < values.length; i++) {
		if (values[i] >= this.minVal && values[i] <= this.maxVal) {
			var index = Math.round(( values[i] - this.minVal) * scale);
			this.binCounts[index]++;
		}
	}

	for (var i = 0; i < this.binCounts.length; i++) {
		if (this.maxCount <= this.binCounts[i]) {
			this.maxCount = this.binCounts[i];
			this.peakIndex = i;
			this.peakValue = this.binCenters[i] + this.binWidth / 2;
		}
	}
}
