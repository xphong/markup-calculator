'use strict';

class MarkupCalculator {
  calculateFlatFee(markup) {
    const flatFee = 0.05;
    return Math.round(markup * flatFee * 100) / 100;
  }

  calculateWorkerFee(flatFee, numberOfWorkers) {
    const workerFee = 0.012;
    return Math.round(flatFee * (workerFee * numberOfWorkers) * 100) / 100;
  }
}

module.exports = MarkupCalculator;
