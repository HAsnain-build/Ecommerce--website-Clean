import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.variant === 'error'
            ? AlertCircle
            : toast.variant === 'info'
              ? Info
              : CheckCircle2;

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-xl bg-white text-[#221914] border border-[#D8C8B4] px-4 py-3 shadow-lg"
          >
            <Icon className="w-4 h-4 text-[#7B5633] shrink-0" aria-hidden="true" />
            <p className="text-sm flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 text-[#8C7E72] hover:text-[#221914]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
