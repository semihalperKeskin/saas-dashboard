import { Droppable } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import TaskCard from "../task/TaskCard";
import AddTaskCard from "../task/AddTaskCard";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useAppDispatch } from "~/app/hooks";
import { deleteColumn } from "~/features/boardSlice";

function Column({ column }: { column: BoardStateInput }) {
  const dispatch = useAppDispatch();


  const removeColumn = (uuid: string) => {
    const alert = window.confirm(
      "Are you sure you want to delete this column? All tasks within this column will also be deleted."
    );

    if (!alert) return;

    fetch(`/api/column/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete column");
        }

        dispatch(deleteColumn(uuid));
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <Droppable droppableId={column.uuid} key={column.uuid}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-4 rounded-lg min-h-96 border-2 border-transparent hover:border-blue-200 bg-gray-100"
          style={{
            background: snapshot.isDraggingOver ? "#f0f6ff" : "#f7f7f7",
          }}
        >
          <div className="m-0 mb-4 flex">
            <div className="flex-1">{column.title}</div>
            <AddTaskCard columnUUID={column.uuid.toString()} />
            <TrashIcon onClick={() => removeColumn(column.uuid)} className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-2" />
          </div>

          {column.tasks &&
            Array.isArray(column.tasks) &&
            column.tasks.map((task, index) => (
              <TaskCard key={task.uuid} task={task} index={index} />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
