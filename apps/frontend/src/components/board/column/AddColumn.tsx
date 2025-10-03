import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Modal from "../Modal";
import { addColumn } from "~/features/boardSlice";
import { useAppDispatch } from "~/app/hooks";

function AddColumn() {
  const [isOpen, setIsOpen] = useState(false);

  const [inputState, setInputState] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddColumn = async () => {
    if (inputState.trim() === "") return;

    dispatch(addColumn({ title: inputState }));

    try {
      const res = await fetch("/api/column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputState }),
      });

      if (!res.ok) throw new Error("API error");

      setInputState("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        <PlusIcon className="h-5 w-5 inline-block mr-2" />
        Add Column
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddColumn}
        inputState={inputState}
        setInputState={setInputState}
        actionButtonLabel="Column"
      />
    </div>
  );
}

export default AddColumn;
