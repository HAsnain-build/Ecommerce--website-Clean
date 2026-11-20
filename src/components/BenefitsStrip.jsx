import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    subtitle: 'Orders Rs. 5,000+',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    subtitle: 'Safe Order Flow',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Dedicated Care',
  },
  {
    icon: RotateCcw,
    title: 'Easy Return',
    subtitle: '7 Days Return Policy',
  },
];

export function BenefitsStrip() {
  return (
    <section aria-label="Service benefits" className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
      <div className="rounded-xl bg-white border border-[#ECE5DC] px-4 py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-0 md:divide-x md:divide-[#EAE3DA]">
        {BENEFITS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-center justify-start md:justify-center gap-3.5 px-2 md:px-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#7B5633] shrink-0">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-sans text-sm font-semibold text-[#221914] whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6E6259]">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
