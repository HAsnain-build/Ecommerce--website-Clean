import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPKR, getDiscountPercentage } from '../utils/storeLogic.js';
import { SafeImage } from './SafeImage.jsx';

export function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { requestAddToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const wishlisted = isWishlisted(product.id);
  const discountPct = getDiscountPercentage(product.price, product.originalPrice);

  const handleAddToCart = () => {
    requestAddToCart(
      product,
      1,
      () => navigate('/login', { state: { from: location.pathname + location.search } }),
      location.pathname,
    );
  };

  return (
    <article className="group relative flex flex-col rounded-xl bg-white border border-[#ECE5DC] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image Frame */}
      <div className="relative aspect-[4/3] bg-[#F5EFE6] overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full focus-visible:outline-2 focus-visible:outline-[#7B5633]"
          aria-label={`View ${product.name} details`}
        >
          <SafeImage
            src={product.image}
            alt={`${product.name} perfume bottle`}
            fallbackTitle={product.name}
            width={600}
            height={450}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </Link>

        {discountPct > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 border border-[#E4D9CB] text-[#7B5633] text-[11px] font-semibold tracking-wide tabular-nums shadow-xs">
            Save {discountPct}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-[#221914] shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#7B5633]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#7B5633] text-[#7B5633]' : 'text-[#221914]'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col items-center text-center px-4 pt-4 pb-4 flex-1 bg-white">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#8C7E72] mb-1">
          {product.category}
        </p>

        <Link
          to={`/product/${product.slug}`}
          className="font-sans text-base font-semibold text-[#221914] hover:text-[#7B5633] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price — always black (espresso-dark) */}
        <div className="flex items-baseline justify-center gap-2 mt-2 mb-3.5 tabular-nums">
          <span className="text-[15px] font-bold text-[#221914]">
            {formatPKR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#8C7E72] line-through">
              {formatPKR(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] active:scale-[0.99] text-white text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#221914]"
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}