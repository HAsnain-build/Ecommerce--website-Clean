import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { formatPKR, getDiscountPercentage } from '../utils/storeLogic.js';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { requestAddToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          title="Perfume Not Found"
          description="The requested fragrance could not be found in our catalogue."
          actionLabel="Explore Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const discountPct = getDiscountPercentage(product.price, product.originalPrice);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured),
  ).slice(0, 4);

  const handleAddToCart = () => {
    requestAddToCart(
      product,
      quantity,
      () => navigate('/login', { state: { from: location.pathname } }),
      location.pathname,
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-6 flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" className="hover:text-[#221914]">Shop</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#ECE5DC] overflow-hidden shadow-xs">
          <div className="aspect-[4/3] bg-[#F5EFE6]">
            <SafeImage
              src={product.image}
              alt={`${product.name} luxury perfume bottle`}
              fallbackTitle={product.name}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C7E72] uppercase tracking-[0.12em]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.size}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#7B5633] font-semibold">{product.stockStatus}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-1 tabular-nums">
            <span className="text-2xl sm:text-3xl font-bold text-[#221914]">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-[#8C7E72] line-through">
                  {formatPKR(product.originalPrice)}
                </span>
                <span className="text-sm font-semibold text-[#7B5633]">
                  Save {discountPct}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#4A3E36] leading-relaxed">
            {product.description}
          </p>

          <div className="rounded-xl bg-white border border-[#ECE5DC] p-4 space-y-2 text-sm shadow-xs">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-[#221914]">Top Notes</span>
              <span className="text-[#6E6259] text-right">{product.notes.top}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#ECE5DC] pt-2">
              <span className="font-semibold text-[#221914]">Heart Notes</span>
              <span className="text-[#6E6259] text-right">{product.notes.heart}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#ECE5DC] pt-2">
              <span className="font-semibold text-[#221914]">Base Notes</span>
              <span className="text-[#6E6259] text-right">{product.notes.base}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center rounded-lg border border-[#DCD2C4] bg-white">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-[#221914] hover:bg-[#F5EFE6] rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span aria-label="Quantity" className="px-4 text-sm font-semibold text-[#221914] tabular-nums min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="p-3 text-[#221914] hover:bg-[#F5EFE6] rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-pressed={wishlisted}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#7B5633] text-[#7B5633]' : ''}`} />
              <span className="hidden sm:inline">{wishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>
          </div>

          <p className="pt-1 flex items-center gap-2 text-xs text-[#6E6259]">
            <Truck className="w-4 h-4 text-[#7B5633] shrink-0" aria-hidden="true" />
            <span>Complimentary delivery on orders above Rs. 5,000 · 7-day unopened returns</span>
          </p>
        </div>
      </div>

      <section className="mt-16 pt-12 border-t border-[#E5D9C8]">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#221914] mb-6">
          You May Also Like
        </h2>
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}