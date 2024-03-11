import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "auth",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;
export { categoryReducer, categoryActions };
