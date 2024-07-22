import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: [{style: {}, arr: []} ],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setAllHeaders: (state, action) => {
      state.header = [...action.payload];
    },
    pushHeader: (state, action) => {
      state.header[action.payload.i].arr.push(action.payload.item);
    },
    setHeader: (state, action) => {
      state.header[action.payload.i].arr = action.payload.data.map((item) => {
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
      
      state.header[action.payload.i].arr.splice(action.payload.index, 1);
      state.header[action.payload.i].arr = state.header[action.payload.i].arr.map((item, i) => {
        return { ...item, index: i };
      });
    },
    setHeaderStyle: (state, action) => {
      state.header[action.payload.i].arr = state.header[action.payload.i].arr.map((item, ind) => {
        if(ind === action.payload.index)
          return { ...item, style: action.payload.style };
        return { ...item }
      })
    },
    setAllHeadersStyle: (state, action) => {
      state.header[action.payload.i].style = {...state.header[action.payload.i].style , [action.payload.name]:action.payload.value }
    },
    
  }
});

export const { pushHeader, setAllHeaders, setHeader, deleteHeader, setHeaderStyle ,setAllHeadersStyle } = headerSlice.actions;
export default headerSlice.reducer;