import { AlertCircle } from 'lucide-react';

// Banner used for form-level errors (e.g. "Invalid email/mobile or password")
// as opposed to per-field errors, which render under each Input.
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-sm text-red-700">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
