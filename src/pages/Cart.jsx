import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPKR, FREE_SHIPPING_THRESHOLD } from '../utils/storeLogic.js';

export function Cart() {
  const {
    resolvedItems,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShippingRemaining,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Shopping Cart</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#ECE5DC]">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
          Your Shopping Cart
        </h1>
        {resolvedItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-[#7B5633] hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {resolvedItems.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<ShoppingBag className="w-6 h-6" />}
            title="Your cart is empty"
            description="Discover our 16 signature fragrances and add your favorite scent to continue to checkout."
            actionLabel="Explore Collection"
            actionTo="/shop"
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            {resolvedItems.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl bg-white border border-[#ECE5DC] p-4 shadow-xs"
              >
                <Link
                  to={`/product/${product.slug}`}
                  className="w-full sm:w-28 aspect-[4/3] rounded-lg bg-[#F5EFE6] overflow-hidden shrink-0 border border-[#EAE3DA]"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#8C7E72]">
                    {product.category} · {product.size}
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="font-sans text-lg font-semibold text-[#221914] hover:text-[#7B5633]"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-[#6E6259] mt-0.5 tabular-nums">
                    Unit: {formatPKR(product.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <div className="inline-flex items-center rounded-lg border border-[#DCD2C4] bg-[#FCFBF9]">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 text-[#221914] hover:bg-[#F5EFE6] rounded-l-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 text-[#221914] hover:bg-[#F5EFE6] rounded-r-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-semibold text-[#221914] tabular-nums min-w-[90px] text-right">
                    {formatPKR(lineTotal)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="p-2 rounded-lg text-[#8C7E72] hover:text-[#7B5633] hover:bg-[#F5EFE6] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#7B5633] hover:underline"
              >
                <span>&larr; Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-4 rounded-2xl bg-white border border-[#ECE5DC] p-6 space-y-4 shadow-xs">
            <h2 className="font-serif text-xl font-semibold text-[#221914]">
              Order Summary ({cartCount})
            </h2>

            <div className="rounded-lg bg-[#FCFBF9] border border-[#ECE5DC] p-3 text-xs text-[#6E6259]">
              {freeShippingRemaining === 0 ? (
                <span>
                  Your order qualifies for <strong className="text-[#221914]">Free Standard Shipping</strong> (above{' '}
                  {formatPKR(FREE_SHIPPING_THRESHOLD)}).
                </span>
              ) : (
                <span className="tabular-nums">
                  Add <strong className="text-[#221914]">{formatPKR(freeShippingRemaining)}</strong> more to unlock Free Standard Shipping.
                </span>
              )}
            </div>

            <div className="space-y-2.5 text-sm border-t border-[#ECE5DC] pt-4">
              <div className="flex justify-between">
                <span className="text-[#6E6259]">Subtotal</span>
                <span className="font-medium text-[#221914] tabular-nums">
                  {formatPKR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6259]">Shipping</span>
                <span className="font-medium text-[#221914] tabular-nums">
                  {shipping === 0 ? 'Free' : formatPKR(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#221914] border-t border-[#ECE5DC] pt-3 tabular-nums">
                <span>Total</span>
                <span>{formatPKR(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            {!isAuthenticated && (
              <p className="text-xs text-[#6E6259] text-center">
                Sign in required before placing your order.
              </p>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
