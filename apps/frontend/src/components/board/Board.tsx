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
import apiClient from "~/api/client";
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid";

function Board() {
  const dispatch = useAppDispatch();

  const columns = useSelector(
    (state: RootState) => state.column.entities as BoardStateInput[],
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

  const date: Date = new Date();

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-7 p-4">
        <div className="col-span-3 flex flex-col justify-center">
          <p className="font-semibold text-2xl">Good Morning, 👋</p>
          <p className="font-light text-gray-500">
            Small steps make big progress.Keep going!
          </p>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-4 p-4 border border-gray-300 text-md rounded-md">
              <div className="p-2 bg-violet-100 rounded-full">
                <RectangleStackIcon className="h-6 w-6 text-violet-500" />
              </div>
              <div>
                <div>6</div>
                <div className="font-light text-gray-500">Total tasks</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4  border border-gray-300 text-md rounded-md">
              <div className="p-2 bg-blue-100 rounded-full">
                <ClipboardDocumentIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div>6</div>
                <div className="font-light text-gray-500">In Progress</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4  border border-gray-300 text-md rounded-md">
              <div className="p-2 bg-green-100 rounded-full">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div>6</div>
                <div className="font-light text-gray-500">Complated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <div className="flex items-center gap-2 h-2/3 text-gray-400 bg-gray-100 p-3 rounded-xl">
            <CalendarDaysIcon className="w-5 h-5" />
            {date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 verflow-x-auto">
        <div className="flex h-full gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            {columns &&
              columns.map((column) => {
                return <Column key={column.uuid} column={column} />;
              })}
          </DragDropContext>
          <div className="flex justify-center items-center min-w-100 rounded-2xl text-gray-500 border-2 bg-gray-100 border-gray-300 border-dashed bg-clip-padding p-3">
            <div className="flex flex-col items-center gap-4">
              <div className="font-bold text-xl">Add Columns</div>
              <div className="">Organize your workflow with new columns.</div>
              <AddColumn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
