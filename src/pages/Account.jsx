import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, ShoppingBag } from 'lucide-react';
import { AccountLayout } from '../components/AccountLayout.jsx';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { validateEmail } from '../utils/storeLogic.js';

const EMPTY_ORDERS = [];
const EMPTY_ADDRESSES = [];

export function Account() {
  const { user, updateProfile } = useAuth();
  const { cartCount } = useCart();
  const { showToast } = useToast();
  const [orders] = useLocalStorage(STORAGE_KEYS.DEMO_ORDERS, EMPTY_ORDERS);
  const [addresses] = useLocalStorage(
    STORAGE_KEYS.DEMO_ADDRESSES,
    EMPTY_ADDRESSES,
  );

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [error, setError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    updateProfile({ fullName, email, phone });
    showToast('Profile updated in browser storage.', 'success');
  };

  return (
    <AccountLayout
      title="Account Overview"
      subtitle="Manage your profile details, saved addresses, and orders."
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/orders"
            className="rounded-xl bg-white border border-[#ECE5DC] p-5 hover:border-[#7B5633] transition-colors shadow-xs"
          >
            <Package className="w-5 h-5 text-[#7B5633]" aria-hidden="true" />
            <p className="text-2xl font-bold text-[#221914] mt-2 tabular-nums">
              {orders.length}
            </p>
            <p className="text-xs text-[#6E6259]">Saved Orders</p>
          </Link>

          <Link
            to="/account/addresses"
            className="rounded-xl bg-white border border-[#ECE5DC] p-5 hover:border-[#7B5633] transition-colors shadow-xs"
          >
            <MapPin className="w-5 h-5 text-[#7B5633]" aria-hidden="true" />
            <p className="text-2xl font-bold text-[#221914] mt-2 tabular-nums">
              {addresses.length}
            </p>
            <p className="text-xs text-[#6E6259]">Saved Addresses</p>
          </Link>

          <Link
            to="/cart"
            className="rounded-xl bg-white border border-[#ECE5DC] p-5 hover:border-[#7B5633] transition-colors shadow-xs"
          >
            <ShoppingBag className="w-5 h-5 text-[#7B5633]" aria-hidden="true" />
            <p className="text-2xl font-bold text-[#221914] mt-2 tabular-nums">
              {cartCount}
            </p>
            <p className="text-xs text-[#6E6259]">Items in Cart</p>
          </Link>
        </div>

        {/* Profile Edit Form */}
        <section className="rounded-2xl bg-white border border-[#ECE5DC] p-6 shadow-xs">
          <h2 className="font-serif text-xl font-semibold text-[#221914] mb-4">
            Profile Information
          </h2>

          <form onSubmit={handleSave} noValidate className="space-y-4 max-w-lg">
            <div>
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Phone (Optional)
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#9E2A2B]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
            >
              Save Profile
            </button>
          </form>
        </section>
      </div>
    </AccountLayout>
  );
}
