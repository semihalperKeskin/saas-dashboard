import { Draggable } from "@hello-pangea/dnd";
import { TaskInput } from "@vizionboard/validation";

function TaskCard({ task, index }: { task: TaskInput; index: number }) {
  return (
    <Draggable draggableId={task.uuid} index={index} key={task.uuid}>
      {(prov, snap) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className={[
            "p-2.5 mb-2 rounded-[10px] border border-gray-200 select-none",
            snap.isDragging ? "bg-sky-100 shadow-lg" : "bg-white shadow",
          ].join(" ")}
          style={{
            ...prov.draggableProps.style,
          }}
        >
          <div>{task.content}</div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
