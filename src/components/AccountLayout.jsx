import { NavLink, useNavigate } from 'react-router-dom';
import { Heart, LogOut, MapPin, Package, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export function AccountLayout({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Signed out of your account.', 'info');
    navigate('/');
  };

  const navLinkClass = (isActive) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#7B5633] text-white'
        : 'text-[#221914] hover:bg-[#F5EFE6]'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="pb-6 border-b border-[#ECE5DC]">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538]">
          My Account
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] mt-1">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[#6E6259] mt-1">{subtitle}</p>}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 rounded-2xl bg-white border border-[#ECE5DC] p-4 space-y-1.5 shadow-xs">
          <div className="px-3 py-2 mb-2 border-b border-[#ECE5DC]">
            <p className="font-sans text-base font-semibold text-[#221914] truncate">
              {user?.fullName}
            </p>
            <p className="text-xs text-[#6E6259] truncate">{user?.email}</p>
          </div>

          <NavLink to="/account" end className={({ isActive }) => navLinkClass(isActive)}>
            <User className="w-4 h-4" aria-hidden="true" />
            <span>Profile Overview</span>
          </NavLink>
          <NavLink
            to="/account/addresses"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>Address Book</span>
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => navLinkClass(isActive)}>
            <Package className="w-4 h-4" aria-hidden="true" />
            <span>My Orders</span>
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => navLinkClass(isActive)}>
            <Heart className="w-4 h-4" aria-hidden="true" />
            <span>Wishlist</span>
          </NavLink>

          <div className="pt-2 border-t border-[#ECE5DC]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#7B5633] hover:bg-[#F5EFE6] transition-colors"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
