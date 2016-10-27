'use strict';

const expect = require('chai').expect;
const MarkupCalculator = require('./MarkupCalculator');

describe('Markup Calculator', () => {
  const basePrice1 = 1299.99;
  const basePrice2 = 5432.00;
  const basePrice3 = 12456.95;

  let markupCalculator;

  beforeEach(() => {
    markupCalculator = new MarkupCalculator();
  });

  it('should calculate flat markup fee', () => {
    expect(markupCalculator.calculateFlatFee(basePrice1)).to.equal(65.00);
    expect(markupCalculator.calculateFlatFee(basePrice2)).to.equal(271.60);
    expect(markupCalculator.calculateFlatFee(basePrice3)).to.equal(622.85);
  });

  it('should calculate worker fee', () => {
    let flatFee1 = basePrice1 + markupCalculator.calculateFlatFee(basePrice1);
    let flatFee2 = basePrice2 + markupCalculator.calculateFlatFee(basePrice2);
    let flatFee3 = basePrice3 + markupCalculator.calculateFlatFee(basePrice3);

    expect(markupCalculator.calculateWorkerFee(flatFee1, 3)).to.equal(49.14);
    expect(markupCalculator.calculateWorkerFee(flatFee2, 1)).to.equal(68.44);
    expect(markupCalculator.calculateWorkerFee(flatFee3, 4)).to.equal(627.83);
  });

  it('should round to two decimals', () => {
    expect(markupCalculator.roundToTwoDecimals(markupCalculator.calculateFlatFee(basePrice1))).to.equal(65.00);
    expect(markupCalculator.roundToTwoDecimals(markupCalculator.calculateFlatFee(basePrice2))).to.equal(271.60);
    expect(markupCalculator.roundToTwoDecimals(markupCalculator.calculateFlatFee(basePrice3))).to.equal(622.85);
  });
});
