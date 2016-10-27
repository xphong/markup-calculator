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

  calculateMaterialFee(flatFee, materialType) {
    const drugsFee = 0.075;
    const foodFee = 0.13;
    const electronicsFee = 0.02;

    let materialFee;

    if (materialType === 'drugs') {
      materialFee = drugsFee;
    } else if (materialType === 'food') {
      materialFee = foodFee;
    } else if (materialType === 'electronics') {
      materialFee = electronicsFee;
    } else {
      materialFee = 0;
    }

    return materialFee === 0 ? this.roundToTwoDecimals(flatFee) : this.roundToTwoDecimals(flatFee * materialFee);
  }

  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
}

module.exports = MarkupCalculator;
