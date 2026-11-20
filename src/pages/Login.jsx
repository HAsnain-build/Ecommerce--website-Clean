import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { validateEmail } from '../utils/storeLogic.js';

export function Login() {
  const { login } = useAuth();
  const { getPendingProductInfo, consumePendingProduct } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});

  const pendingInfo = useMemo(() => getPendingProductInfo(), [getPendingProductInfo]);
  const pendingProduct = useMemo(
    () => (pendingInfo ? PRODUCTS.find((p) => p.id === pendingInfo.productId) : null),
    [pendingInfo],
  );

  const fromPath = location.state?.from || '/account';

  const handleFillDemo = () => {
    setEmail('demo@auraperfume.com');
    setPassword('aurademo123');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!validateEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    login(email, remember);
    const addedPending = consumePendingProduct();

    if (addedPending) {
      navigate('/checkout', { replace: true });
    } else {
      showToast('Signed in to your account.', 'success');
      navigate(fromPath === '/login' ? '/account' : fromPath, { replace: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-md mx-auto rounded-2xl bg-white border border-[#ECE5DC] p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#221914]">
            Sign In
          </h1>
          <p className="text-sm text-[#6E6259] mt-1">
            Sign in to continue to your order details and checkout.
          </p>
        </div>

        {/* Browser-local Disclaimer */}
        <div className="rounded-xl bg-[#FCFBF9] border border-[#EAE3DA] p-3.5 text-xs text-[#5C3D20] flex items-start gap-2.5 mb-5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#7B5633]" aria-hidden="true" />
          <div>
            <p className="font-semibold">Browser-Local Session</p>
            <p className="mt-0.5 leading-relaxed">
              Do not enter real personal passwords. Enter any sample email and 6+ character password, or click Fill Sample User.
            </p>
          </div>
        </div>

        {/* Pending Cart Notification */}
        {pendingProduct && (
          <div className="rounded-xl bg-[#F5EFE6] border border-[#E2D4C0] text-[#221914] p-3.5 text-xs mb-5">
            Sign in to proceed to checkout with{' '}
            <strong className="text-[#7B5633]">{pendingProduct.name}</strong>.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6259] hover:text-[#221914]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="inline-flex items-center gap-2 text-xs text-[#4A3B31] cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-[#DCD2C4] accent-[#7B5633]"
              />
              <span>Keep me signed in</span>
            </label>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-semibold text-[#7B5633] hover:underline"
            >
              Fill Sample User
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6E6259]">
          New visitor?{' '}
          <Link to="/register" className="font-semibold text-[#7B5633] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
