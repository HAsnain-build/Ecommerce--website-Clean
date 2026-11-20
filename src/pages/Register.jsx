import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { validateRegisterInput } from '../utils/storeLogic.js';

export function Register() {
  const { registerDemoUser } = useAuth();
  const { consumePendingProduct } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateRegisterInput({
      fullName,
      email,
      password,
      confirmPassword,
      acceptedTerms,
    });

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    registerDemoUser({ fullName, email });
    const addedPending = consumePendingProduct();
    if (addedPending) {
      navigate('/checkout', { replace: true });
    } else {
      showToast('Account created in browser storage.', 'success');
      navigate('/account', { replace: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-md mx-auto rounded-2xl bg-white border border-[#ECE5DC] p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#221914]">
            Create Account
          </h1>
          <p className="text-sm text-[#6E6259] mt-1">
            Register a local storefront profile in this browser.
          </p>
        </div>

        <div className="rounded-xl bg-[#FCFBF9] border border-[#EAE3DA] p-3.5 text-xs text-[#5C3D20] flex items-start gap-2.5 mb-5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#7B5633]" aria-hidden="true" />
          <p className="leading-relaxed">
            No real server account is created. Please use a sample password rather than a real personal password.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="reg-name"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((p) => ({ ...p, fullName: '' }));
              }}
              placeholder="Ayesha Khan"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            />
            {errors.fullName && (
              <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: '' }));
              }}
              placeholder="ayesha@example.com"
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
              htmlFor="reg-password"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                }}
                placeholder="Minimum 6 characters"
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

          <div>
            <label
              htmlFor="reg-confirm"
              className="block text-sm font-medium text-[#221914] mb-1.5"
            >
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((p) => ({ ...p, confirmPassword: '' }));
              }}
              placeholder="Re-enter password"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
            />
            {errors.confirmPassword && (
              <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="inline-flex items-start gap-2.5 text-xs text-[#4A3B31] cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (errors.acceptedTerms)
                    setErrors((p) => ({ ...p, acceptedTerms: '' }));
                }}
                className="mt-0.5 rounded border-[#DCD2C4] accent-[#7B5633]"
              />
              <span>
                I understand this is a portfolio showcase storefront with browser-local persistence.
              </span>
            </label>
            {errors.acceptedTerms && (
              <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                {errors.acceptedTerms}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6E6259]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#7B5633] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
