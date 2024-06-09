import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [{grid: [], title: ""}],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = [...action.payload];
    },
    addGrid: (state) => {
      state.content.push({grid: [], title: ""});
    },
    setTitle: (state, action) => {
      state.content[action.payload.i].title = action.payload.title;
    },
    pushContent: (state, action) => {
      state.content[action.payload.i].grid.push(action.payload.item);
    },
    setGrid: (state, action) => {
      state.content[action.payload.i].grid = [...action.payload.data];
    },
    deleteContent: (state, action) => {
      state.content[action.payload.i].grid.splice(action.payload.index, 1);
      state.content[action.payload.i].grid = state.content[action.payload.i].grid.map((item, i) => {
        return { ...item, index: i };
      });
    },
    setContentStyle: (state, action) => {
      state.content[action.payload.i].grid = state.content[action.payload.i].grid.map((item, ind) => {
        if(ind === action.payload.index)
          return { ...item, style: action.payload.style };
        
        return { ...item }
      })
    },
  }
});

export const { addGrid, setTitle, pushContent, setContent, setGrid, deleteContent, setContentStyle } = contentSlice.actions;
export default contentSlice.reducer;