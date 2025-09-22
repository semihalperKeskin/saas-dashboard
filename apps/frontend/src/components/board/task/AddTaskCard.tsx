import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Modal from "../Modal";

type AddTaskCardProps = {
  columnUUID: string;
};

function AddTaskCard({ columnUUID }: AddTaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [inputState, setInputState] = useState("");

  const handleAddColumn = async () => {
    if (inputState.trim() === "") return;

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputState, column: columnUUID }),
      });

      if (!res.ok) throw new Error("API error");

      console.log("Yeni kolon eklendi:", inputState);
      setInputState("");
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <PlusCircleIcon className="h-5 w-5 inline-block mr-2" />
        Add Task
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddColumn}
        inputState={inputState}
        setInputState={setInputState}
        actionButonLabel="Task"
      />
    </div>
  );
}

export default AddTaskCard;
