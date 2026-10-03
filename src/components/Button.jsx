import LoadingSpinner from './LoadingSpinner';

// Reusable button. Pass `loading` to show a spinner + disable clicks,
// which every submit button in the app will need.
export default function Button({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  const base =
    'w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary:
      'bg-white text-navy-900 border border-gray-200 hover:bg-gray-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && <LoadingSpinner size={16} />}
      {children}
    </button>
  );
}
