import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

const filters = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    filterFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filterFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = 'idle';
    },
    filterFetchedError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    activeFilterChange: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { reducer, actions } = filters;

export default reducer;

export const {
  filterFetching,
  filterFetched,
  filterFetchedError,
  activeFilterChange,
} = actions;
