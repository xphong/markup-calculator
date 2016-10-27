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
    const materialsList = [
      { type: 'drugs', fee: 0.075 },
      { type: 'food', fee: 0.13 },
      { type: 'electronics', fee: 0.02 }
    ];

    let selectedMaterial, materialFee;

    selectedMaterial = materialsList.filter(material => materialType === material.type);
    materialFee = selectedMaterial[0] ? selectedMaterial[0].fee : '';

    return materialFee ? this.roundToTwoDecimals(flatFee * materialFee) : this.roundToTwoDecimals(flatFee);
  }

  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
}

module.exports = MarkupCalculator;
