import { Draggable } from "@hello-pangea/dnd";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { TaskInput } from "@vizionboard/validation";
import apiClient from "~/api/client";
import { useAppDispatch } from "~/app/hooks";
import { deleteTask } from "~/features/boardSlice";

function TaskCard({ task, index }: { task: TaskInput; index: number }) {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(deleteTask(task.uuid));

    apiClient(`/api/task/${task.uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Draggable draggableId={task.uuid} index={index} key={task.uuid}>
      {(prov, snap) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className={`
            p-2.5 mb-2 rounded-[10px] border border-gray-200 select-none flex justify-between items-center
            ${snap.isDragging ? "bg-sky-100 shadow-lg" : "bg-white shadow"}`}
          style={{
            ...prov.draggableProps.style,
          }}
        >
          <div>{task.content}</div>
          <button onClick={removeTask} className="ml-2">
            <XMarkIcon className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
