'use strict';

class MarkupCalculator {
  calculateFlatFee(price) {
    const flatFee = 0.05;
    return price * flatFee;
  }

  calculateWorkerFee(price, numberOfWorkers) {
    const workerFee = 0.012;
    return price * (workerFee * numberOfWorkers);
  }

  calculateMaterialFee(price, materialType) {
    const materialsList = [
      { type: 'drugs', fee: 0.075 },
      { type: 'food', fee: 0.13 },
      { type: 'electronics', fee: 0.02 }
    ];
    const selectedMaterial = materialsList.filter(material => materialType === material.type);
    const materialFee = selectedMaterial[0] ? selectedMaterial[0].fee : '';

    return materialFee ? price * materialFee : 0;
  }

  calculateTotalMarkup(basePrice, numberOfWorkers, materialType) {
    let flatPrice, totalMarkup;

    this.handleValidationErrors(basePrice, numberOfWorkers, materialType)

    flatPrice = basePrice + this.calculateFlatFee(basePrice);

    totalMarkup = flatPrice
      + this.calculateWorkerFee(flatPrice, numberOfWorkers)
      + this.calculateMaterialFee(flatPrice, materialType);

    return this.roundToTwoDecimals(totalMarkup);
  }

  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }

  handleValidationErrors(basePrice, numberOfWorkers, materialType) {
    if (basePrice <= 0) {
      throw new Error('Invalid base price');
    }

    if (numberOfWorkers <= 0) {
      throw new Error('Invalid number of workers');
    }

    if (typeof materialType !== 'string') {
      throw new Error('Invalid material type');
    }
  }
}

module.exports = MarkupCalculator;
