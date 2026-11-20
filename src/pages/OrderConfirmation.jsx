import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Info } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { formatPKR } from '../utils/storeLogic.js';

const EMPTY_ORDERS = [];

export function OrderConfirmation() {
  const { orderId } = useParams();
  const [orders] = useLocalStorage(STORAGE_KEYS.DEMO_ORDERS, EMPTY_ORDERS);
  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          title="Order Not Found"
          description="We could not locate that order in this browser's storage."
          actionLabel="View My Orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-2xl bg-white border border-[#ECE5DC] p-6 sm:p-10 shadow-xs">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[#F5EFE6] border border-[#E2D4C0] text-[#7B5633] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9E7538]">
            Order Confirmed
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] mt-1">
            Order {order.orderId}
          </h1>
          <p className="text-sm text-[#6E6259] mt-2">
            Saved on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Light Warm Sand Portfolio Note */}
        <div
          role="note"
          className="mt-6 rounded-xl bg-[#F5EFE6] border border-[#E2D4C0] text-[#221914] p-4 flex items-start gap-3 text-sm"
        >
          <Info className="w-5 h-5 text-[#7B5633] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[#221914]">
              Sample order recorded locally — no real payment or courier dispatch was created.
            </p>
            <p className="text-xs text-[#5C4C40] mt-1">
              This receipt is stored solely inside your browser&apos;s localStorage.
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-8 border-t border-[#ECE5DC] pt-6 space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#221914]">
            Items in Order
          </h2>
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between gap-4 py-2 border-b border-[#ECE5DC] last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-14 rounded-lg object-cover shrink-0 border border-[#EAE3DA]"
                />
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-[#221914] truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#6E6259] tabular-nums">
                    Qty: {item.quantity} &times; {formatPKR(item.unitPrice)}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[#221914] tabular-nums">
                {formatPKR(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping & Totals */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#ECE5DC] pt-6 text-sm">
          <div>
            <h3 className="font-semibold text-[#221914] mb-1.5">
              Shipping Details
            </h3>
            <p className="text-[#4A3E36]">{order.shippingAddress.fullName}</p>
            <p className="text-[#6E6259]">{order.shippingAddress.addressLine}</p>
            <p className="text-[#6E6259]">
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p className="text-[#6E6259]">{order.shippingAddress.country}</p>
            <p className="text-[#6E6259] tabular-nums">{order.shippingAddress.phone}</p>
          </div>

          <div className="space-y-2 sm:text-right tabular-nums">
            <div className="flex sm:justify-end justify-between gap-6">
              <span className="text-[#6E6259]">Subtotal:</span>
              <span className="font-medium text-[#221914]">{formatPKR(order.subtotal)}</span>
            </div>
            <div className="flex sm:justify-end justify-between gap-6">
              <span className="text-[#6E6259]">Shipping:</span>
              <span className="font-medium text-[#221914]">
                {order.shipping === 0 ? 'Free' : formatPKR(order.shipping)}
              </span>
            </div>
            <div className="flex sm:justify-end justify-between gap-6 text-base font-bold text-[#221914] pt-2 border-t border-[#ECE5DC]">
              <span>Total:</span>
              <span>{formatPKR(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/orders"
            className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
