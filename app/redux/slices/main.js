import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPage: {style: {} , availableOpers : [] ,} ,
};

export const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setMainPageStyle: (state, action) => {
      state.mainPage.style = {...state.mainPage.style , [action.payload.name]:action.payload.value }
    },
    setValidOpers: (state, action) => {
      state.mainPage.availableOpers = [...action.payload.val];
    },
    clearValidOpers: (state) => {
        state.mainPage.availableOpers =  [];
    },
  }
});

export const { setMainPageStyle ,setValidOpers , clearValidOpers } = mainPageSlice.actions;
export default mainPageSlice.reducer;