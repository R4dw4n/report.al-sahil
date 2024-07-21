import { configureStore } from "@reduxjs/toolkit";
import draggedSlice from "./slices/draggedSlice";
import headerSlice from "./slices/header";
import contentSlice from "./slices/content";
import footerSlice from "./slices/footer";
import reportDesign from "./slices/reportDesign";
import openFieldSlice from "./slices/openField";
import mainPageSlice from "./slices/main"
export const store = () => {
  return configureStore({
    reducer: {
        dragged: draggedSlice,
        report: reportDesign,
        header: headerSlice,
        content: contentSlice,
        footer: footerSlice,
        openField: openFieldSlice,
        mainPage:mainPageSlice,
        
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
  });
} 