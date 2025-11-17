import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Modal from "../Modal";
import { addColumn } from "~/features/boardSlice";
import { useAppDispatch } from "~/app/hooks";
import apiClient from "~/api/client";

function AddColumn() {
  const [isOpen, setIsOpen] = useState(false);

  const [inputState, setInputState] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddColumn = async () => {
    if (inputState.trim() === "") return;

    dispatch(addColumn({ title: inputState }));

    apiClient("/api/column", {
      method: "POST",
      body: JSON.stringify({ title: inputState }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setInputState("");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center rounded-md p-2 text-sm bg-blue-100 hover:bg-blue-300 text-blue-800"
      >
        <PlusIcon className="h-5 w-5" />
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
