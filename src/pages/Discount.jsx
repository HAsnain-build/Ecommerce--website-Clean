import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingCart, Tag } from 'lucide-react';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { formatPKR, getDiscountPercentage } from '../utils/storeLogic.js';

const CATEGORIES = ['All', 'Men', 'Women', 'Unisex'];

export function Discount() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { requestAddToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const discountedProducts = useMemo(() => {
    const base = PRODUCTS.filter((p) => p.isDiscounted);
    if (selectedCategory === 'All') return base;
    return base.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const menProducts = useMemo(() => PRODUCTS.filter((p) => p.category === 'Men'), []);
  const womenProducts = useMemo(() => PRODUCTS.filter((p) => p.category === 'Women'), []);
  const unisexProducts = useMemo(() => PRODUCTS.filter((p) => p.category === 'Unisex'), []);

  const handleAddToCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    requestAddToCart(
      product,
      1,
      () => navigate('/login', { state: { from: location.pathname } }),
      location.pathname,
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      <div>
        {/* Compact Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#ECE5DC]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538] mb-2">
              Seasonal Collection Savings
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] text-balance">
              Discounted Fragrances Gallery
            </h1>
            <p className="text-sm sm:text-base text-[#6E6259] mt-2 leading-relaxed">
              Curated luxury perfumes available with special seasonal savings across signature Eau de Parfum bottles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              <span>Shop All Perfumes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#DCD2C4] text-[#221914] hover:bg-[#F5EFE6] text-sm font-medium transition-colors whitespace-nowrap"
            >
              <span>Back to Collection</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter discounted perfumes by category"
            className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#F5EFE6]"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white text-[#221914] shadow-xs'
                      : 'text-[#6E6259] hover:text-[#221914]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-[#6E6259] tabular-nums">
            Showing {discountedProducts.length} discounted fragrances
          </p>
        </div>

        {/* Dedicated Discounted Images Gallery Section */}
        <section aria-label="Discounted perfume images gallery" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discountedProducts.map((product) => {
              const discountPct = getDiscountPercentage(product.price, product.originalPrice);
              const savingsAmount = (product.originalPrice ?? product.price) - product.price;
              const wishlisted = isWishlisted(product.id);

              return (
                <article
                  key={product.id}
                  className="group grid grid-cols-1 sm:grid-cols-5 rounded-2xl bg-white border border-[#ECE5DC] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="relative sm:col-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[235px] bg-[#F5EFE6] overflow-hidden">
                    <Link
                      to={`/product/${product.slug}`}
                      className="block w-full h-full"
                      aria-label={`View ${product.name} offer details`}
                    >
                      <SafeImage
                        src={product.image}
                        alt={`${product.name} discounted bottle`}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </Link>
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 border border-[#E4D9CB] text-[#7B5633] text-xs font-semibold tabular-nums shadow-xs">
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      <span>Save {discountPct}%</span>
                    </span>
                  </div>

                  <div className="sm:col-span-3 p-5 sm:p-6 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs uppercase tracking-wider text-[#8C7E72]">
                          {product.category} · {product.size}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          aria-label={
                            wishlisted
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          aria-pressed={wishlisted}
                          className="p-1.5 rounded-full hover:bg-[#F5EFE6] text-[#221914] transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlisted ? 'fill-[#7B5633] text-[#7B5633]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      <Link
                        to={`/product/${product.slug}`}
                        className="font-sans text-xl font-semibold text-[#221914] hover:text-[#7B5633] mt-1 block"
                      >
                        {product.name}
                      </Link>

                      <p className="text-sm text-[#6E6259] mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#ECE5DC]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                        <div className="flex items-baseline gap-2.5 tabular-nums">
                          <span className="text-xl font-bold text-[#221914]">
                            {formatPKR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-[#8C7E72] line-through">
                              {formatPKR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-[#7B5633] tabular-nums">
                          You save {formatPKR(savingsAmount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          to={`/product/${product.slug}`}
                          className="py-2.5 px-4 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* Browse By Category Below Discount Showcase */}
      <section className="pt-8 border-t border-[#ECE5DC] space-y-12">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#221914] mb-5">
            Men&apos;s Fragrances
          </h2>
          <ProductGrid products={menProducts} />
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#221914] mb-5">
            Women&apos;s Fragrances
          </h2>
          <ProductGrid products={womenProducts.slice(0, 4)} />
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#221914] mb-5">
            Unisex Collection
          </h2>
          <ProductGrid products={unisexProducts.slice(0, 4)} />
        </div>
      </section>
    </div>
  );
}
