import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filterReducer,
  },
});
