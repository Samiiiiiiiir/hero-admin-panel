import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 'all',
};

const filters = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
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
