import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  width,
  height,
  priority = false,
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
        className={`flex flex-col items-center justify-center bg-[#F5EFE6] text-[#5C3D20] p-4 text-center ${className}`}
      >
        <Sparkles className="w-7 h-7 mb-2 text-[#9E7538]" aria-hidden="true" />
        <span className="font-serif text-sm font-semibold tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}