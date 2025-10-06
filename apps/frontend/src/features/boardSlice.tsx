import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardStateInput } from "@vizionboard/validation";

export const fetchColumns = createAsyncThunk(
  "column/fetchAll",
  async (_, thunkAPI) => {
    const response = await fetch("/api/column");
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch columns");
    }
    const result = await response.json();
    return result as BoardStateInput[];
  }
);

interface BoardState {
  entities: BoardStateInput[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: BoardState = {
  entities: [],
  loading: "idle",
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<{ title: string }>) => {
      const newNum = () => {
        return state.entities.length + 1;
      };

      const newColumn: BoardStateInput = {
        id: newNum(),
        order: newNum(),
        tasks: [],
        uuid: crypto.randomUUID(),
        createDate: new Date(),
        updateDate: new Date(),
        title: action.payload.title,
      };

      state.entities.push(newColumn);
    },
    addTaskCard: (
      state,
      action: PayloadAction<{ columnUUID: string; content: string }>
    ) => {
      const { columnUUID, content } = action.payload;
      const column = state.entities.find((col) => col.uuid === columnUUID);

      if (!column) return;

      const newTask = {
        id: column.tasks.length + 1,
        order: column.tasks.length + 1,
        content,
        column: column.uuid,
        uuid: crypto.randomUUID(),
        createDate: new Date(),
        updateDate: new Date(),
      };

      column.tasks.push(newTask);
    },
    moveTaskToAnotherColumn: (
      state,
      action: PayloadAction<{
        sourceColId: string;
        destColId: string;
        taskId: string;
        destIndex: number;
      }>
    ) => {
      const { sourceColId, destColId, taskId, destIndex } = action.payload;

      const startCol = state.entities.find((col) => col.uuid === sourceColId);
      const finishCol = state.entities.find((col) => col.uuid === destColId);

      if (!startCol || !finishCol) return;

      const taskIndex = startCol.tasks.findIndex(
        (task) => task.uuid === taskId
      );
      if (taskIndex === -1) return;

      const [movedTask] = startCol.tasks.splice(taskIndex, 1);

      finishCol.tasks.splice(destIndex, 0, movedTask);
    },
    moveTaskWithinSameColumn: (
      state,
      action: PayloadAction<{
        sourceColId: string;
        taskId: string;
        destIndex: number;
      }>
    ) => {
      const { sourceColId, taskId, destIndex } = action.payload;

      const column = state.entities.find((col) => col.uuid === sourceColId);
      if (!column) return;

      const taskIndex = column.tasks.findIndex((task) => task.uuid === taskId);
      if (taskIndex === -1) return;
      const [movedTask] = column.tasks.splice(taskIndex, 1);
      column.tasks.splice(destIndex, 0, movedTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      for (const col of state.entities) {
        col.tasks = col.tasks.filter((task) => task.uuid !== action.payload);
      }
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      console.log("Deleting column with UUID:", action.payload);
      state.entities = state.entities.filter(
        (col) => col.uuid !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchColumns.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const {
  addColumn,
  addTaskCard,
  moveTaskToAnotherColumn,
  moveTaskWithinSameColumn,
  deleteTask,
  deleteColumn,
} = columnSlice.actions;

export default columnSlice.reducer;
