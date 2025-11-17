import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Modal from "../Modal";
import { useAppDispatch } from "~/app/hooks";
import { addTaskCard } from "~/features/boardSlice";
import apiClient from "~/api/client";

type AddTaskCardProps = {
  columnUUID: string;
};

function AddTaskCard({ columnUUID }: AddTaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [inputState, setInputState] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddColumn = async () => {
    if (inputState.trim() === "") return;

    dispatch(addTaskCard({ columnUUID, content: inputState }));

    apiClient("/api/task", {
      method: "POST",
      body: JSON.stringify({ content: inputState, columnUUID: columnUUID }),
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
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <PlusCircleIcon className="h-5 w-5" />
        Add Task
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddColumn}
        inputState={inputState}
        setInputState={setInputState}
        actionButtonLabel="Task"
      />
    </div>
  );
}

export default AddTaskCard;
