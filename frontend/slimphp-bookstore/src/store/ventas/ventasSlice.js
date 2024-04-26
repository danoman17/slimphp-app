import { createSlice } from '@reduxjs/toolkit';

export const ventasSlice = createSlice({
  name: 'ventas',
  initialState: {
    tableInfo: [],
    productData: {},
    errorMessage: undefined,
  },
  reducers: {
    onGetBooksTableData: (state, { payload }) => {
      state.tableInfo = payload['data'];
      state.errorMessage = undefined;
    },
    onGetBookData: (state, { payload }) => {
      state.productData = payload['data'];
      state.errorMessage = undefined;
    },
    onClearTableData: (state, { payload }) => {
      state.tableInfo = [];
      state.errorMessage = undefined;
    },
    onClearProductData: (state, { payload }) => {
      state.productData = {};
      state.errorMessage = undefined;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onGetBooksTableData,
  onGetBookData,
  onClearProductData,
  onClearTableData
} = ventasSlice.actions;