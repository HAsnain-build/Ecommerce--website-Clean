import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { PRODUCTS } from '../data/products.js';
import { filterAndSortProducts } from '../utils/storeLogic.js';

const COLLECTION_TABS = [
  {
    label: 'All Collections',
    value: 'All',
    subtitle: 'Complete 16-perfume showcase across woods, florals, and fresh citrus accords.',
  },
  {
    label: "Men's Signatures",
    value: 'Men',
    subtitle: 'Smoked agarwood, architectural leather, cedarwood, and brisk marine accords.',
  },
  {
    label: "Women's Florals",
    value: 'Women',
    subtitle: 'Damask rose, nocturnal jasmine, bourbon vanilla, and luminous white peony.',
  },
  {
    label: 'Unisex Atelier',
    value: 'Unisex',
    subtitle: 'Balanced saffron woods, coastal neroli, warm ambergris, and serene white musk.',
  },
];

export function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get('category');
  const activeCategory =
    paramCategory && ['Men', 'Women', 'Unisex'].includes(paramCategory)
      ? paramCategory
      : 'All';

  const activeMeta =
    COLLECTION_TABS.find((t) => t.value === activeCategory) || COLLECTION_TABS[0];

  const items = useMemo(
    () => filterAndSortProducts(PRODUCTS, { category: activeCategory }),
    [activeCategory],
  );

  const selectCategory = (val) => {
    if (val === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: val });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Collection</span>
      </nav>

      <div className="pb-6 border-b border-[#ECE5DC]">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538] mb-2">
          Curated Fragrance Families
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
          {activeMeta.label}
        </h1>
        <p className="text-sm sm:text-base text-[#6E6259] mt-2 max-w-2xl">
          {activeMeta.subtitle}
        </p>
      </div>

      {/* Category Switcher */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Collection categories"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#F5EFE6]"
        >
          {COLLECTION_TABS.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(tab.value)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#221914] shadow-xs'
                    : 'text-[#6E6259] hover:text-[#221914]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span className="text-sm text-[#6E6259] tabular-nums">
          {items.length} fragrances
        </span>
      </div>

      <div className="mt-8">
        <ProductGrid products={items} />
      </div>
    </div>
  );
}
