import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",

  initialState: {
    search: "",
    priority: "all",
  },

  reducers: {
    searchChanged: (state, action) => {
      state.search = action.payload;
    },

    priorityChanged: (state, action) => {
      state.priority = action.payload;
    },
  },
});
//selector for filter
export const selectSearch = (state) => state.filters.search;

export const selectPriority = (state) => state.filters.priority;

// Get both filters together
export const selectFilters = (state) => state.filters;

export const { searchChanged, priorityChanged } = filterSlice.actions;

export default filterSlice.reducer;
