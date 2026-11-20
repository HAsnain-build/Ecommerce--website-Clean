import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPKR, FREE_SHIPPING_THRESHOLD } from '../utils/storeLogic.js';
import { SafeImage } from './SafeImage.jsx';

export function CartDrawer({ isOpen, onClose }) {
  const {
    resolvedItems,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShippingRemaining,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const handleViewFullCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag and quick checkout"
      className="fixed inset-0 z-50 flex justify-end bg-[#221914]/35 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#EAE3DA] flex flex-col">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#ECE5DC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#7B5633]" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold text-[#221914]">
              Your Order Bag ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order drawer"
            className="p-2 rounded-full text-[#6E6259] hover:bg-[#F5EFE6] hover:text-[#221914]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {resolvedItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="font-serif text-xl font-semibold text-[#221914]">
                Your bag is empty
              </p>
              <p className="text-sm text-[#6E6259] max-w-xs mx-auto">
                Select any fragrance from our collection to preview your order here.
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-[#7B5633] text-white text-sm font-medium hover:bg-[#624224]"
              >
                Explore Perfumes
              </Link>
            </div>
          ) : (
            <>
              {resolvedItems.map(({ product, quantity, lineTotal }) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-5 border-b border-[#ECE5DC] last:border-0"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="w-24 h-24 rounded-xl bg-[#F5EFE6] overflow-hidden shrink-0 border border-[#EAE3DA]"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#8C7E72]">
                          {product.category} · {product.size}
                        </p>
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={onClose}
                          className="font-sans text-base font-semibold text-[#221914] hover:text-[#7B5633]"
                        >
                          {product.name}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-1 text-[#8C7E72] hover:text-[#7B5633]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg border border-[#DCD2C4] bg-[#FCFBF9]">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-[#221914] hover:bg-[#F5EFE6] rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-[#221914] hover:bg-[#F5EFE6] rounded-r-lg"
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
            </>
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {resolvedItems.length > 0 && (
          <div className="border-t border-[#ECE5DC] bg-[#FCFBF9] px-6 py-5 space-y-4">
            <div className="text-xs text-[#6E6259]">
              {freeShippingRemaining === 0 ? (
                <span>
                  Qualifies for <strong className="text-[#221914]">Free Standard Delivery</strong> (orders above {formatPKR(FREE_SHIPPING_THRESHOLD)}).
                </span>
              ) : (
                <span className="tabular-nums">
                  Add <strong className="text-[#221914]">{formatPKR(freeShippingRemaining)}</strong> more for free standard delivery.
                </span>
              )}
            </div>

            <div className="space-y-1.5 text-sm">
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
              <div className="flex justify-between text-base font-bold text-[#221914] pt-2 border-t border-[#ECE5DC] tabular-nums">
                <span>Estimated Total</span>
                <span>{formatPKR(total)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#7B5633] hover:bg-[#624224] text-white text-sm font-semibold transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleViewFullCart}
                className="w-full py-2.5 px-5 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors"
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
