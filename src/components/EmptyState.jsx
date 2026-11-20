import { Link } from 'react-router-dom';

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="rounded-2xl bg-white border border-[#ECE5DC] px-6 py-12 text-center max-w-xl mx-auto shadow-xs">
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#7B5633] flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}
      <h2 className="font-serif text-2xl font-semibold text-[#221914]">{title}</h2>
      <p className="text-sm text-[#6E6259] mt-2 leading-relaxed">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center mt-6 px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#624224] text-white text-sm font-medium transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center mt-6 px-6 py-2.5 rounded-lg bg-[#7B5633] hover:bg-[#624224] text-white text-sm font-medium transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
