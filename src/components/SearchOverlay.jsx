import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products.js';
import { filterAndSortProducts, formatPKR } from '../utils/storeLogic.js';
import { SafeImage } from './SafeImage.jsx';

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const liveResults = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    return filterAndSortProducts(PRODUCTS, { query }).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    onClose();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search perfumes"
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#221914]/40 backdrop-blur-xs pt-16 sm:pt-24 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#ECE5DC] shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[#ECE5DC]">
          <Search className="w-5 h-5 text-[#7B5633] shrink-0" aria-hidden="true" />
          <label htmlFor="overlay-search-input" className="sr-only">
            Search perfumes by name, category, or notes
          </label>
          <input
            id="overlay-search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Royal Oud, Floral, Unisex, Jasmine..."
            className="w-full bg-transparent text-[#221914] placeholder:text-[#8C7E72] text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-medium text-[#7B5633] hover:underline whitespace-nowrap"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-[#7B5633] text-white text-sm font-medium hover:bg-[#5E3F23] transition-colors whitespace-nowrap"
          >
            Search
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-[#6E6259] hover:bg-[#F5EFE6]"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8C7E72] mb-3">
            {query.trim() ? `Matches (${liveResults.length})` : 'Popular Fragrances'}
          </p>

          {liveResults.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-serif text-lg text-[#221914]">Koi product nahi mila</p>
              <p className="text-sm text-[#6E6259] mt-1">
                Try another scent name, category (Men, Women, Unisex), or note.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-4 px-4 py-2 rounded-lg bg-[#F5EFE6] text-[#221914] text-sm font-medium hover:bg-[#EAE0D2]"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FCFBF9] border border-[#ECE5DC] hover:bg-[#F5EFE6] transition-colors"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-sm font-semibold text-[#221914] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#6E6259]">{product.category}</p>
                    <p className="text-xs font-semibold text-[#221914] tabular-nums mt-0.5">
                      {formatPKR(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim() && liveResults.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#ECE5DC] flex justify-end">
              <Link
                to={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7B5633] hover:underline"
              >
                <span>View all results for &ldquo;{query.trim()}&rdquo;</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
