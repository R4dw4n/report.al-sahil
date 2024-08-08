import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  footer: [{style: {}, arr: []} ],
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setAllFooters: (state, action) => {
      state.footer = [...action.payload];
    },
    pushFooter: (state, action) => {
      state.footer[action.payload.i].arr.push(action.payload.item);
    },
    setFooter: (state, action) => {
      state.footer[action.payload.i].arr = action.payload.data.map((item) => {
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
    deleteFooter: (state, action) => {
      state.footer[action.payload.i].arr.splice(action.payload.index, 1);
      state.footer[action.payload.i].arr = state.footer[action.payload.i].arr.map((item, i) => {
        return { ...item, index: i };
      });
    },
    setFooterStyle: (state, action) => {
      state.footer[action.payload.i].arr = state.footer[action.payload.i].arr.map((item, ind) => {
        if(ind === action.payload.index)
          return { ...item, style: action.payload.style };
        
        return { ...item }
      })
    },
    setAllFootersStyle: (state, action) => {
      state.footer[action.payload.i].style = {...state.footer[action.payload.i].style , [action.payload.name]:action.payload.value }
    },
    setFooterId: (state, action) => {
      state.footer[action.payload.i].arr = state.footer[action.payload.i].arr.map((item, ind) => {
        if (ind === action.payload.index)
          return { ...item, id: action.payload.id };
        return { ...item }
      })
    }
  }
});

export const { pushFooter, setAllFooters, setFooter, deleteFooter, setFooterStyle , setAllFootersStyle, setFooterId } = footerSlice.actions;
export default footerSlice.reducer;