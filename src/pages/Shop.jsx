import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { PRODUCTS } from '../data/products.js';
import { filterAndSortProducts } from '../utils/storeLogic.js';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGroup = searchParams.get('group') || 'all';
  const initialCategory = searchParams.get('category') || 'All';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState(initialSort);
  const [group, setGroup] = useState(initialGroup);

  useEffect(() => {
    const paramGroup = searchParams.get('group') || 'all';
    const paramCategory = searchParams.get('category') || 'All';
    setGroup(paramGroup);
    if (['All', 'Men', 'Women', 'Unisex'].includes(paramCategory)) {
      setCategory(paramCategory);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let minPrice;
    let maxPrice;

    if (priceRange === 'under-5000') {
      maxPrice = 4999;
    } else if (priceRange === '5000-6500') {
      minPrice = 5000;
      maxPrice = 6500;
    } else if (priceRange === 'above-6500') {
      minPrice = 6501;
    }

    return filterAndSortProducts(PRODUCTS, {
      category,
      minPrice,
      maxPrice,
      sort,
      group,
    });
  }, [category, priceRange, sort, group]);

  const handleClearFilters = () => {
    setCategory('All');
    setPriceRange('all');
    setSort('featured');
    setGroup('all');
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== 'All' || priceRange !== 'all' || sort !== 'featured' || group !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Shop</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#ECE5DC]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
            {group === 'featured'
              ? 'Featured Collection'
              : group === 'bestsellers'
                ? 'Best Sellers & New Arrivals'
                : 'All Perfumes'}
          </h1>
          <p className="text-sm text-[#6E6259] mt-1">
            Browse our full 16-fragrance catalogue with category, price, and sort filters.
          </p>
        </div>
        <p className="text-sm font-medium text-[#7B5633] tabular-nums">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'perfume' : 'perfumes'} shown
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="mt-6 rounded-xl bg-white border border-[#ECE5DC] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E6259] mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Category:</span>
          </span>
          {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                category === cat
                  ? 'bg-[#7B5633] text-white'
                  : 'bg-[#F5EFE6] text-[#221914] hover:bg-[#EAE0D2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="shop-price-filter" className="text-xs font-medium text-[#6E6259]">
              Price:
            </label>
            <select
              id="shop-price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] px-3 py-1.5 text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            >
              <option value="all">All Prices</option>
              <option value="under-5000">Under Rs. 5,000</option>
              <option value="5000-6500">Rs. 5,000 – Rs. 6,500</option>
              <option value="above-6500">Above Rs. 6,500</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort-select" className="text-xs font-medium text-[#6E6259]">
              Sort:
            </label>
            <select
              id="shop-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] px-3 py-1.5 text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7B5633] hover:bg-[#F5EFE6] transition-colors whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No perfumes match these filters"
            description="Try adjusting your selected category or price range to browse the full collection."
            actionLabel="Clear Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
