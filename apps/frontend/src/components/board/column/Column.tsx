import { Droppable } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import TaskCard from "../task/TaskCard";
import AddTaskCard from "../task/AddTaskCard";

function Column({ column }: { column: BoardStateInput }) {
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
