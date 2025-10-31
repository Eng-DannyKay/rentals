
import { Check, X } from "lucide-react";

interface ApplicationCompletionProps {
  applicationId?: string;
  bankName?: string;
  open: boolean;
  onClose: () => void;
}

export default function ApplicationComplete({ applicationId, bankName, open, onClose }: ApplicationCompletionProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,41,46,0.7)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-complete-title"
    >
      <div className="bg-white rounded-lg w-full max-w-md p-8 shadow-lg relative" style={{ minWidth: 400 }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center">
            <Check size={56} className="text-white" strokeWidth={2} />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2
            id="application-complete-title"
            className="text-xl font-semibold text-gray-900"
          >
            Application #{applicationId ?? '003'} Submitted Successfully to {bankName ?? 'GCB Bank'}!
          </h2>
        </div>
      </div>
    </div>
  );
}