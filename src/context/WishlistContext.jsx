import { createContext, useCallback, useContext, useMemo } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { PRODUCTS } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useToast } from './ToastContext.jsx';

const WishlistContext = createContext(undefined);

const EMPTY_IDS = [];

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useLocalStorage(
    STORAGE_KEYS.WISHLIST,
    EMPTY_IDS,
  );
  const { showToast } = useToast();

  const isWishlisted = useCallback(
    (productId) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (product) => {
      const exists = wishlistIds.includes(product.id);
      if (exists) {
        setWishlistIds((prev) => prev.filter((id) => id !== product.id));
        showToast(`${product.name} removed from wishlist.`, 'info');
      } else {
        setWishlistIds((prev) => [...prev, product.id]);
        showToast(`${product.name} saved to wishlist.`, 'success');
      }
    },
    [wishlistIds, setWishlistIds, showToast],
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, [setWishlistIds]);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds],
  );

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistProducts,
      wishlistCount: wishlistProducts.length,
      isWishlisted,
      toggleWishlist,
      clearWishlist,
    }),
    [wishlistIds, wishlistProducts, isWishlisted, toggleWishlist, clearWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
