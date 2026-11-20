import { useState } from 'react';
import { CheckCircle2, Info, Mail, MapPin, Phone } from 'lucide-react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { useToast } from '../context/ToastContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { validateContactInput } from '../utils/storeLogic.js';

const EMPTY_MESSAGES = [];

export function Contact() {
  const { showToast } = useToast();
  const [, setMessages] = useLocalStorage(
    STORAGE_KEYS.CONTACT_MESSAGES,
    EMPTY_MESSAGES,
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedNotice, setSubmittedNotice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContactInput({ name, email, subject, message });

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSubmittedNotice('');
      return;
    }

    setErrors({});
    const entry = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [entry, ...prev]);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmittedNotice('Message received successfully.');
    showToast('Your message has been saved.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="pb-6 border-b border-[#ECE5DC]">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538]">
          Get In Touch
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] mt-1">
          Contact Us
        </h1>
        <p className="text-sm text-[#6E6259] mt-1">
          Questions about a fragrance or order? Reach out using the form below.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Light Warm Sand Contact Information Panel Matching Navbar Palette */}
        <aside className="lg:col-span-5 rounded-2xl bg-[#F5EFE6] border border-[#E4D8C8] text-[#221914] p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#221914]">
              Contact Information
            </h2>
            <p className="text-sm text-[#6E6259] mt-2 leading-relaxed">
              Our fragrance concierge team is happy to assist with scent recommendations and order inquiries.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E4D8C8] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#221914]">Phone</p>
                <p className="text-[#5C4C40] tabular-nums">+92 300 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E4D8C8] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#221914]">Email</p>
                <p className="text-[#5C4C40]">info@auraperfume.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E4D8C8] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#7B5633]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#221914]">Boutique Location</p>
                <p className="text-[#5C4C40]">Clifton Block 4, Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-[#E4D8C8] p-4 text-xs text-[#6E6259] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#7B5633] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Inquiries submitted here are saved locally in your browser&apos;s storage for portfolio preview.
            </span>
          </div>
        </aside>

        {/* Contact Form */}
        <section className="lg:col-span-7 rounded-2xl bg-white border border-[#ECE5DC] p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-2xl font-semibold text-[#221914] mb-5">
            Send a Message
          </h2>

          {submittedNotice && (
            <div
              role="status"
              className="mb-5 rounded-xl bg-[#F5EFE6] border border-[#E2D4C0] text-[#221914] p-4 flex items-center gap-3 text-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-[#7B5633] shrink-0" aria-hidden="true" />
              <span>
                <strong>{submittedNotice}</strong> Saved locally in browser storage.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                  }}
                  placeholder="Bilal Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[#221914] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                  }}
                  placeholder="bilal@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors((p) => ({ ...p, subject: '' }));
                }}
                placeholder="Fragrance inquiry"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
              {errors.subject && (
                <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-[#221914] mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((p) => ({ ...p, message: '' }));
                }}
                placeholder="Write your message here (at least 10 characters)..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF9] border border-[#DCD2C4] text-sm text-[#221914] focus:outline-none focus:border-[#7B5633]"
              />
              {errors.message && (
                <p role="alert" className="mt-1 text-xs text-[#9E2A2B]">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
