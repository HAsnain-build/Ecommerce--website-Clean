export const FREE_SHIPPING_THRESHOLD = 5000;
export const FLAT_SHIPPING_FEE = 350;
export const EXPRESS_SHIPPING_FEE = 750;

export function formatPKR(amount) {
  const rounded = Math.round(amount);
  return `Rs. ${rounded.toLocaleString('en-PK')}`;
}

export function getDiscountPercentage(price, originalPrice) {
  if (!originalPrice || originalPrice <= price || originalPrice <= 0) {
    return 0;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function filterAndSortProducts(products, options = {}) {
  const {
    query = '',
    category = 'All',
    minPrice,
    maxPrice,
    sort = 'featured',
    onlyDiscounted = false,
    group = 'all',
  } = options;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (group === 'featured' && !item.isFeatured) return false;
    if (group === 'bestsellers' && !item.isBestSeller) return false;
    if (onlyDiscounted && !item.isDiscounted) return false;
    if (category !== 'All' && item.category !== category) return false;
    if (typeof minPrice === 'number' && item.price < minPrice) return false;
    if (typeof maxPrice === 'number' && item.price > maxPrice) return false;

    if (normalizedQuery) {
      const haystack = `${item.name} ${item.category} ${item.description} ${item.notes.top} ${item.notes.heart} ${item.notes.base}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  switch (sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
      break;
  }

  return sorted;
}

export function calculateCartTotals(
  cartItems,
  products,
  deliveryMethod = 'standard',
) {
  let subtotal = 0;
  let itemCount = 0;

  for (const item of cartItems) {
    if (item.quantity <= 0) continue;
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    subtotal += product.price * item.quantity;
    itemCount += item.quantity;
  }

  if (itemCount === 0) {
    return {
      subtotal: 0,
      shipping: 0,
      total: 0,
      itemCount: 0,
      freeShippingRemaining: FREE_SHIPPING_THRESHOLD,
    };
  }

  const standardShipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const shipping = deliveryMethod === 'express' ? EXPRESS_SHIPPING_FEE : standardShipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    itemCount,
    freeShippingRemaining,
  };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateRegisterInput(input) {
  const errors = {};
  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!validateEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (input.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (!input.acceptedTerms) {
    errors.acceptedTerms = 'Please accept the terms to continue.';
  }
  return errors;
}

export function validateCheckoutInput(input) {
  const errors = {};
  if (!input.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }
  if (!validateEmail(input.email)) {
    errors.email = 'Valid email address is required.';
  }
  if (!input.phone.trim() || input.phone.trim().length < 7) {
    errors.phone = 'Valid phone number is required.';
  }
  if (!input.addressLine.trim() || input.addressLine.trim().length < 5) {
    errors.addressLine = 'Street address is required.';
  }
  if (!input.city.trim()) {
    errors.city = 'City is required.';
  }
  if (!input.postalCode.trim()) {
    errors.postalCode = 'Postal code is required.';
  }
  return errors;
}

export function validateContactInput(input) {
  const errors = {};
  if (!input.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!validateEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.subject.trim()) {
    errors.subject = 'Subject is required.';
  }
  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }
  return errors;
}

export function safeParseJSON(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function generateDemoOrderId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `AURA-${num}`;
}
