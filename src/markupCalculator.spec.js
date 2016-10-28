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
    let flatPrice1 = basePrice1 + markupCalculator.calculateFlatFee(basePrice1);
    let flatPrice2 = basePrice2 + markupCalculator.calculateFlatFee(basePrice2);
    let flatPrice3 = basePrice3 + markupCalculator.calculateFlatFee(basePrice3);

    expect(markupCalculator.calculateWorkerFee(flatPrice1, 3)).to.equal(49.14);
    expect(markupCalculator.calculateWorkerFee(flatPrice2, 1)).to.equal(68.44);
    expect(markupCalculator.calculateWorkerFee(flatPrice3, 4)).to.equal(627.83);
  });

  it('should calculate material fee', () => {
    let flatPrice1 = basePrice1 + markupCalculator.calculateFlatFee(basePrice1);
    let flatPrice2 = basePrice2 + markupCalculator.calculateFlatFee(basePrice2);
    let flatPrice3 = basePrice3 + markupCalculator.calculateFlatFee(basePrice3);

    expect(markupCalculator.calculateMaterialFee(flatPrice1, 'food')).to.equal(177.45);
    expect(markupCalculator.calculateMaterialFee(flatPrice2, 'drugs')).to.equal(427.77);
    expect(markupCalculator.calculateMaterialFee(flatPrice3, 'books')).to.equal(0);
    expect(markupCalculator.calculateMaterialFee(flatPrice1, 'electronics')).to.equal(27.30);
  });

  it('should calculate total markup', () => {
    expect(markupCalculator.calculateTotalMarkup(basePrice1, 3, 'food')).to.equal(1591.58);
    expect(markupCalculator.calculateTotalMarkup(basePrice2, 1, 'drugs')).to.equal(6199.81);
    expect(markupCalculator.calculateTotalMarkup(basePrice3, 4, 'books')).to.equal(13707.63);
  });

  it('should throw error on handle validation errors when invalid base price', () => {
    expect(() => markupCalculator.handleValidationErrors(-100, 3, 'food')).to.throw(Error, 'Invalid base price');
  });

  it('should throw error on handle validation errors when invalid number of workers', () => {
    expect(() => markupCalculator.handleValidationErrors(basePrice1, -1, 'food')).to.throw(Error, 'Invalid number of workers');
  });

  it('should throw error on handle validation errors when invalid material type', () => {
    expect(() => markupCalculator.handleValidationErrors(basePrice1, 3, {type: 'food'})).to.throw(Error, 'Invalid material type');
  });

  it('should round to two decimals', () => {
    expect(markupCalculator.roundToTwoDecimals(64.999)).to.equal(65.00);
    expect(markupCalculator.roundToTwoDecimals(271.60123)).to.equal(271.60);
    expect(markupCalculator.roundToTwoDecimals(622.8475)).to.equal(622.85);
  });
});
