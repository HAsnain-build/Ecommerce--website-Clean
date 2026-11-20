import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPKR } from '../utils/storeLogic.js';

export function Wishlist() {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { requestAddToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-[#7A685A] mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#221914]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#221914] font-medium">Wishlist</span>
      </nav>

      <div className="pb-6 border-b border-[#ECE5DC] flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914]">
            Your Wishlist
          </h1>
          <p className="text-sm text-[#6E6259] mt-1">
            Saved fragrances stay ready in your browser whenever you return.
          </p>
        </div>
        <span className="text-sm font-medium text-[#7B5633] tabular-nums">
          {wishlistProducts.length} saved
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<Heart className="w-6 h-6" />}
            title="Your wishlist is empty"
            description="Tap the heart icon on any fragrance card to save your favorite perfumes here."
            actionLabel="Explore Collection"
            actionTo="/shop"
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col rounded-xl bg-white border border-[#ECE5DC] overflow-hidden shadow-xs"
            >
              <Link
                to={`/product/${product.slug}`}
                className="aspect-[4/3] bg-[#F5EFE6] overflow-hidden"
              >
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wider text-[#8C7E72]">
                  {product.category}
                </p>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-sans text-base font-semibold text-[#221914] hover:text-[#7B5633] mt-0.5"
                >
                  {product.name}
                </Link>
                <p className="text-sm font-bold text-[#221914] mt-1.5 tabular-nums">
                  {formatPKR(product.price)}
                </p>

                <div className="mt-4 pt-3 border-t border-[#ECE5DC] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      requestAddToCart(
                        product,
                        1,
                        () => navigate('/login', { state: { from: location.pathname } }),
                        location.pathname,
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-xs font-medium transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="p-2 rounded-lg border border-[#DCD2C4] text-[#6E6259] hover:text-[#7B5633] hover:bg-[#F5EFE6]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
