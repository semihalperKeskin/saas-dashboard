import { useEffect, useRef } from "react";
import {
  DocumentPlusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { TicketIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  inputState?: string;
  setInputState?: (value: string) => void;
  actionButtonLabel: string;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  inputState,
  setInputState,
  actionButtonLabel,
}: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputState?.trim()) return;
    onSubmit?.();
    setInputState?.("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <DocumentPlusIcon className="h-6 w-6" />
            </div>
            <div>
              <p id="modal-title" className="font-medium text-slate-900">
                {actionButtonLabel === "Column"
                  ? "Enter New Column Name"
                  : "Enter New Task Name"}
              </p>
              <span className="text-sm text-slate-500">
                Give your new {actionButtonLabel.toLowerCase()} a name
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="item-name" className="text-sm text-slate-600">
              Item Name<span className="ml-0.5 font-bold text-red-500">*</span>
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <input
                ref={inputRef}
                id="item-name"
                type="text"
                value={inputState ?? ""}
                name="name"
                onChange={(e) => setInputState?.(e.target.value)}
                placeholder="e.g. In Progress..."
                className="w-full border-0 bg-transparent p-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                required
              />
              <TicketIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <hr className="border-slate-200" />
            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!inputState?.trim()}
                className="flex items-center gap-1 rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/30 transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                <PlusIcon className="h-4 w-4" />
                Add {actionButtonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
