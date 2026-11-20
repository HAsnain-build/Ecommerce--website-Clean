import { Star } from 'lucide-react';

export function StarRating({ rating = 0, reviewCount, size = 'sm' }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const rounded = Math.round(safeRating);

  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  const iconClass = sizeMap[size] || sizeMap.sm;

  return (
    <div
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={`Rated ${safeRating.toFixed(1)} out of 5${
        typeof reviewCount === 'number' ? `, ${reviewCount} reviews` : ''
      }`}
    >
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < rounded;
          return (
            <Star
              key={i}
              aria-hidden="true"
              strokeWidth={1.5}
              className={`${iconClass} ${
                filled
                  ? 'fill-[#C69846] text-[#C69846]'
                  : 'fill-none text-[#D8CCB8]'
              }`}
            />
          );
        })}
      </span>

      {typeof reviewCount === 'number' && (
        <span className="text-xs text-[#8C7E72] tabular-nums">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}