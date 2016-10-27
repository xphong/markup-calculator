'use strict';

class MarkupCalculator {
  calculateFlatFee(markup) {
    const flatFee = 0.05;
    return this.roundToTwoDecimals(markup * flatFee);
  }

  calculateWorkerFee(flatFee, numberOfWorkers) {
    const workerFee = 0.012;
    return this.roundToTwoDecimals(flatFee * (workerFee * numberOfWorkers));
  }

  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
}

module.exports = MarkupCalculator;
