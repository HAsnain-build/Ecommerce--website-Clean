import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Info, Minus, Plus, ShieldCheck } from 'lucide-react';
import { SafeImage } from '../components/SafeImage.jsx';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import {
  calculateCartTotals,
  formatPKR,
  generateDemoOrderId,
  validateCheckoutInput,
} from '../utils/storeLogic.js';

const EMPTY_ADDRESSES = [];
const EMPTY_ORDERS = [];

export function Checkout() {
  const { user } = useAuth();
  const { cartItems, resolvedItems, updateQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [savedAddresses] = useLocalStorage(
    STORAGE_KEYS.DEMO_ADDRESSES,
    EMPTY_ADDRESSES,
  );
  const [, setDemoOrders] = useLocalStorage(
    STORAGE_KEYS.DEMO_ORDERS,
    EMPTY_ORDERS,
  );

  const defaultAddress = useMemo(
    () => savedAddresses.find((a) => a.isDefault) || savedAddresses[0],
    [savedAddresses],
  );

  const [fullName, setFullName] = useState(
    defaultAddress?.fullName || user?.fullName || '',
  );
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(defaultAddress?.phone || user?.phone || '');
  const [addressLine, setAddressLine] = useState(defaultAddress?.addressLine || '');
  const [city, setCity] = useState(defaultAddress?.city || '');
  const [postalCode, setPostalCode] = useState(defaultAddress?.postalCode || '');
  const [country, setCountry] = useState(defaultAddress?.country || 'Pakistan');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultAddress && !addressLine) {
      setFullName((prev) => prev || defaultAddress.fullName);
      setPhone((prev) => prev || defaultAddress.phone);
      setAddressLine(defaultAddress.addressLine);
      setCity(defaultAddress.city);
      setPostalCode(defaultAddress.postalCode);
      setCountry(defaultAddress.country);
    }
  }, [defaultAddress, addressLine]);

  if (resolvedItems.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  const totals = calculateCartTotals(cartItems, PRODUCTS, deliveryMethod);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateCheckoutInput({
      fullName,
      email,
      phone,
      addressLine,
      city,
      postalCode,
    });

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    const orderId = generateDemoOrderId();

    const newOrder = {
      orderId,
      userId: user?.id || 'guest',
      email: email.trim().toLowerCase(),
      items: resolvedItems.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        unitPrice: product.price,
        quantity,
        size: product.size,
      })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      deliveryMethod,
      shippingAddress: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        addressLine: addressLine.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim() || 'Pakistan',
      },
      paymentMethod: 'Cash on Delivery (Portfolio Preview)',
      status: 'Order Recorded',
      createdAt: new Date().toISOString(),
    };

    window.setTimeout(() => {
      setDemoOrders((prev) => [newOrder, ...prev]);
      clearCart();
      showToast('Order placed successfully.', 'success');
      navigate(`/order-confirmation/${orderId}`, { replace: true });
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#8C7E72] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/cart" className="hover:text-[#221914]">
          Cart
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Order Information &amp; Checkout</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
        Order Information &amp; Checkout
      </h1>
      <p className="text-sm text-[#6E6259] mt-1">
        Review your selected fragrances and enter your shipping details to place your order.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-6">
          <section className="rounded-2xl bg-white border border-[#ECE5DC] p-6 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#221914]">
              Contact &amp; Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="co-fullname"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="co-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="co-email"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="co-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="co-phone"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="co-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: '' }));
                }}
                placeholder="+92 300 0000000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
              {errors.phone && (
                <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="co-address"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Street Address
              </label>
              <input
                id="co-address"
                type="text"
                value={addressLine}
                onChange={(e) => {
                  setAddressLine(e.target.value);
                  if (errors.addressLine) setErrors((p) => ({ ...p, addressLine: '' }));
                }}
                placeholder="House 14, Clifton Block 4"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
              {errors.addressLine && (
                <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                  {errors.addressLine}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="co-city"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  City
                </label>
                <input
                  id="co-city"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((p) => ({ ...p, city: '' }));
                  }}
                  placeholder="Karachi"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.city && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="co-postal"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Postal Code
                </label>
                <input
                  id="co-postal"
                  type="text"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    if (errors.postalCode) setErrors((p) => ({ ...p, postalCode: '' }));
                  }}
                  placeholder="75600"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.postalCode && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.postalCode}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="co-country"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Country
                </label>
                <input
                  id="co-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-[#ECE5DC] p-6 space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-[#221914]">
              Delivery Method
            </h2>

            <label className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#FCFBF9] border border-[#DCD2C4] cursor-pointer">
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'standard'}
                  onChange={() => setDeliveryMethod('standard')}
                  className="accent-[#7B5633]"
                />
                <span>
                  <span className="block text-sm font-semibold text-[#221914]">
                    Standard Delivery
                  </span>
                  <span className="block text-xs text-[#6E6259]">
                    Complimentary on orders Rs. 5,000+ (otherwise Rs. 350)
                  </span>
                </span>
              </span>
              <span className="text-sm font-semibold text-[#221914] tabular-nums">
                {totals.subtotal >= 5000 ? 'Free' : 'Rs. 350'}
              </span>
            </label>

            <label className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#FCFBF9] border border-[#DCD2C4] cursor-pointer">
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'express'}
                  onChange={() => setDeliveryMethod('express')}
                  className="accent-[#7B5633]"
                />
                <span>
                  <span className="block text-sm font-semibold text-[#221914]">
                    Express Courier
                  </span>
                  <span className="block text-xs text-[#6E6259]">
                    Priority dispatch handling
                  </span>
                </span>
              </span>
              <span className="text-sm font-semibold text-[#221914] tabular-nums">
                Rs. 750
              </span>
            </label>
          </section>

          <section className="rounded-2xl bg-[#F5EFE6] border border-[#E2D4C0] text-[#221914] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#7B5633] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#221914]">
                  Payment Preview · No Card Required
                </h2>
                <p className="text-xs sm:text-sm text-[#5C4C40] mt-1 leading-relaxed">
                  No real payment card is processed on this showcase storefront. Submitting places a sample order stored locally in your browser.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-5 rounded-2xl bg-white border border-[#ECE5DC] p-6 space-y-5 lg:sticky lg:top-24 shadow-xs">
          <h2 className="font-serif text-2xl font-semibold text-[#221914]">
            Selected Fragrances ({totals.itemCount})
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {resolvedItems.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 pb-4 border-b border-[#ECE5DC] last:border-0"
              >
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-20 rounded-xl object-cover shrink-0 border border-[#ECE5DC]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-[#8C7E72]">
                    {product.category} · {product.size}
                  </p>
                  <p className="font-sans text-sm font-semibold text-[#221914] truncate">
                    {product.name}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-lg border border-[#DCD2C4] bg-[#FCFBF9]">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 text-[#221914] hover:bg-[#F5EFE6] rounded-l-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 text-[#221914] hover:bg-[#F5EFE6] rounded-r-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[#221914] tabular-nums">
                      {formatPKR(lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#ECE5DC] pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6E6259]">Subtotal</span>
              <span className="font-medium text-[#221914] tabular-nums">
                {formatPKR(totals.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6E6259]">Shipping</span>
              <span className="font-medium text-[#221914] tabular-nums">
                {totals.shipping === 0 ? 'Free' : formatPKR(totals.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#221914] border-t border-[#ECE5DC] pt-3 tabular-nums">
              <span>Total</span>
              <span>{formatPKR(totals.total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-[#6E6259]">
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Saved locally — no real charge</span>
          </p>
        </aside>
      </form>
    </div>
  );
}
