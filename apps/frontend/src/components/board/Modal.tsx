import { XMarkIcon } from "@heroicons/react/16/solid";

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
  const handleSubmit = () => {
    if (setInputState) {
      setInputState("");
    }

    if (onSubmit) {
      onSubmit();
    }
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-4">
              <button
                onClick={onClose}
                className="absolute right-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
            <div>Enter New Item Name</div>
            <input
              type="text"
              value={inputState}
              name="name"
              onChange={(e) => setInputState && setInputState(e.target.value)}
              placeholder="Enter new item name..."
              className="w-full border border-gray-300 rounded-md p-2 mt-4"
            />

            <button
              onClick={handleSubmit}
              className="cursor-pointer flex items-center rounded-md p-2 text-sm bg-blue-100 hover:bg-blue-300 text-blue-800 mt-3"
            >
              Add {actionButtonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
