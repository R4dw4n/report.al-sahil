import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: [[]],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setAllHeaders: (state, action) => {
      state.header = [...action.payload];
    },
    pushHeader: (state, action) => {
      state.header[action.payload.i].push(action.payload.item);
    },
    setHeader: (state, action) => {
      state.header[action.payload.i] = action.payload.data.map((item) => {
        if(item?.fileList) {
          const x = {...item.fileList[0], status: 'done'}
          return {
            ...item,
            fileList: [x]
          }
        }
        return {...item }
      })
    },
    deleteHeader: (state, action) => {
      state.header[action.payload.i].splice(action.payload.index, 1);
      state.header[action.payload.i] = state.header[action.payload.i].map((item, i) => {
        return { ...item, index: i };
      });
    },
    setHeaderStyle: (state, action) => {
      state.header[action.payload.i] = state.header[action.payload.i].map((item, ind) => {
        if(ind === action.payload.index)
          return { ...item, style: action.payload.style };
        
        return { ...item }
      })
    },
  }
});

export const { pushHeader, setAllHeaders, setHeader, deleteHeader, setHeaderStyle } = headerSlice.actions;
export default headerSlice.reducer;