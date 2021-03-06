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
    expect(markupCalculator.calculateFlatFee(basePrice1)).to.equal(64.9995);
    expect(markupCalculator.calculateFlatFee(basePrice2)).to.equal(271.60);
    expect(markupCalculator.calculateFlatFee(basePrice3)).to.equal(622.8475000000001);
  });

  it('should calculate worker fee', () => {
    expect(markupCalculator.calculateWorkerFee(1364.9895, 3)).to.equal(49.139622);
    expect(markupCalculator.calculateWorkerFee(5703.60, 1)).to.equal(68.4432);
    expect(markupCalculator.calculateWorkerFee(13079.7975000000001, 4)).to.equal(627.83028);
  });

  it('should calculate material fee', () => {
    expect(markupCalculator.calculateMaterialFee(1364.9895, 'food')).to.equal(177.448635);
    expect(markupCalculator.calculateMaterialFee(5703.60, 'drugs')).to.equal(427.77000000000004);
    expect(markupCalculator.calculateMaterialFee(13079.7975000000001, 'books')).to.equal(0);
    expect(markupCalculator.calculateMaterialFee(1364.9895, 'electronics')).to.equal(27.299789999999998);
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
