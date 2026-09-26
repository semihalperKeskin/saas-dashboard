import { DropResult } from "@hello-pangea/dnd";
import { BoardStateInput } from "@vizionboard/validation";
import apiClient from "~/api/client";
import { useAppDispatch } from "~/app/hooks";
import {
  moveTaskToAnotherColumn,
  moveTaskWithinSameColumn,
} from "~/features/boardSlice";

export function useBoardDnd(columns: BoardStateInput[]) {
  const dispatch = useAppDispatch();

  const getColumnById = (id: string): BoardStateInput | undefined => {
    return columns.find((col) => col.uuid === id);
  };

  const handleLocalMove = (
    startCol: BoardStateInput,
    finishCol: BoardStateInput,
    taskId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number },
  ) => {
    if (startCol !== finishCol) {
      dispatch(
        moveTaskToAnotherColumn({
          sourceColId: source.droppableId,
          destColId: destination.droppableId,
          taskId: taskId,
          destIndex: destination.index,
        }),
      );
    } else {
      dispatch(
        moveTaskWithinSameColumn({
          sourceColId: source.droppableId,
          taskId: taskId,
          destIndex: destination.index,
        }),
      );
    }
  };

  const syncWithBackend = (
    finishColUUID: string,
    draggableId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number },
  ) => {
    apiClient("/api/task/move", {
      method: "PUT",
      body: JSON.stringify({
        columnUUID: finishColUUID,
        taskUUID: draggableId,
        order: destination.index,
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
      }),
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

  return { handleDragEnd };
}
