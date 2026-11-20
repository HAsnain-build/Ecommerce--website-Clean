import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { AccountLayout } from '../components/AccountLayout.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { formatPKR } from '../utils/storeLogic.js';

const EMPTY_ORDERS = [];

export function Orders() {
  const [orders] = useLocalStorage(STORAGE_KEYS.DEMO_ORDERS, EMPTY_ORDERS);

  return (
    <AccountLayout
      title="My Orders"
      subtitle="Orders placed during your storefront session stored locally in this browser."
    >
      {orders.length === 0 ? (
        <EmptyState
          icon={<Package className="w-6 h-6" />}
          title="No orders recorded yet"
          description="Add a fragrance to your cart and complete the checkout form to view order receipts here."
          actionLabel="Explore Shop"
          actionTo="/shop"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.orderId}
              className="rounded-2xl bg-white border border-[#ECE5DC] p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ECE5DC]">
                <div>
                  <p className="font-sans text-lg font-semibold text-[#221914]">
                    {order.orderId}
                  </p>
                  <p className="text-xs text-[#6E6259]">
                    {new Date(order.createdAt).toLocaleString()} · {order.status}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-[#221914] tabular-nums">
                    {formatPKR(order.total)}
                  </span>
                  <Link
                    to={`/order-confirmation/${order.orderId}`}
                    className="px-4 py-1.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-xs font-medium transition-colors"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#4A3E36]">
                {order.items.map((item) => (
                  <span key={item.productId} className="tabular-nums">
                    {item.name} &times; {item.quantity}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
