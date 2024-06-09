import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: {},
  reportCols: [],
  selectedTables: [],
  reportName: '',
  dataSource: [],
};

export const reportDesign = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.report = { ...state.report, ...action.payload };
    },
    addTableCols: (state) => {
      state.reportCols.push([]);
    },
    pushCol: (state, action) => {
      state.reportCols[action.payload.i].push(action.payload);
    },
    emptyCols: (state) => {
      state.reportCols = [];
    },
    setSelectedTables: (state, action) => {
      state.selectedTables = [...action.payload];
    },
    setReportName: (state, action) => {
      state.reportName = action.payload;
    },
    setDataSource: (state, action) => {
      state.dataSource = [...action.payload];
    },
    pushRow: (state, action) => {
      state.dataSource.push({ ...action.payload });
    },
  }
});

export const { setReport, addTableCols, pushCol, emptyCols, setSelectedTables, setReportName, setDataSource, pushRow } = reportDesign.actions;
export default reportDesign.reducer;