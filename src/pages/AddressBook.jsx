import { useState } from 'react';
import { Check, MapPin, Plus, Trash2 } from 'lucide-react';
import { AccountLayout } from '../components/AccountLayout.jsx';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const EMPTY_ADDRESSES = [];

export function AddressBook() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [addresses, setAddresses] = useLocalStorage(
    STORAGE_KEYS.DEMO_ADDRESSES,
    EMPTY_ADDRESSES,
  );

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [error, setError] = useState('');

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      setError('Please complete all required address fields.');
      return;
    }
    setError('');
    const nextAddress = {
      id: `addr-${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      country: country.trim() || 'Pakistan',
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, nextAddress]);
    setAddressLine('');
    setCity('');
    setPostalCode('');
    showToast('Address saved locally.', 'success');
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated.', 'info');
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed.', 'info');
  };

  return (
    <AccountLayout
      title="Address Book"
      subtitle="Save shipping addresses locally for faster checkout."
    >
      <div className="space-y-6">
        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="rounded-xl bg-white border border-[#ECE5DC] p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 font-sans text-base font-semibold text-[#221914]">
                      <MapPin className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
                      <span>{addr.fullName}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="text-xs font-semibold text-[#7B5633]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#4A3E36]">{addr.addressLine}</p>
                  <p className="text-sm text-[#6E6259]">
                    {addr.city}, {addr.postalCode}, {addr.country}
                  </p>
                  <p className="text-xs text-[#6E6259] mt-1 tabular-nums">{addr.phone}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ECE5DC] flex items-center justify-between">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#7B5633] hover:underline"
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Set as Default</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[#8C7E72]">Used at checkout</span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    aria-label={`Delete address for ${addr.fullName}`}
                    className="p-1.5 rounded-lg text-[#8C7E72] hover:text-[#7B5633] hover:bg-[#F5EFE6]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Address Form */}
        <section className="rounded-2xl bg-white border border-[#ECE5DC] p-6 shadow-xs">
          <h2 className="font-serif text-xl font-semibold text-[#221914] mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
            <span>Add New Address</span>
          </h2>

          <form onSubmit={handleAddAddress} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="addr-name"
                  className="block text-sm font-medium text-[#221914] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="addr-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>

              <div>
                <label
                  htmlFor="addr-phone"
                  className="block text-sm font-medium text-[#221914] mb-1"
                >
                  Phone
                </label>
                <input
                  id="addr-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="addr-line"
                className="block text-sm font-medium text-[#221914] mb-1"
              >
                Address Line
              </label>
              <input
                id="addr-line"
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Street, block, apartment"
                className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="addr-city"
                  className="block text-sm font-medium text-[#221914] mb-1"
                >
                  City
                </label>
                <input
                  id="addr-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Karachi"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>
              <div>
                <label
                  htmlFor="addr-postal"
                  className="block text-sm font-medium text-[#221914] mb-1"
                >
                  Postal Code
                </label>
                <input
                  id="addr-postal"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="75600"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>
              <div>
                <label
                  htmlFor="addr-country"
                  className="block text-sm font-medium text-[#221914] mb-1"
                >
                  Country
                </label>
                <input
                  id="addr-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#9E2A2B]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
            >
              Save Address
            </button>
          </form>
        </section>
      </div>
    </AccountLayout>
  );
}
