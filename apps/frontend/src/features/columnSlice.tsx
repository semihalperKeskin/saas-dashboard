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
    addColumn: (state, action: PayloadAction<BoardStateInput>) => {
      state.entities.push(action.payload);
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
        colId: string;
        taskId: string;
        destIndex: number;
      }>
    ) => {
      const { colId, taskId, destIndex } = action.payload;

      const column = state.entities.find((col) => col.uuid === colId);
      if (!column) return;
      
      const taskIndex = column.tasks.findIndex((task) => task.uuid === taskId);
      if (taskIndex === -1) return;
      const [movedTask] = column.tasks.splice(taskIndex, 1);
      column.tasks.splice(destIndex, 0, movedTask);
    },
    updateColumn: (state, action: PayloadAction<BoardStateInput>) => {
      const index = state.entities.findIndex(
        (col) => col.uuid === action.payload.uuid
      );
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.entities.map((col) => {
        col.tasks = col.tasks.filter((task) => task.uuid !== action.payload);
        return col;
      });
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

export const { addColumn, moveTaskToAnotherColumn, moveTaskWithinSameColumn, updateColumn, deleteColumn } =
  columnSlice.actions;

export default columnSlice.reducer;
