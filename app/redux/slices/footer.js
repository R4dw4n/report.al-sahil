import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  footer: [[]],
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setAllFooters: (state, action) => {
      state.footer = [...action.payload];
    },
    pushFooter: (state, action) => {
      state.footer[action.payload.i].push(action.payload.item);
    },
    setFooter: (state, action) => {
      state.footer[action.payload.i] = action.payload.data.map((item) => {
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
      state.footer[action.payload.i].splice(action.payload.index, 1);
      state.footer[action.payload.i] = state.footer[action.payload.i].map((item, i) => {
        return { ...item, index: i };
      });
    },
    setFooterStyle: (state, action) => {
      state.footer[action.payload.i] = state.footer[action.payload.i].map((item, ind) => {
        if(ind === action.payload.index)
          return { ...item, style: action.payload.style };
        
        return { ...item }
      })
    },
  }
});

export const { pushFooter, setAllFooters, setFooter, deleteFooter, setFooterStyle } = footerSlice.actions;
export default footerSlice.reducer;