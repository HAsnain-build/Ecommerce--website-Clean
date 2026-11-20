import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo.jsx';

export function Footer() {
  return (
    // Background ko dark brown (walnut) kiya gaya hai
    <footer className="bg-[#2A1D17] text-[#E8E0D5] border-t border-[#3D2C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1 space-y-4">
          <Link to="/" aria-label="Aura Luxury Perfume Home">
            {/* Logo ko light variant diya hai taake dark background par nazar aaye */}
            <BrandLogo variant="light" />
          </Link>
          <p className="text-sm text-[#B8A99A] leading-relaxed">
            Experience curated luxury fragrances crafted for timeless everyday elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#FCFBF9] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-[#B8A99A]">
            <li>
              <Link to="/" className="hover:text-[#E6C57E] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#E6C57E] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/discount" className="hover:text-[#E6C57E] transition-colors">
                Discount
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#E6C57E] transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#E6C57E] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#FCFBF9] mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2.5 text-sm text-[#B8A99A]">
            <li>
              <Link to="/collection" className="hover:text-[#E6C57E] transition-colors">
                Fragrance Collection
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-[#E6C57E] transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-[#E6C57E] transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-[#E6C57E] transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/about#policies" className="hover:text-[#E6C57E] transition-colors">
                Shipping &amp; Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#FCFBF9] mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-[#B8A99A]">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#E6C57E] shrink-0" aria-hidden="true" />
              <span className="tabular-nums">+92 300 123 4567</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#E6C57E] shrink-0" aria-hidden="true" />
              <span>info@auraperfume.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#E6C57E] shrink-0" aria-hidden="true" />
              <span>Karachi, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Boutique Experience */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#FCFBF9] mb-4">
            Storefront Guide
          </h3>
          <p className="text-xs text-[#B8A99A] leading-relaxed mb-3">
            Responsive boutique browsing across desktop, tablet, and mobile devices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#4A372D] bg-[#3A2A21] hover:border-[#E6C57E] text-xs font-medium text-[#FCFBF9] transition-colors"
          >
            <Smartphone className="w-4 h-4 text-[#E6C57E]" aria-hidden="true" />
            <span>Browse Full Catalogue</span>
          </Link>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#3D2C24] py-4 px-4 sm:px-6 bg-[#211611]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9A897B]">
          <p>&copy; 2026 Aura Luxury Perfume. All Rights Reserved.</p>
          <p>Portfolio Storefront — Browser-Local Showcase</p>
        </div>
      </div>
    </footer>
  );
}