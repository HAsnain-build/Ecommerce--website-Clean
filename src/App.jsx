import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer.jsx';
import { Footer } from './components/Footer.jsx';
import { Navbar } from './components/Navbar.jsx';
import { PortfolioNotice } from './components/PortfolioNotice.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { SearchOverlay } from './components/SearchOverlay.jsx';
import { ToastContainer } from './components/ToastContainer.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

const Home = lazy(() => import('./pages/Home.jsx').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About.jsx').then(m => ({ default: m.About })));
const Account = lazy(() => import('./pages/Account.jsx').then(m => ({ default: m.Account })));
const AddressBook = lazy(() => import('./pages/AddressBook.jsx').then(m => ({ default: m.AddressBook })));
const Cart = lazy(() => import('./pages/Cart.jsx').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout.jsx').then(m => ({ default: m.Checkout })));
const Collection = lazy(() => import('./pages/Collection.jsx').then(m => ({ default: m.Collection })));
const Contact = lazy(() => import('./pages/Contact.jsx').then(m => ({ default: m.Contact })));
const Discount = lazy(() => import('./pages/Discount.jsx').then(m => ({ default: m.Discount })));
const Login = lazy(() => import('./pages/Login.jsx').then(m => ({ default: m.Login })));
const NotFound = lazy(() => import('./pages/NotFound.jsx').then(m => ({ default: m.NotFound })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation.jsx').then(m => ({ default: m.OrderConfirmation })));
const Orders = lazy(() => import('./pages/Orders.jsx').then(m => ({ default: m.Orders })));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx').then(m => ({ default: m.ProductDetails })));
const Register = lazy(() => import('./pages/Register.jsx').then(m => ({ default: m.Register })));
const Search = lazy(() => import('./pages/Search.jsx').then(m => ({ default: m.Search })));
const Shop = lazy(() => import('./pages/Shop.jsx').then(m => ({ default: m.Shop })));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx').then(m => ({ default: m.Wishlist })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[#6E6259]/30 border-t-[#221914] rounded-full animate-spin" />
    </div>
  );
}

function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDrawerOpen, openDrawer, closeDrawer } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF9] text-[#221914]">
      <ScrollToTop />
      <PortfolioNotice />
      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenCartDrawer={openDrawer} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/account/addresses" element={<ProtectedRoute><AddressBook /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <AppShell />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}