import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import { useEffect, useState } from "react";
import Column from "./column/Column";
import AddColumn from "./column/AddColumn";

function Board() {
  const [columns, setColumns] = useState<BoardStateInput[]>([]);

  async function getData() {
    const url = "/api/column";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      result.sort(
        (a: BoardStateInput, b: BoardStateInput) =>
          (a.order ?? 0) - (b.order ?? 0)
      );
      setColumns(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = columns.find((col) => col.uuid === source.droppableId);
    const finishCol = columns.find(
      (col) => col.uuid === destination.droppableId
    );

    if (startCol !== finishCol) {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];

        const startCol = newColumns.find(
          (col) => col.uuid === source.droppableId
        );
        const finishCol = newColumns.find(
          (col) => col.uuid === destination.droppableId
        );

        if (!startCol || !finishCol) return prevColumns;

        const taskIndex = startCol.tasks.findIndex(
          (task) => task.uuid === draggableId
        );
        if (taskIndex === -1) return prevColumns;

        const [movedTask] = startCol.tasks.splice(taskIndex, 1);

        finishCol.tasks.splice(destination.index, 0, movedTask);

        return newColumns;
      });

      fetch("/api/task/move", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnUUID: finishCol!.uuid,
          taskUUID: draggableId,
          index: destination.index,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Error moving task:", error);
        });
    } else {
      setColumns((prev) => {
        return prev.map((c) => {
          if (c.uuid !== source.droppableId) return c;

          const tasks = [...c.tasks];
          const [moved] = tasks.splice(source.index, 1);

          const insertIndex =
            source.index != destination.index
              ? destination.index
              : source.index;

          tasks.splice(insertIndex, 0, moved);

          return { ...c, tasks };
        });
      });

      fetch("/api/task/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnUUID: startCol!.uuid,
          taskUUID: draggableId,
          fromIndex: source.index,
          toIndex: destination.index,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Error reordering task:", error);
        });
    }
  }

  return (
    <div className="space-y-4">
      <AddColumn />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}
        >
          {columns &&
            columns.map((column) => {
              return <Column key={column.uuid} column={column} />;
            })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
