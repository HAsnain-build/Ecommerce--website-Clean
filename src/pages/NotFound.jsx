import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="rounded-2xl bg-white border border-[#ECE5DC] p-10 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7538]">
          404
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] mt-1">
          Page not found
        </h1>
        <p className="text-sm text-[#6E6259] mt-2 max-w-md mx-auto">
          The page you requested could not be found. Return to the storefront or explore our 16-perfume collection.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
