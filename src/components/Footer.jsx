import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo.jsx';

export function Footer() {
  return (
    <footer className="bg-[#EDE4D7] text-[#3A2D24] border-t border-[#DFD3C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1 space-y-4">
          <Link to="/" aria-label="Aura Luxury Perfume Home">
            <BrandLogo variant="dark" />
          </Link>
          <p className="text-sm text-[#5C4C40] leading-relaxed">
            Experience curated luxury fragrances crafted for timeless everyday elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#221914] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-[#5C4C40]">
            <li>
              <Link to="/" className="hover:text-[#7B5633] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#7B5633] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/discount" className="hover:text-[#7B5633] transition-colors">
                Discount
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#7B5633] transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#7B5633] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#221914] mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2.5 text-sm text-[#5C4C40]">
            <li>
              <Link to="/collection" className="hover:text-[#7B5633] transition-colors">
                Fragrance Collection
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-[#7B5633] transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-[#7B5633] transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-[#7B5633] transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/about#policies" className="hover:text-[#7B5633] transition-colors">
                Shipping &amp; Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#221914] mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-[#5C4C40]">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#7B5633] shrink-0" aria-hidden="true" />
              <span className="tabular-nums">+92 300 123 4567</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7B5633] shrink-0" aria-hidden="true" />
              <span>info@auraperfume.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#7B5633] shrink-0" aria-hidden="true" />
              <span>Karachi, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Boutique Experience */}
        <div>
          <h3 className="font-serif text-base font-semibold text-[#221914] mb-4">
            Storefront Guide
          </h3>
          <p className="text-xs text-[#5C4C40] leading-relaxed mb-3">
            Responsive boutique browsing across desktop, tablet, and mobile devices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D4C5B3] bg-[#FCFBF9] hover:border-[#7B5633] text-xs font-medium text-[#221914] transition-colors"
          >
            <Smartphone className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
            <span>Browse Full Catalogue</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-[#DFD3C3] py-4 px-4 sm:px-6 bg-[#E5D9C8]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B5A4D]">
          <p>&copy; 2026 Aura Luxury Perfume. All Rights Reserved.</p>
          <p>Portfolio Storefront — Browser-Local Showcase</p>
        </div>
      </div>
    </footer>
  );
}
