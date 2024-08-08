import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [{ grid: [], title: "", style: {} }],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = [...action.payload];
    },
    addGrid: (state) => {
      state.content.push({ grid: [], title: "" });
    },
    setTitle: (state, action) => {
      state.content[action.payload.i].title = action.payload.title;
    },
    setGridId: (state, action) => {
      state.content[action.payload.i].id = action.payload.id;
    },
    setCellId: (state, action) => {
      state.content[action.payload.i].grid = state.content[action.payload.i].grid.map((item, ind) => {
        if (ind === action.payload.ind) {
          return {
            ...item,
            id: action.payload.id,
          };
        }
        return { ...item };
      })
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
      console.log(action.payload)
      state.content[action.payload.i].grid = state.content[action.payload.i].grid.map((item, ind) => {
        if (ind === action.payload.index) {
          if (action.payload.section === 'footer') {
            let newFooter = item.insideContent[action.payload.section].map((e, ind2) => {
              if (ind2 === action.payload.ind) {
                return { ...e, style: action.payload.style };
              }
              return e;
            });
            return {
              ...item,
              insideContent: {
                ...item.insideContent,
                footer: [...newFooter],
              },
            };
          }
          return {
            ...item,
            insideContent: {
              ...item.insideContent,
              [action.payload.section]: {
                ...item.insideContent[action.payload.section],
                style: action.payload.style,
              }
            }
          };
        }
        return { ...item }
      })
    },
    setGridStyle: (state, action) => {
      state.content[action.payload.i].style = { ...state.content[action.payload.i].style, [action.payload.name]: action.payload.value }
    },
    pushToFooterOfGrid: (state, action) => {
      if (state.content[action.payload.i].grid[action.payload.index].insideContent?.footer !== undefined) {
        let notFound = true;
        state.content[action.payload.i].grid[action.payload.index].insideContent.footer.forEach(element => {
          if (element.function === action.payload.function)
            notFound = false
        });

        if (notFound) {
          state.content[action.payload.i].grid[action.payload.index].insideContent.footer.push(action.payload)
          notFound = true
        }
      }
      else {
        state.content[action.payload.i].grid[action.payload.index].insideContent = {
          ...state.content[action.payload.i].grid[action.payload.index].insideContent,
          footer: [action.payload]
        }
      }
    },
    deleteItemFromFooter: (state, action) => {
      state.content[action.payload.i].grid[action.payload.index].insideContent.footer.splice(parseInt(action.payload.ind), 1);
    },
    editItemFromFooter: (state, action) => {
      let newFooter = state.content[action.payload.i].grid[action.payload.index].insideContent.footer.map((item, ind) => {
        if (ind === action.payload.ind) {
          return { ...item, text: action.payload.text };
        }
        return item;
      });
      state.content[action.payload.i].grid[action.payload.index].insideContent.footer = [...newFooter]
    },
  }
});

export const { addGrid, setTitle, pushContent, setContent, setGrid, setGridId, setCellId, deleteContent, setContentStyle, setGridStyle, pushToFooterOfGrid, deleteItemFromFooter, editItemFromFooter } = contentSlice.actions;
export default contentSlice.reducer;