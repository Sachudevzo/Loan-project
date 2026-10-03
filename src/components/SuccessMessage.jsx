import { CheckCircle2 } from 'lucide-react';

// Banner used for form-level success messages (e.g. after registration).
export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-100 px-3.5 py-2.5 text-sm text-green-700">
      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
