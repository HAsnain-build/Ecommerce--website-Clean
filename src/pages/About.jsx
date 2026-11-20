import { Link } from 'react-router-dom';
import { Award, Droplets, HeartHandshake, Sparkles } from 'lucide-react';
import { SafeImage } from '../components/SafeImage.jsx';
import { SIGNATURE_BANNER_IMAGE } from '../data/products.js';

const VALUES = [
  {
    icon: Droplets,
    title: 'Layered Notes',
    description:
      'Every fragrance profile balances bright top accords, rich floral or spiced hearts, and grounded woody bases.',
  },
  {
    icon: Sparkles,
    title: 'Refined Presentation',
    description:
      'Designed around warm ivory surfaces, bronze craftsmanship, and serene editorial typography.',
  },
  {
    icon: Award,
    title: 'Honest Showcase',
    description:
      'Presented transparently as a frontend portfolio boutique with browser-local cart, wishlist, and order persistence.',
  },
  {
    icon: HeartHandshake,
    title: 'Accessible Craft',
    description:
      'Built for responsive comfort across mobile, tablet, and desktop screens without clutter.',
  },
];

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      {/* Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538]">
            Our Story
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#221914] leading-tight text-balance">
            Crafting Quiet Luxury in Every Bottle
          </h1>
          <p className="text-sm sm:text-base text-[#4A3B31] leading-relaxed">
            Aura Luxury Perfume is a curated fragrance house celebrating botanical perfumery, sculptural glass flacons, and warm digital hospitality.
          </p>
          <p className="text-sm text-[#6E6259] leading-relaxed">
            Sixteen signature blends span smoky agarwood, velvety damask rose, nocturnal jasmine, and coastal citrus for effortless everyday and evening elegance.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/collection"
              className="px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg border border-[#DCD2C4] hover:bg-[#F5EFE6] text-[#221914] text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-[#3E2E23] border border-[#ECE5DC]">
          <SafeImage
            src={SIGNATURE_BANNER_IMAGE}
            alt="Aura Luxury Perfume signature bottle collection"
            className="w-full h-full aspect-[16/10] object-cover"
          />
        </div>
      </section>

      {/* Mission & Values */}
      <section>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538]">
            Mission &amp; Values
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#221914] mt-1">
            Our Fragrance Selection Philosophy
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-xl bg-white border border-[#ECE5DC] p-6 space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[#221914]">
                  {val.title}
                </h3>
                <p className="text-sm text-[#6E6259] leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Policies */}
      <section
        id="policies"
        className="rounded-2xl bg-[#F5EFE6] border border-[#E4D8C8] p-6 sm:p-8 space-y-4"
      >
        <h2 className="font-serif text-2xl font-semibold text-[#221914]">
          Store Policies &amp; Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4A3E36]">
          <div>
            <h3 className="font-semibold text-[#221914] mb-1">Delivery Rules</h3>
            <p className="text-[#5C4C40]">
              Standard delivery is complimentary for orders over Rs. 5,000, and Rs. 350 below that threshold.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#221914] mb-1">Returns &amp; Care</h3>
            <p className="text-[#5C4C40]">
              Unopened bottles qualify for easy 7-day returns. Store flacons away from direct sunlight.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#221914] mb-1">Local Persistence</h3>
            <p className="text-[#5C4C40]">
              All cart, wishlist, and order entries in this storefront persist cleanly inside browser localStorage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
