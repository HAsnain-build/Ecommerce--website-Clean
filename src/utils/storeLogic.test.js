import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products.js';
import {
  calculateCartTotals,
  filterAndSortProducts,
  formatPKR,
  getDiscountPercentage,
  safeParseJSON,
  validateCheckoutInput,
  validateRegisterInput,
} from './storeLogic.js';

test('catalogue has 16 unique perfumes with 8 featured and 8 best sellers', () => {
  assert.equal(PRODUCTS.length, 16);
  const slugs = new Set(PRODUCTS.map((p) => p.slug));
  assert.equal(slugs.size, 16);
  assert.equal(PRODUCTS.filter((p) => p.isFeatured).length, 8);
  assert.equal(PRODUCTS.filter((p) => p.isBestSeller).length, 8);
  assert.equal(PRODUCTS.filter((p) => p.isDiscounted).length, 4);
});

test('formatPKR and discount calculation work accurately', () => {
  assert.equal(formatPKR(4999), 'Rs. 4,999');
  assert.equal(getDiscountPercentage(4999, 6500), 23);
  assert.equal(getDiscountPercentage(5000, undefined), 0);
});

test('filterAndSortProducts filters by query, category, discount and sorts', () => {
  const oudResults = filterAndSortProducts(PRODUCTS, { query: 'oud' });
  assert.ok(oudResults.some((p) => p.slug === 'royal-oud'));

  const womenSorted = filterAndSortProducts(PRODUCTS, {
    category: 'Women',
    sort: 'price-asc',
  });
  assert.ok(womenSorted.every((p) => p.category === 'Women'));
  for (let i = 1; i < womenSorted.length; i++) {
    assert.ok(womenSorted[i].price >= womenSorted[i - 1].price);
  }

  const discounted = filterAndSortProducts(PRODUCTS, { onlyDiscounted: true });
  assert.equal(discounted.length, 4);
});

test('calculateCartTotals applies free shipping above Rs. 5,000', () => {
  const belowThreshold = calculateCartTotals(
    [{ productId: 'aura-07', quantity: 1 }],
    PRODUCTS,
    'standard',
  );
  assert.equal(belowThreshold.subtotal, 4499);
  assert.equal(belowThreshold.shipping, 350);
  assert.equal(belowThreshold.total, 4849);
  assert.equal(belowThreshold.freeShippingRemaining, 501);

  const aboveThreshold = calculateCartTotals(
    [{ productId: 'aura-01', quantity: 1 }],
    PRODUCTS,
    'standard',
  );
  assert.equal(aboveThreshold.subtotal, 6999);
  assert.equal(aboveThreshold.shipping, 0);
  assert.equal(aboveThreshold.total, 6999);
  assert.equal(aboveThreshold.freeShippingRemaining, 0);
});

test('validation rules reject invalid inputs and safeParseJSON handles corrupt data', () => {
  const regErrors = validateRegisterInput({
    fullName: 'A',
    email: 'invalid',
    password: '123',
    confirmPassword: '456',
    acceptedTerms: false,
  });
  assert.ok(regErrors.fullName);
  assert.ok(regErrors.email);
  assert.ok(regErrors.password);
  assert.ok(regErrors.confirmPassword);
  assert.ok(regErrors.acceptedTerms);

  const checkoutErrors = validateCheckoutInput({
    fullName: '',
    email: 'bad',
    phone: '12',
    addressLine: '',
    city: '',
    postalCode: '',
  });
  assert.equal(Object.keys(checkoutErrors).length, 6);

  assert.deepEqual(safeParseJSON('{bad-json', { ok: false }), { ok: false });
});
