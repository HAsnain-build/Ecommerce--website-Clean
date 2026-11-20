import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { BrandLogo } from './BrandLogo.jsx';

export function Navbar({ onOpenSearch, onOpenCartDrawer }) {
  const { cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const navLinkClass = (isActive) =>
    `px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
      isActive
        ? 'bg-[#7B5633] text-[#FCFBF9]'
        : 'text-[#221914] hover:text-[#7B5633]'
    }`;

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur border-b border-[#ECE5DC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-1.5 -ml-1.5 rounded-md text-[#221914] hover:bg-[#F5EFE6]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/" aria-label="Aura Luxury Perfume Home">
            <BrandLogo variant="dark" />
          </Link>
        </div>

        {/* Center: Horizontal Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center justify-center gap-1 lg:gap-2.5 text-sm"
        >
          <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>
            About
          </NavLink>

          {/* Collection Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'collection' ? null : 'collection'))
              }
              aria-expanded={openDropdown === 'collection'}
              className={`inline-flex items-center gap-1 ${navLinkClass(
                location.pathname === '/collection',
              )}`}
            >
              <span>Collection</span>
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {openDropdown === 'collection' && (
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white border border-[#EAE3DA] shadow-lg py-2 z-50">
                <Link
                  to="/collection"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  All Collections
                </Link>
                <Link
                  to="/collection?category=Men"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Men&apos;s Fragrances
                </Link>
                <Link
                  to="/collection?category=Women"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Women&apos;s Fragrances
                </Link>
                <Link
                  to="/collection?category=Unisex"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Unisex Signatures
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/discount" className={({ isActive }) => navLinkClass(isActive)}>
            Discount
          </NavLink>

          {/* Shop Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'shop' ? null : 'shop'))
              }
              aria-expanded={openDropdown === 'shop'}
              className={`inline-flex items-center gap-1 ${navLinkClass(
                location.pathname === '/shop',
              )}`}
            >
              <span>Shop</span>
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {openDropdown === 'shop' && (
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white border border-[#EAE3DA] shadow-lg py-2 z-50">
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  All Perfumes (16)
                </Link>
                <Link
                  to="/shop?group=featured"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Featured Collection
                </Link>
                <Link
                  to="/shop?group=bestsellers"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Best Sellers
                </Link>
                <Link
                  to="/discount"
                  className="block px-4 py-2 text-sm text-[#221914] hover:bg-[#F5EFE6]"
                >
                  Discount Deals
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>
            Contact
          </NavLink>
        </nav>

        {/* Right: Search, Account, Cart */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search perfumes"
            className="p-2 rounded-full text-[#221914] hover:bg-[#F5EFE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#7B5633]"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to={isAuthenticated ? '/account' : '/login'}
            aria-label={isAuthenticated ? `Account (${user?.fullName})` : 'Sign in to account'}
            className="p-2 rounded-full text-[#221914] hover:bg-[#F5EFE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#7B5633]"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={onOpenCartDrawer}
            aria-label={`Shopping cart (${cartCount} items)`}
            className="relative p-2 rounded-full text-[#221914] hover:bg-[#F5EFE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#7B5633]"
          >
            <ShoppingBag className="w-5 h-5" />
            <span
              data-testid="navbar-cart-count"
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#7B5633] text-[#FCFBF9] text-[10px] font-semibold flex items-center justify-center tabular-nums"
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Narrow Mobile Menu Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#ECE5DC] bg-white px-4 py-4 space-y-1.5"
        >
          <NavLink to="/" end className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            About
          </NavLink>
          <NavLink to="/collection" className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            Collection
          </NavLink>
          <NavLink to="/discount" className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            Discount
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `block ${navLinkClass(isActive)}`}>
            Contact
          </NavLink>
          <div className="pt-2 border-t border-[#ECE5DC] flex items-center gap-3">
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex-1 text-center py-2 px-3 rounded-lg bg-[#7B5633] text-white text-sm font-medium"
            >
              {isAuthenticated ? 'My Account' : 'Sign In'}
            </Link>
            <Link
              to="/wishlist"
              className="flex-1 text-center py-2 px-3 rounded-lg border border-[#DCD2C4] text-[#221914] text-sm font-medium"
            >
              Wishlist
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
