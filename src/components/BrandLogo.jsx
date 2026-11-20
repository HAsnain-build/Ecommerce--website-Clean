export function BrandLogo({ variant = 'dark' }) {
  const titleColor = variant === 'light' ? 'text-[#FCFBF9]' : 'text-[#221914]';
  const subColor = variant === 'light' ? 'text-[#E2BE74]' : 'text-[#7B5633]';

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 4L26 26H22.2L19.9 20.8H12.1L9.8 26H6L16 4ZM16 10.6L13.5 17.2H18.5L16 10.6Z"
          fill={variant === 'light' ? '#E2BE74' : '#221914'}
        />
        <rect x="9" y="28" width="14" height="1.5" rx="0.75" fill="#C69846" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-xl sm:text-2xl font-semibold tracking-[0.2em] ${titleColor}`}
        >
          AURA
        </span>
        <span
          className={`text-[8.5px] font-medium tracking-[0.24em] uppercase mt-0.5 ${subColor}`}
        >
          LUXURY PERFUME
        </span>
      </span>
    </span>
  );
}
