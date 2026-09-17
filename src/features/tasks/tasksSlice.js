import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { selectFilters } from "../filters/filterSlice";

const API_URL = "http://localhost:3001/tasks";

//get data
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data;
});

//post for add task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  const data = await response.json();
  return data;
});

//PUT updated task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title, description, priority, status }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error("failed to update task");
    }

    const data = await response.json();
    return data;
  },
);

//delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete task");
  }

  return id;
});
const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    items: [],
    status: "idle",
    saving: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    //fetch pending
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      //fetch fulfilled
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })

      //fetch rejected
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //add pending
      .addCase(addTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      //add fullfillled
      .addCase(addTask.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })

      //add rejected
      .addCase(addTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      })

      //update pending
      .addCase(updateTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      //update fullfilled
      .addCase(updateTask.fulfilled, (state, action) => {
        state.saving = false;

        const index = state.items.findIndex(
          (task) => task.id === action.payload.id,
        );

        //here we took -1 means:when we use finindex it means wehn we get -1 means there is no element found bcz index start from 0 ...so its simply syaing that if any element found replace it
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      //update rejected
      .addCase(updateTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      })

      //delete pending
      .addCase(deleteTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      //delete fulfilled
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.saving = false;

        //for delete we use filter
        state.items = state.items.filter((task) => task.id !== action.payload);
      })

      //delete rejected
      .addCase(deleteTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      });
  },
});

//these are all selectors
//selectAllTasks are selector which give access to states
export const selectAllTasks = (state) => state.tasks.items;

export const selectTaskStatus = (state) => state.tasks.status;

export const selectTaskError = (state) => state.tasks.error;

export const selectSaving = (state) => state.tasks.saving;

//memoized calculation ..it store previous result and not render not do calculation repeateddly only d ocalculation when task,search or priority changes.
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    const search = filters.search.toLowerCase();
    const priority = filters.priority;

    return tasks.filter((task) => {
      const matchesSearch =
        (task.title || "").toLowerCase().includes(search) ||
        (task.description || "").toLowerCase().includes(search);

      const matchesPriority = priority === "all" || task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  },
);
export default tasksSlice.reducer;
