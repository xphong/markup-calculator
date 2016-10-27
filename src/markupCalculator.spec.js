'use strict';

const expect = require('chai').expect;
const MarkupCalculator = require('./MarkupCalculator');

describe('Markup Calculator', () => {
  let markupCalculator;

  beforeEach(() => {
    markupCalculator = new MarkupCalculator();
  });

  it('should calculate flat markup fee', () => {
    expect(markupCalculator.calculateFlatFee(1299.99)).to.equal(65.00);
    expect(markupCalculator.calculateFlatFee(5432.00)).to.equal(271.60);
    expect(markupCalculator.calculateFlatFee(12456.95)).to.equal(622.85);
  });

});
