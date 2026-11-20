export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
}) {
  const isCentered = align === 'center';

  return (
    <div className={isCentered ? 'text-center max-w-2xl mx-auto' : 'text-left'}>
      {kicker && (
        <div
          className={`flex items-center gap-3 mb-2 ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
        >
          <span className="h-px w-8 bg-[#C89B4B]/70" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9E7538]">
            {kicker}
          </span>
          <span className="h-px w-8 bg-[#C89B4B]/70" aria-hidden="true" />
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#221914] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#6E6259] mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
