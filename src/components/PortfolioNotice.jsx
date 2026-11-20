export function PortfolioNotice() {
  return (
    <div
      role="note"
      className="bg-[#F3EAE0] text-[#4E3824] border-b border-[#E3D6C6] py-2 px-4 text-center"
    >
      <p className="text-xs sm:text-sm font-medium tracking-wide">
        <span className="font-semibold text-[#7B5633]">
          Portfolio Showcase Storefront
        </span>
        <span className="hidden sm:inline text-[#6E5C4E] font-normal">
          {' '}
          · Sample boutique preview with local order storage (no real payments)
        </span>
      </p>
    </div>
  );
}
