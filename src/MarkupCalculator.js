'use strict';

class MarkupCalculator {
  calculateFlatFee(basePrice) {
    const flatFee = 0.05;
    return this.roundToTwoDecimals(basePrice * flatFee);
  }

  calculateWorkerFee(flatPrice, numberOfWorkers) {
    const workerFee = 0.012;
    return this.roundToTwoDecimals(flatPrice * (workerFee * numberOfWorkers));
  }

  calculateMaterialFee(flatPrice, materialType) {
    const materialsList = [
      { type: 'drugs', fee: 0.075 },
      { type: 'food', fee: 0.13 },
      { type: 'electronics', fee: 0.02 }
    ];

    let selectedMaterial, materialFee;

    selectedMaterial = materialsList.filter(material => materialType === material.type);
    materialFee = selectedMaterial[0] ? selectedMaterial[0].fee : '';

    return materialFee ? this.roundToTwoDecimals(flatPrice * materialFee) : 0;
  }

  calculateTotalMarkup(basePrice, numberOfWorkers, materialType) {
    const totalFlatFee = this.calculateFlatFee(basePrice);
    const flatPrice = basePrice + totalFlatFee;

    const totalMarkup = flatPrice
      + this.calculateWorkerFee(flatPrice, numberOfWorkers)
      + this.calculateMaterialFee(flatPrice, materialType);

    return this.roundToTwoDecimals(totalMarkup);
  }

  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
}

module.exports = MarkupCalculator;
