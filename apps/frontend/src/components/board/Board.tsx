import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import {
  fetchColumns,
  moveTaskToAnotherColumn,
  moveTaskWithinSameColumn,
} from "~/features/boardSlice";
import AddColumn from "./column/AddColumn";
import Column from "./column/Column";
import { useAppDispatch } from "~/app/hooks";

function Board() {
  const dispatch = useAppDispatch();

  const columns = useSelector(
    (state: RootState) => state.column.entities as BoardStateInput[]
  );

  useEffect(() => {
    dispatch(fetchColumns());
  }, [dispatch]);

  const getColumnById = (id: string): BoardStateInput | undefined => {
    return columns.find((col) => col.uuid === id);
  };

  const handleLocalMove = (
    startCol: BoardStateInput,
    finishCol: BoardStateInput,
    taskId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
  ) => {
    if (startCol !== finishCol) {
      dispatch(
        moveTaskToAnotherColumn({
          sourceColId: source.droppableId,
          destColId: destination.droppableId,
          taskId: taskId,
          destIndex: destination.index,
        })
      );
    } else {
      dispatch(
        moveTaskWithinSameColumn({
          sourceColId: source.droppableId,
          taskId: taskId,
          destIndex: destination.index,
        })
      );
    }
  };

  const syncWithBackend = (
    finishColUUID: string,
    draggableId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
  ) => {
    fetch("/api/task/move", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        columnUUID: finishColUUID,
        taskUUID: draggableId,
        order: destination.index,
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
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
  };

  function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = getColumnById(source.droppableId);
    const finishCol = getColumnById(destination.droppableId);

    if (!startCol || !finishCol) return;

    handleLocalMove(startCol, finishCol, draggableId, source, destination);
    syncWithBackend(finishCol.uuid, draggableId, source, destination);
  }

  return (
    <div className="space-y-4">
      <AddColumn />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
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
