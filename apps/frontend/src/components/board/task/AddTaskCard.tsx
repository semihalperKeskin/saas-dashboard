import { useState } from "react";
import Modal from "../Modal";
import { useAppDispatch } from "~/app/hooks";
import { addTaskCard } from "~/features/boardSlice";
import apiClient from "~/api/client";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

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
      <Button type="button" variant="text" onClick={() => setIsOpen(true)}>
        <AddIcon className="h-5 w-5" />
      </Button>

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
