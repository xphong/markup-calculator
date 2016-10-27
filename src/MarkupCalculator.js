'use strict';

class MarkupCalculator {
  calculateFlatFee(markup) {
    const flatFee = 0.05;
    return Math.round(markup * flatFee * 100) / 100;
  }
}

module.exports = MarkupCalculator;
