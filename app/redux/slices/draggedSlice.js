import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draggedData: {},
  isDragging: false,
};

export const draggedSlice = createSlice({
  name: "dragged",
  initialState,
  reducers: {
    setDraggedData: (state, action) => {
      state.draggedData = action.payload;
    },
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    }
  }
});

export const { setDraggedData, setIsDragging } = draggedSlice.actions;
export default draggedSlice.reducer;