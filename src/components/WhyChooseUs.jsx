import { Gem, Headphones, Leaf, Plane } from 'lucide-react';
import { SectionHeading } from './SectionHeading.jsx';

const TRUST_PILLARS = [
  {
    icon: Gem,
    title: 'Curated Quality',
    subtitle: 'Artisan Scent Blends',
  },
  {
    icon: Leaf,
    title: 'Long-Lasting',
    subtitle: 'Rich Concentration',
  },
  {
    icon: Plane,
    title: 'Fast Dispatch',
    subtitle: 'Nationwide Delivery',
  },
  {
    icon: Headphones,
    title: 'Dedicated',
    subtitle: 'Customer Care',
  },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading
        kicker="WHY CHOOSE US"
        title="Your Trusted Perfume Store"
        subtitle="Thoughtfully crafted fragrance profiles with a refined browsing and seamless checkout experience"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="flex items-center gap-4 rounded-xl bg-white border border-[#ECE5DC] p-4 sm:p-5"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5EFE6] border border-[#EAE0D2] flex items-center justify-center text-[#7B5633] shrink-0">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-sans text-sm sm:text-base font-semibold text-[#221914]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6259]">{pillar.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
