import { useState } from 'react';
import { Mail } from 'lucide-react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useToast } from '../context/ToastContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { validateEmail } from '../utils/storeLogic.js';

const EMPTY_SUBS = [];

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState('');
  const [subscriptions, setSubscriptions] = useLocalStorage(
    STORAGE_KEYS.NEWSLETTER,
    EMPTY_SUBS,
  );
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!validateEmail(trimmed)) {
      setError('Please enter a valid email address.');
      setSubscribedMessage('');
      return;
    }

    setError('');
    const alreadyExists = subscriptions.some((s) => s.email === trimmed);
    if (!alreadyExists) {
      setSubscriptions((prev) => [
        ...prev,
        { email: trimmed, subscribedAt: new Date().toISOString() },
      ]);
    }
    setEmail('');
    setSubscribedMessage('Subscription saved locally in your browser.');
    showToast('Subscribed to Aura updates!', 'success');
  };

  return (
    <section
      aria-label="Newsletter subscription"
      className="bg-[#F5EFE6] border-t border-b border-[#E4D8C8] py-10 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="hidden sm:flex w-12 h-12 rounded-xl border border-[#DFD3C3] bg-white items-center justify-center text-[#7B5633] shrink-0 shadow-xs">
            <Mail className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#221914]">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-sm text-[#6E6259] mt-0.5">
              Receive seasonal fragrance arrivals and private collection offers.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[440px]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white border border-[#DCD2C4] p-1.5 rounded-xl shadow-xs"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your email address"
              className="flex-1 px-3.5 py-2.5 text-sm text-[#221914] placeholder:text-[#8E7C6D] bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#624224] text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-2 text-xs text-[#9E2A2B]">
              {error}
            </p>
          )}
          {subscribedMessage && (
            <p role="status" className="mt-2 text-xs font-medium text-[#7B5633]">
              {subscribedMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
