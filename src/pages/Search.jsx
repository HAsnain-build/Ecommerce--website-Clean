import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { PRODUCTS } from '../data/products.js';
import { filterAndSortProducts } from '../utils/storeLogic.js';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(queryParam);

  const results = useMemo(
    () => filterAndSortProducts(PRODUCTS, { query: queryParam }),
    [queryParam],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  const handleClear = () => {
    setInputValue('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Search</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
          Search Fragrances
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon
              className="w-4 h-4 text-[#7B5633] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <label htmlFor="page-search-input" className="sr-only">
              Search perfumes
            </label>
            <input
              id="page-search-input"
              type="search"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchParams(e.target.value.trim() ? { q: e.target.value } : {});
              }}
              placeholder="Search by perfume name, category, or scent note..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A685A] hover:text-[#221914]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-8">
        <p className="text-sm text-[#6E6259] mb-6 tabular-nums">
          {queryParam.trim()
            ? `${results.length} matching results for "${queryParam.trim()}"`
            : `Showing all ${results.length} perfumes`}
        </p>

        {results.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="w-6 h-6" />}
            title="No products found"
            description={`No perfumes matched "${queryParam}". Try searching for "Oud", "Rose", "Jasmine", or "Unisex".`}
            actionLabel="Clear Search"
            onAction={handleClear}
          />
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </div>
  );
}