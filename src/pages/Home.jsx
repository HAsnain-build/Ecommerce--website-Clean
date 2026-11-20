import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BenefitsStrip } from '../components/BenefitsStrip.jsx';
import { Newsletter } from '../components/Newsletter.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { SafeImage } from '../components/SafeImage.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { WhyChooseUs } from '../components/WhyChooseUs.jsx';
import {
  HERO_SLIDES,
  PRODUCTS,
  SIGNATURE_BANNER_IMAGE,
} from '../data/products.js';

export function Home() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[activeSlideIndex];

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const discountedPreview = PRODUCTS.filter((p) => p.isDiscounted).slice(0, 3);

  return (
    <div>
      {/* Hero Banner */}
      <section aria-label="Featured showcase" className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="rounded-2xl overflow-hidden bg-[#3E2E23] grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[350px] md:min-h-[395px] shadow-sm">
          {/* Left Text Column */}
          <div className="md:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-9 md:py-11 z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#E6C57E]" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#E6C57E]">
                {currentSlide.kicker}
              </span>
              <span className="h-px w-6 bg-[#E6C57E]" aria-hidden="true" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#FCFBF9] leading-[1.06] text-balance">
              {currentSlide.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#EDE2D4] leading-relaxed max-w-md">
              {currentSlide.subtitle}
            </p>

            <div className="mt-7 flex items-center gap-4">
              <Link
                to={currentSlide.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E6C57E] hover:bg-[#D8B262] text-[#221914] text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <span>{currentSlide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Interactive Slider Dots */}
            <div
              role="tablist"
              aria-label="Hero showcase slides"
              className="mt-8 flex items-center gap-2.5"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#E6C57E] ${
                      isActive
                        ? 'w-6 bg-[#E6C57E]'
                        : 'w-2.5 border border-[#DFD2C3]/75 bg-transparent hover:bg-[#E6C57E]/50'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Dedicated Visual Column — HERO: priority (eager) */}
          <div className="md:col-span-6 relative min-h-[240px] md:min-h-full overflow-hidden">
            <SafeImage
              src={currentSlide.image}
              alt={currentSlide.title}
              width={800}
              height={800}
              priority
              className="w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#3E2E23] to-transparent"
            />
            <div
              aria-hidden="true"
              className="md:hidden absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#3E2E23] to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <BenefitsStrip />

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionHeading
          kicker="OUR PREMIUM FRAGRANCES"
          title="Featured Collection"
          subtitle="Elegance in Every Bottle"
        />
        <div className="mt-9">
          <ProductGrid products={featuredProducts} />
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/shop?group=featured"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#7B5633] text-[#7B5633] hover:bg-[#7B5633] hover:text-white text-sm font-medium transition-colors"
          >
            <span>View Featured Scents</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Best Sellers / New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <SectionHeading
          kicker="CURATED FAVORITES"
          title="Best Sellers & New Arrivals"
          subtitle="Signature blends loved across everyday and evening occasions"
        />
        <div className="mt-9">
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Signature Perfumes Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="rounded-2xl overflow-hidden bg-[#3E2E23] grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[270px] shadow-sm">
          <div className="md:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 z-10">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E6C57E] mb-2">
              PERFUME FOR EVERY MOOD
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FCFBF9] leading-tight text-balance">
              Our Signature Perfumes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EDE2D4]">
              Luxury, Style &amp; Long-Lasting Fragrance
            </p>
            <Link
              to="/collection"
              className="mt-6 self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E6C57E] hover:bg-[#D8B262] text-[#221914] text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="md:col-span-7 relative min-h-[220px] md:min-h-full overflow-hidden">
            <SafeImage
              src={SIGNATURE_BANNER_IMAGE}
              alt="Four Aura signature perfume bottles on marble pedestal"
              width={800}
              height={600}
              className="w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#3E2E23] to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Discount Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <SectionHeading
            align="left"
            kicker="SEASONAL SAVINGS"
            title="Discounted Collection"
            subtitle="Explore curated offers across Men, Women, and Unisex fragrances"
          />
          <Link
            to="/discount"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#5E3F23] text-white text-sm font-medium transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discountedPreview.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-xl bg-white border border-[#ECE5DC] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${item.slug}`} className="aspect-[4/3] bg-[#F5EFE6] overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8C7E72]">
                    {item.category} · {item.size}
                  </p>
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-sans text-lg font-semibold text-[#221914] hover:text-[#7B5633] mt-1 block"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-base font-bold text-[#221914]">
                      Rs. {item.price.toLocaleString('en-PK')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-[#8C7E72] line-through">
                        Rs. {item.originalPrice.toLocaleString('en-PK')}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/product/${item.slug}`}
                    className="text-sm font-medium text-[#7B5633] hover:underline whitespace-nowrap"
                  >
                    View Offer
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}