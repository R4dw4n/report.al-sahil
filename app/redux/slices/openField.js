import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openFieldHeader: [-1, -1],
  openFieldContent: [-1, -1],
  openFieldFooter: [-1, -1],
  openStyle: {
    fontSize: '',
    color: '',
    background:'',
  },
};

export const openFieldSlice = createSlice({
  name: "openField",
  initialState,
  reducers: {
    setOpenFieldHeader: (state, action) => {
      state.openFieldHeader = [...action.payload];
    },
    setOpenFieldContent: (state, action) => {
      state.openFieldContent = [...action.payload];
    },
    setOpenFieldFooter: (state, action) => {
      state.openFieldFooter = [...action.payload];
    },
    setStyleObj: (state, action) => {
      state.openStyle = { ...action.payload };
    },
    setStyleProp: (state, action) => {
      state.openStyle = { ...state.openStyle, [action.payload.prop]: action.payload.value };
    },
    clearStyle: (state) => {
      state.openStyle = Object.assign(state.openStyle, {});
      console.log("hello" , state.openStyle);
    },
  },
});

export const { setOpenFieldHeader, setOpenFieldContent, setOpenFieldFooter, setStyleObj, setStyleProp, clearStyle } = openFieldSlice.actions;
export default openFieldSlice.reducer;