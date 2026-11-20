import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { PRODUCTS } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { calculateCartTotals, safeParseJSON } from '../utils/storeLogic.js';
import { useAuth } from './AuthContext.jsx';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(undefined);

const EMPTY_CART = [];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage(
    STORAGE_KEYS.CART,
    EMPTY_CART,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addToCart = useCallback(
    (product, quantity = 1, shouldOpenDrawer = true) => {
      const safeQty = Math.max(1, Math.floor(quantity));
      setCartItems((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + safeQty }
              : item,
          );
        }
        return [...prev, { productId: product.id, quantity: safeQty }];
      });
      if (shouldOpenDrawer) {
        setIsDrawerOpen(true);
      }
    },
    [setCartItems],
  );

  const getPendingProductInfo = useCallback(() => {
    if (typeof window === 'undefined') return null;
    return safeParseJSON(
      window.localStorage.getItem(STORAGE_KEYS.PENDING_CART_PRODUCT),
      null,
    );
  }, []);

  const clearPendingProduct = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(STORAGE_KEYS.PENDING_CART_PRODUCT);
    } catch {
      // Ignore
    }
  }, []);

  const requestAddToCart = useCallback(
    (product, quantity = 1, onRequireLogin, returnPath) => {
      if (isAuthenticated) {
        addToCart(product, quantity, true);
        return true;
      }
      const pending = {
        productId: product.id,
        quantity: Math.max(1, Math.floor(quantity)),
        returnPath,
      };
      try {
        window.localStorage.setItem(
          STORAGE_KEYS.PENDING_CART_PRODUCT,
          JSON.stringify(pending),
        );
      } catch {
        // Ignore
      }
      showToast('Please sign in first to continue to your order.', 'info');
      onRequireLogin();
      return false;
    },
    [isAuthenticated, addToCart, showToast],
  );

  const consumePendingProduct = useCallback(() => {
    const pending = getPendingProductInfo();
    if (!pending) return null;
    const product = PRODUCTS.find((p) => p.id === pending.productId);
    clearPendingProduct();
    if (!product) return null;
    addToCart(product, pending.quantity, false);
    return product;
  }, [getPendingProductInfo, clearPendingProduct, addToCart]);

  const removeFromCart = useCallback(
    (productId) => {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    },
    [setCartItems],
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [setCartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const resolvedItems = useMemo(() => {
    const list = [];
    for (const item of cartItems) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (product && item.quantity > 0) {
        list.push({
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        });
      }
    }
    return list;
  }, [cartItems]);

  const totals = useMemo(
    () => calculateCartTotals(cartItems, PRODUCTS, 'standard'),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      resolvedItems,
      cartCount: totals.itemCount,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      freeShippingRemaining: totals.freeShippingRemaining,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addToCart,
      requestAddToCart,
      consumePendingProduct,
      getPendingProductInfo,
      clearPendingProduct,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      cartItems,
      resolvedItems,
      totals,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addToCart,
      requestAddToCart,
      consumePendingProduct,
      getPendingProductInfo,
      clearPendingProduct,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
